// Main JavaScript functionality for the video portfolio website with Performance Optimization

class VideoPortfolio {
    constructor() {
        this.lightbox = document.getElementById('lightbox');
        this.lightboxVideo = document.getElementById('lightboxVideo');
        this.workGrid = document.getElementById('workGrid');
        this.filterButtons = document.querySelectorAll('.filter');
        this.videos = [];
        this.loadedVideos = new Set();
        this.intersectionObserver = null;
        
        this.init();
    }

    init() {
        // Hide loading spinner first
        this.hideLoadingSpinner();
        
        this.loadVideos();
        this.setupEventListeners();
        this.setupFilterButtons();
        this.setupServiceShowcases();
        
        // Initialize lazy loading
        this.initIntersectionObserver();
        
        // Setup footer videos with lazy loading
        this.setupFooterVideos();
    }

    hideLoadingSpinner() {
        const spinner = document.getElementById('loadingSpinner');
        if (spinner) {
            setTimeout(() => {
                spinner.classList.add('hidden');
                document.body.classList.add('loaded');
                setTimeout(() => {
                    spinner.style.display = 'none';
                }, 500);
            }, 500);
        } else {
            document.body.classList.add('loaded');
        }
    }

    initIntersectionObserver() {
        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const video = entry.target;
                    const src = video.dataset.src;
                    if (src && !this.loadedVideos.has(src)) {
                        this.loadVideo(video, src);
                    }
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '50px'
        });
    }

    loadVideo(video, src) {
        if (this.loadedVideos.has(src)) return;
        
        this.loadedVideos.add(src);
        video.src = src;
        video.load();
        
        video.addEventListener('loadedmetadata', () => {
            video.style.opacity = '1';
            video.play().catch(() => {});
        });
    }

    // Video database based on asset folder structure
    loadVideos() {
        this.videos = [
            {
                filename: 'trading (1).mp4',
                title: 'Technical Analysis Trading',
                category: 'trading-reel',
                type: 'Trading Reel'
            },
            {
                filename: 'trading (2).mp4',
                title: 'Market Movement Analysis',
                category: 'trading-reel',
                type: 'Trading Reel'
            },
            {
                filename: 'trading (3).mp4',
                title: 'Forex Trading Strategy',
                category: 'trading-reel',
                type: 'Trading Reel'
            },
            {
                filename: 'trading (4).mp4',
                title: 'Crypto Trading Guide',
                category: 'trading-reel',
                type: 'Trading Reel'
            },
            {
                filename: 'tradind 5.mp4',
                title: 'Options Trading Basics',
                category: 'trading-reel',
                type: 'Trading Reel'
            },
            {
                filename: 'educational.mp4',
                title: 'Investment Fundamentals',
                category: 'educational-video',
                type: 'Educational Video'
            },
            {
                filename: 'educational (2).mp4',
                title: 'Risk Management Guide',
                category: 'educational-video',
                type: 'Educational Video'
            },
            {
                filename: 'motion graphic (1).mp4',
                title: 'Dynamic Logo Animation',
                category: 'motion-graphic',
                type: 'Motion Graphics'
            },
            {
                filename: 'motion graphic (2).mp4',
                title: 'Data Visualization',
                category: 'motion-graphic',
                type: 'Motion Graphics'
            },
            {
                filename: 'motion graphic (3).mp4',
                title: 'Brand Identity Animation',
                category: 'motion-graphic',
                type: 'Motion Graphics'
            },
            {
                filename: 'sub vdo.mp4',
                title: 'Social Media Promo',
                category: 'social-media',
                type: 'Social Media Edit'
            }
        ];

        this.renderVideoGrid();
    }

    renderVideoGrid() {
        if (!this.workGrid) return;
        
        this.workGrid.innerHTML = '';
        
        this.videos.forEach((video, index) => {
            const videoCard = this.createVideoCard(video, index);
            this.workGrid.appendChild(videoCard);
        });
    }

    createVideoCard(video, index) {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.type = video.category;
        
        card.innerHTML = `
            <div class="thumb" onclick="videoPortfolio.openLightbox('https://sachi2.blob.core.windows.net/videos/${encodeURIComponent(video.filename)}')">
                <video 
                    data-src="https://sachi2.blob.core.windows.net/videos/${encodeURIComponent(video.filename)}"
                    muted 
                    loop 
                    playsinline 
                    preload="none"
                    style="width:100%;height:100%;object-fit:cover;border-radius:12px;opacity:0;transition:opacity 0.3s ease;">
                </video>
                <div class="play">▶</div>
                <div class="overlay">
                    <span class="category">${video.type}</span>
                </div>
            </div>
            <div class="meta">
                <h4>${video.title}</h4>
                <p>${video.type}</p>
            </div>
        `;
        
        // Add intersection observer to the video element
        const videoElement = card.querySelector('video');
        if (this.intersectionObserver && videoElement) {
            this.intersectionObserver.observe(videoElement);
        }
        
        return card;
    }

    setupEventListeners() {
        // Lightbox close functionality
        if (this.lightbox) {
            this.lightbox.addEventListener('click', (e) => {
                if (e.target === this.lightbox) {
                    this.closeLightbox();
                }
            });
        }

        // Escape key to close lightbox
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeLightbox();
            }
        });

        // Contact form handling
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleContactForm(e));
        }

        // Smooth scroll for navigation
        document.querySelectorAll('nav a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    setupFilterButtons() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                this.filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get filter value from onclick attribute or data attribute
                const onclickAttr = button.getAttribute('onclick');
                if (onclickAttr) {
                    const filterValue = onclickAttr.match(/'([^']+)'/)[1];
                    this.filterGrid(filterValue);
                }
            });
        });

        // Set "All" as default active
        const allButton = document.querySelector('.filter[onclick*="all"]');
        if (allButton) {
            allButton.classList.add('active');
        }
    }

    filterGrid(filter) {
        const cards = document.querySelectorAll('#workGrid .card');
        
        cards.forEach((card, index) => {
            const shouldShow = filter === 'all' || card.dataset.type === filter;
            
            if (shouldShow) {
                card.style.display = 'block';
                card.style.animation = `fadeIn 0.3s ease forwards ${index * 0.1}s`;
            } else {
                card.style.display = 'none';
            }
        });
    }

    openLightbox(src) {
        if (this.lightbox && this.lightboxVideo) {
            this.lightboxVideo.src = src;
            this.lightbox.style.display = 'flex';
            this.lightboxVideo.play().catch(() => {});
        }
    }

    closeLightbox() {
        if (this.lightbox && this.lightboxVideo) {
            this.lightbox.style.display = 'none';
            this.lightboxVideo.pause();
            this.lightboxVideo.src = '';
        }
    }

    // Setup footer videos with lazy loading
    setupFooterVideos() {
        const footerVideos = document.querySelectorAll('.footer-video[data-src]');
        
        footerVideos.forEach(video => {
            if (this.intersectionObserver) {
                this.intersectionObserver.observe(video);
            }
        });
    }

    // Setup Service Video Showcases
    setupServiceShowcases() {
        const serviceItems = document.querySelectorAll('.service-item[data-service]');
        
        serviceItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const serviceType = item.getAttribute('data-service');
                const showcase = document.getElementById(`${serviceType}-showcase`);
                
                // Close all other showcases
                document.querySelectorAll('.service-video-showcase').forEach(otherShowcase => {
                    if (otherShowcase !== showcase) {
                        otherShowcase.classList.remove('active');
                        // Stop all videos in closed showcases
                        const videos = otherShowcase.querySelectorAll('video');
                        videos.forEach(video => {
                            video.pause();
                            video.currentTime = 0;
                        });
                    }
                });
                
                // Remove active state from all service items
                document.querySelectorAll('.service-item').forEach(otherItem => {
                    otherItem.classList.remove('active');
                });
                
                // Toggle current showcase
                if (showcase) {
                    const isActive = showcase.classList.contains('active');
                    
                    if (!isActive) {
                        // Open showcase
                        item.classList.add('active');
                        showcase.classList.add('active');
                        
                        // Auto-play videos when showcase opens
                        setTimeout(() => {
                            const videos = showcase.querySelectorAll('video');
                            videos.forEach(video => {
                                video.play().catch(() => {});
                            });
                        }, 300);
                    } else {
                        // Close showcase
                        item.classList.remove('active');
                        showcase.classList.remove('active');
                        
                        // Pause videos when showcase closes
                        const videos = showcase.querySelectorAll('video');
                        videos.forEach(video => {
                            video.pause();
                            video.currentTime = 0;
                        });
                    }
                }
            });
        });
    }

    // Contact form handling with Discord webhook
    async handleContactForm(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            budget: document.getElementById('budget').value,
            message: document.getElementById('message').value
        };

        const formMsgElement = document.getElementById('formMsg');
        
        try {
            const discordPayload = {
                embeds: [{
                    title: "🎬 New Project Inquiry - edited.frame",
                    color: 7506394, // Purple color
                    fields: [
                        {
                            name: "👤 Client Name",
                            value: formData.name,
                            inline: true
                        },
                        {
                            name: "📧 Email",
                            value: formData.email,
                            inline: true
                        },
                        {
                            name: "💰 Budget",
                            value: formData.budget || "Not specified",
                            inline: true
                        },
                        {
                            name: "📝 Project Details",
                            value: formData.message
                        }
                    ],
                    footer: {
                        text: "edited.frame Portfolio Contact Form"
                    },
                    timestamp: new Date().toISOString()
                }]
            };

            const response = await fetch('https://discord.com/api/webhooks/1407102230620016660/PktP90bwhlLKelQ5wwScuke9qmYjuKoVLjxFAVcR0dBGheqdUyXmTXwBazVB70GVtffL', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(discordPayload)
            });

            if (response.ok) {
                formMsgElement.textContent = 'Message sent successfully! I\'ll get back to you within 24 hours.';
                formMsgElement.style.color = '#27ae60';
                
                // Clear form
                e.target.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formMsgElement.textContent = '';
                }, 5000);
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            
            // Fallback to email client
            const subject = encodeURIComponent(`New project from ${formData.name}`);
            const body = encodeURIComponent(
                `Name: ${formData.name}\n` +
                `Email: ${formData.email}\n` +
                `Budget: ${formData.budget}\n\n` +
                `Message:\n${formData.message}`
            );

            window.location.href = `mailto:connectwithsachin06@gmail.com?subject=${subject}&body=${body}`;
            
            formMsgElement.textContent = 
                'Opening mail client as backup... If nothing happens, please email me directly.';
            formMsgElement.style.color = '#ffa502';
        }
    }
}

// Global functions for onclick handlers
function filterGrid(filter) {
    if (window.videoPortfolio) {
        window.videoPortfolio.filterGrid(filter);
    }
}

function closeLightbox(e) {
    if (e && e.target !== e.currentTarget) return;
    if (window.videoPortfolio) {
        window.videoPortfolio.closeLightbox();
    }
}

function scrollToId(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function sendEmail(event) {
    if (window.videoPortfolio) {
        return window.videoPortfolio.handleContactForm(event);
    }
    return false;
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.videoPortfolio = new VideoPortfolio();
});
