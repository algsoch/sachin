// Video Portfolio JavaScript - Clean Version

class VideoPortfolio {
    constructor() {
        this.lightbox = document.getElementById('lightbox');
        this.lightboxVideo = document.getElementById('lightboxVideo');
        this.workGrid = document.getElementById('workGrid');
        this.videos = [];
        
        this.init();
    }

    init() {
        this.hideLoadingSpinner();
        this.loadVideos();
        this.renderVideoGrid();
        this.setupEventListeners();
        this.setupFooterVideos();
        
        console.log('VideoPortfolio initialized successfully');
    }

    hideLoadingSpinner() {
        const spinner = document.getElementById('loadingSpinner');
        if (spinner) {
            setTimeout(() => {
                spinner.classList.add('hidden');
                document.body.classList.add('loaded');
            }, 500);
        } else {
            document.body.classList.add('loaded');
        }
    }

    loadVideos() {
        this.videos = [
            { filename: 'trading (1).mp4', title: 'Technical Analysis', category: 'trading-reel', type: 'Trading Reel' },
            { filename: 'trading (2).mp4', title: 'Market Analysis', category: 'trading-reel', type: 'Trading Reel' },
            { filename: 'trading (3).mp4', title: 'Forex Strategy', category: 'trading-reel', type: 'Trading Reel' },
            { filename: 'trading (4).mp4', title: 'Crypto Guide', category: 'trading-reel', type: 'Trading Reel' },
            { filename: 'tradind 5.mp4', title: 'Options Trading', category: 'trading-reel', type: 'Trading Reel' },
            { filename: 'educational.mp4', title: 'Investment Guide', category: 'educational-video', type: 'Educational' },
            { filename: 'educational (2).mp4', title: 'Risk Management', category: 'educational-video', type: 'Educational' },
            { filename: 'motion graphic (1).mp4', title: 'Logo Animation', category: 'motion-graphic', type: 'Motion Graphics' },
            { filename: 'motion graphic (2).mp4', title: 'Data Visualization', category: 'motion-graphic', type: 'Motion Graphics' },
            { filename: 'motion graphic (3).mp4', title: 'Brand Animation', category: 'motion-graphic', type: 'Motion Graphics' },
            { filename: 'sub vdo.mp4', title: 'Social Media', category: 'social-media', type: 'Social Media' }
        ];
    }

    renderVideoGrid() {
        if (!this.workGrid) return;
        
        this.workGrid.innerHTML = '';
        
        this.videos.forEach(video => {
            const card = this.createVideoCard(video);
            this.workGrid.appendChild(card);
        });
    }

    createVideoCard(video) {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.type = video.category;
        
        const videoUrl = `assets/${video.filename}`;
        
        card.innerHTML = `
            <div class="thumb" onclick="videoPortfolio.openLightbox('${videoUrl}')">
                <video src="${videoUrl}" loop muted playsinline preload="metadata" controls style="width:100%;height:100%;object-fit:cover;border-radius:12px;"></video>
                <div class="play">▶</div>
                <div class="volume-control" onclick="event.stopPropagation(); videoPortfolio.toggleVolume(this)" style="position:absolute;top:10px;right:10px;background:rgba(0,0,0,0.7);color:white;border:none;border-radius:50%;width:35px;height:35px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:16px;z-index:10;">🔊</div>
                <div class="overlay">
                    <span class="category">${video.type}</span>
                </div>
            </div>
            <div class="meta">
                <h4>${video.title}</h4>
                <p>${video.type}</p>
            </div>
        `;
        
        const videoElement = card.querySelector('video');
        const thumbElement = card.querySelector('.thumb');
        
        if (videoElement && thumbElement) {
            // Desktop hover events
            thumbElement.addEventListener('mouseenter', () => {
                videoElement.play().catch(() => {});
            });
            
            thumbElement.addEventListener('mouseleave', () => {
                videoElement.pause();
                videoElement.currentTime = 0;
            });
            
            // Mobile touch events
            thumbElement.addEventListener('touchstart', (e) => {
                e.preventDefault();
                if (videoElement.paused) {
                    videoElement.play().catch(() => {});
                } else {
                    videoElement.pause();
                }
            });
            
            // Click for mobile
            thumbElement.addEventListener('click', (e) => {
                // Prevent opening lightbox when clicking video controls
                if (e.target.tagName === 'VIDEO') {
                    e.stopPropagation();
                }
            });
        }
        
        return card;
    }

