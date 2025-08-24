// Advanced Review System with Firebase Integration
class ReviewSystem {
    constructor() {
        this.reviews = [];
        this.currentPage = 1;
        this.reviewsPerPage = 6;
        this.totalReviews = 0;
        this.averageRating = 0;
        this.selectedRating = 0;
        
        // Wait for Firebase to be available
        this.waitForFirebase();
    }

    waitForFirebase() {
        if (window.firebaseDb) {
            this.database = window.firebaseDb;
            this.ref = window.firebaseRef;
            this.push = window.firebasePush;
            this.onValue = window.firebaseOnValue;
            this.query = window.firebaseQuery;
            this.orderByChild = window.firebaseOrderByChild;
            this.limitToLast = window.firebaseLimitToLast;
            
            console.log('Firebase initialized for reviews');
        } else {
            setTimeout(() => this.waitForFirebase(), 100);
        }
    }

    init() {
        this.setupEventListeners();
        this.loadReviews();
        console.log('Review system initialized');
    }

    setupEventListeners() {
        // Star rating event listeners
        const stars = document.querySelectorAll('.star-rating .star');
        stars.forEach(star => {
            star.addEventListener('click', (e) => {
                this.setRating(parseInt(e.target.dataset.rating));
            });
            
            star.addEventListener('mouseenter', (e) => {
                this.highlightStars(parseInt(e.target.dataset.rating));
            });
        });

        // Reset star highlighting on mouse leave
        const starRating = document.querySelector('.star-rating');
        if (starRating) {
            starRating.addEventListener('mouseleave', () => {
                this.highlightStars(this.selectedRating);
            });
        }

        // Form validation
        const reviewForm = document.getElementById('reviewForm');
        if (reviewForm) {
            reviewForm.addEventListener('input', this.validateForm.bind(this));
        }
    }

    setRating(rating) {
        this.selectedRating = rating;
        document.getElementById('rating').value = rating;
        this.highlightStars(rating);
    }