    setupEventListeners() {
        if (this.lightbox) {
            this.lightbox.addEventListener('click', (e) => {
                if (e.target === this.lightbox) {
                    this.closeLightbox();
                }
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeLightbox();
            }
        });
    }

    openLightbox(videoSrc) {
        if (this.lightbox && this.lightboxVideo) {
            this.lightboxVideo.src = videoSrc;
            this.lightbox.style.display = 'flex';
            this.lightboxVideo.play();
        }
    }

    closeLightbox() {
        if (this.lightbox && this.lightboxVideo) {
            this.lightbox.style.display = 'none';
            this.lightboxVideo.pause();
            this.lightboxVideo.src = '';
        }
    }

    filterGrid(type) {
        const cards = this.workGrid.querySelectorAll('.card');
        cards.forEach(card => {
            if (type === 'all' || card.dataset.type === type) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    handleContactForm(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const budget = document.getElementById('budget').value;
        const message = document.getElementById('message').value;
        
        const webhookData = {
            embeds: [{
                title: "🎬 New Project Inquiry - edited.frame",
                color: 0x7B2FF2,
                fields: [
                    { name: "👤 Name", value: name, inline: true },
                    { name: "📧 Email", value: email, inline: true },
                    { name: "💰 Budget", value: budget || "Not specified", inline: true },
                    { name: "📝 Project Details", value: message }
                ],
                footer: { text: "edited.frame Contact Form" },
                timestamp: new Date().toISOString()
            }]
        };

        fetch('https://discord.com/api/webhooks/1286005199334703104/JwMLOSb0hxq-QQn_5MiqUBIVoXNWAhQ5EcI7rDy_MU8KTG5O8GQJOy5uIDbfpSSdF6lN', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(webhookData)
        })
        .then(response => {
            const msgElement = document.getElementById('formMsg');
            if (response.ok) {
                msgElement.innerHTML = '<span style="color: #4ade80;">✅ Message sent successfully!</span>';
                event.target.reset();
            } else {
                throw new Error('Failed to send');
            }
        })
        .catch(error => {
            const msgElement = document.getElementById('formMsg');
            msgElement.innerHTML = '<span style="color: #f87171;">❌ Failed to send message.</span>';
        });

        return false;
    }

    toggleVolume(button) {
        const video = button.parentElement.querySelector('video');
        if (video) {
            if (video.muted) {
                video.muted = false;
                video.volume = 0.3;
                button.textContent = '🔊';
                button.title = 'Mute video';
            } else {
                video.muted = true;
                button.textContent = '🔇';
                button.title = 'Unmute video';
            }
        }
    }

    setupFooterVideos() {
        // Setup footer videos with local assets instead of Azure blob
        const footerVideos = document.querySelectorAll('.footer-video[data-src]');
        
        // Use local assets for better reliability
        const localAssets = [
            'assets/trading (1).mp4',
            'assets/educational.mp4', 
            'assets/trading (2).mp4',
            'assets/motion graphic (1).mp4'
        ];
        
        footerVideos.forEach((video, index) => {
            if (localAssets[index]) {
                video.src = localAssets[index];
                video.removeAttribute('data-src');
                
                // Add hover interactions
                const parentItem = video.closest('.service-video-item');
                if (parentItem) {
                    parentItem.addEventListener('mouseenter', () => {
                        video.play().catch(() => {});
                    });
                    
                    parentItem.addEventListener('mouseleave', () => {
                        video.pause();
                        video.currentTime = 0;
                    });
                }
            }
        });
    }
}

// Global functions
function scrollToId(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

function sendEmail(event) {
    return window.videoPortfolio?.handleContactForm(event) || false;
}

function filterGrid(type) {
    window.videoPortfolio?.filterGrid(type);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    window.videoPortfolio = new VideoPortfolio();
});