    highlightStars(rating) {
        const stars = document.querySelectorAll('.star-rating .star');
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    validateForm() {
        const form = document.getElementById('reviewForm');
        const submitBtn = document.querySelector('.submit-review-btn');
        
        const name = document.getElementById('reviewerName').value.trim();
        const projectType = document.getElementById('projectType').value;
        const rating = document.getElementById('rating').value;
        const reviewText = document.getElementById('reviewText').value.trim();
        
        const isValid = name && projectType && rating && reviewText && reviewText.length >= 10;
        
        if (submitBtn) {
            submitBtn.disabled = !isValid;
            submitBtn.style.opacity = isValid ? '1' : '0.6';
        }
    }

    async loadReviews() {
        if (!this.database) {
            setTimeout(() => this.loadReviews(), 100);
            return;
        }

        try {
            const reviewsRef = this.ref(this.database, 'reviews');
            const reviewsQuery = this.query(
                reviewsRef, 
                this.orderByChild('timestamp')
            );

            this.onValue(reviewsQuery, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    this.reviews = Object.keys(data)
                        .map(key => ({ id: key, ...data[key] }))
                        .filter(review => review.allowDisplay !== false)
                        .sort((a, b) => b.timestamp - a.timestamp);
                } else {
                    this.reviews = [];
                }
                
                this.calculateStats();
                this.renderReviews();
                this.updatePagination();
            });
        } catch (error) {
            console.error('Error loading reviews:', error);
            this.showEmptyState();
        }
    }

    calculateStats() {
        this.totalReviews = this.reviews.length;
        
        if (this.totalReviews > 0) {
            const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
            this.averageRating = (totalRating / this.totalReviews).toFixed(1);
            
            // Calculate satisfaction as percentage of 4+ star reviews
            const satisfiedReviews = this.reviews.filter(review => review.rating >= 4).length;
            this.satisfactionRate = this.totalReviews > 0 ? 
                Math.round((satisfiedReviews / this.totalReviews) * 100) : 0;
        } else {
            this.averageRating = '0.0';
            this.satisfactionRate = 0;
        }

        // Update stats display
        const totalReviewsEl = document.getElementById('totalReviews');
        const averageRatingEl = document.getElementById('averageRating');
        const satisfactionEl = document.getElementById('satisfactionRate');
        
        if (totalReviewsEl) totalReviewsEl.textContent = this.totalReviews;
        if (averageRatingEl) averageRatingEl.textContent = this.averageRating;
        if (satisfactionEl) satisfactionEl.textContent = this.satisfactionRate + '%';
    }

    renderReviews() {
        const reviewsGrid = document.getElementById('reviewsGrid');
        if (!reviewsGrid) return;

        if (this.reviews.length === 0) {
            this.showEmptyState();
            return;
        }

        const startIndex = (this.currentPage - 1) * this.reviewsPerPage;
        const endIndex = startIndex + this.reviewsPerPage;
        const pageReviews = this.reviews.slice(startIndex, endIndex);

        reviewsGrid.innerHTML = pageReviews.map(review => this.createReviewCard(review)).join('');
    }

    createReviewCard(review) {
        const date = new Date(review.timestamp).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        const initials = review.reviewerName
            .split(' ')
            .map(name => name.charAt(0))
            .join('')
            .substring(0, 2)
            .toUpperCase();

        const stars = Array.from({ length: 5 }, (_, i) => 
            `<span class="star ${i < review.rating ? '' : 'empty'}">★</span>`
        ).join('');

        return `
            <div class="review-card" data-review-id="${review.id}">
                <div class="review-header">
                    <div class="reviewer-info">
                        <div class="reviewer-avatar">${initials}</div>
                        <div class="reviewer-details">
                            <h5>${this.escapeHtml(review.reviewerName)}</h5>
                            <div class="project-type">${this.escapeHtml(review.projectType)}</div>
                        </div>
                    </div>
                    <div class="review-rating">${stars}</div>
                </div>
                <div class="review-text">${this.escapeHtml(review.reviewText)}</div>
                <div class="review-meta">
                    <div class="review-date">${date}</div>
                    <div class="review-verified">
                        <span>✓</span>
                        <span>Verified Client</span>
                    </div>
                </div>
            </div>
        `;
    }

    showEmptyState() {
        const reviewsGrid = document.getElementById('reviewsGrid');
        if (!reviewsGrid) return;

        reviewsGrid.innerHTML = `
            <div class="reviews-empty">
                <div class="empty-icon">⭐</div>
                <h4>No Reviews Yet</h4>
                <p>Be the first to leave a review about your experience working with Sachin!</p>
                <button class="write-review-btn" onclick="reviewSystem.openReviewModal()" style="margin-top: 20px;">
                    <span class="btn-icon">✍️</span>
                    <span>Write First Review</span>
                </button>
            </div>
        `;
    }

    updatePagination() {
        const totalPages = Math.ceil(this.reviews.length / this.reviewsPerPage);
        
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const paginationInfo = document.getElementById('paginationInfo');

        if (prevBtn) prevBtn.disabled = this.currentPage <= 1;
        if (nextBtn) nextBtn.disabled = this.currentPage >= totalPages;
        
        if (paginationInfo) {
            paginationInfo.textContent = totalPages > 0 ? 
                `Page ${this.currentPage} of ${totalPages}` : 
                'No pages';
        }
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.renderReviews();
            this.updatePagination();
            this.scrollToReviews();
        }
    }

    nextPage() {
        const totalPages = Math.ceil(this.reviews.length / this.reviewsPerPage);
        if (this.currentPage < totalPages) {
            this.currentPage++;
            this.renderReviews();
            this.updatePagination();
            this.scrollToReviews();
        }
    }

    scrollToReviews() {
        document.getElementById('reviews').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }

    openReviewModal() {
        const modal = document.getElementById('reviewModal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Reset form
            this.resetForm();
        }
    }

    closeReviewModal(event) {
        if (event && event.target !== event.currentTarget) return;
        
        const modal = document.getElementById('reviewModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            this.resetForm();
        }
    }

    resetForm() {
        const form = document.getElementById('reviewForm');
        if (form) {
            form.reset();
            this.selectedRating = 0;
            this.highlightStars(0);
            
            const messageEl = document.getElementById('reviewFormMsg');
            if (messageEl) {
                messageEl.textContent = '';
                messageEl.className = 'form-message';
            }
        }
    }

    async submitReview(event) {
        event.preventDefault();
        
        if (!this.database) {
            this.showFormMessage('Firebase not initialized. Please try again.', 'error');
            return false;
        }

        const formData = new FormData(event.target);
        const reviewData = {
            reviewerName: formData.get('reviewerName').trim(),
            reviewerEmail: formData.get('reviewerEmail') || '',
            reviewerInstagram: formData.get('reviewerInstagram') || '',
            projectType: formData.get('projectType'),
            rating: parseInt(formData.get('rating')),
            reviewText: formData.get('reviewText').trim(),
            allowDisplay: formData.get('allowDisplay') === 'on',
            timestamp: Date.now(),
            status: 'pending' // For moderation
        };

        // Validation
        if (!reviewData.reviewerName || !reviewData.projectType || !reviewData.rating || !reviewData.reviewText) {
            this.showFormMessage('Please fill in all required fields.', 'error');
            return false;
        }

        if (reviewData.reviewText.length < 10) {
            this.showFormMessage('Review must be at least 10 characters long.', 'error');
            return false;
        }

        try {
            const submitBtn = document.querySelector('.submit-review-btn');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span>Submitting...</span><i class="btn-icon">⏳</i>';
            }

            // Save to Firebase
            const reviewsRef = this.ref(this.database, 'reviews');
            await this.push(reviewsRef, reviewData);

            // Send Discord notification
            await this.sendDiscordNotification(reviewData);

            this.showFormMessage('Thank you! Your review has been submitted and will be visible shortly.', 'success');
            
            setTimeout(() => {
                this.closeReviewModal();
            }, 2000);

        } catch (error) {
            console.error('Error submitting review:', error);
            this.showFormMessage('Sorry, there was an error submitting your review. Please try again.', 'error');
        } finally {
            const submitBtn = document.querySelector('.submit-review-btn');
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span>Submit Review</span><i class="btn-icon">✨</i>';
            }
        }

        return false;
    }

    async sendDiscordNotification(reviewData) {
        // Check if Discord notifications are enabled and configured
        if (!window.CONFIG || !window.CONFIG.discord.enabled || !window.CONFIG.discord.webhookUrl) {
            console.log('Discord notifications disabled for security in client-side deployment');
            return;
        }
        
        // For security: Discord webhooks should not be called from client-side
        // This is a placeholder for server-side implementation
        console.log('Discord notification would be sent (server-side only):', {
            reviewer: reviewData.reviewerName,
            rating: reviewData.rating,
            project: reviewData.projectType
        });
        
        // Note: In production, implement Discord notifications through:
        // 1. A backend API endpoint
        // 2. Firebase Functions
        // 3. Netlify Functions
        // 4. Vercel API Routes
    }

    showFormMessage(message, type) {
        const messageEl = document.getElementById('reviewFormMsg');
        if (messageEl) {
            messageEl.textContent = message;
            messageEl.className = `form-message ${type}`;
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize review system
window.reviewSystem = new ReviewSystem();

// Global functions for HTML onclick handlers
window.openReviewModal = () => reviewSystem.openReviewModal();
window.closeReviewModal = (event) => reviewSystem.closeReviewModal(event);
window.submitReview = (event) => reviewSystem.submitReview(event);
window.previousPage = () => reviewSystem.previousPage();
window.nextPage = () => reviewSystem.nextPage();
