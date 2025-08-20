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
            { filename: 'trading (1).mp4', title: 'Candlestick Pattern', category: 'trading-reel', type: 'Trading Reel' },
            { filename: 'trading (2).mp4', title: 'Support and Resistance', category: 'trading-reel', type: 'Trading Reel' },
            { filename: 'trading (3).mp4', title: 'Forex Strategy', category: 'trading-reel', type: 'Trading Reel' },
            { filename: 'trading (4).mp4', title: 'Leverage', category: 'trading-reel', type: 'Trading Reel' },
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
            <div class="thumb">
                <video src="${videoUrl}" loop muted playsinline preload="metadata" style="width:100%;height:100%;object-fit:cover;border-radius:12px;"></video>
                <div class="video-controls">
                    <div class="play-overlay">▶</div>
                    <div class="volume-control" title="Toggle volume">🔊</div>
                    <div class="fullscreen-btn" title="Fullscreen">⛶</div>
                </div>
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
        const playOverlay = card.querySelector('.play-overlay');
        const volumeControl = card.querySelector('.volume-control');
        const fullscreenBtn = card.querySelector('.fullscreen-btn');
        
        if (videoElement && thumbElement) {
            // Stop all other videos when this one starts
            const stopAllOtherVideos = () => {
                document.querySelectorAll('.card video').forEach(v => {
                    if (v !== videoElement) {
                        v.pause();
                        v.currentTime = 0;
                        v.muted = true;
                    }
                });
            };

            // Desktop hover events
            thumbElement.addEventListener('mouseenter', () => {
                stopAllOtherVideos();
                videoElement.currentTime = 0; // Reset to start
                videoElement.play().catch(() => {});
                playOverlay.style.opacity = '0';
            });
            
            thumbElement.addEventListener('mouseleave', () => {
                videoElement.pause();
                videoElement.currentTime = 0;
                videoElement.muted = true;
                volumeControl.textContent = '🔊';
                playOverlay.style.opacity = '1';
            });
            
            // Mobile touch events - enhanced for single-tap fullscreen
            let tapTimeout;
            thumbElement.addEventListener('touchstart', (e) => {
                if (e.target.classList.contains('volume-control') || e.target.classList.contains('fullscreen-btn')) {
                    return; // Let button handlers deal with it
                }
                
                e.preventDefault();
                
                // Clear any existing timeout
                if (tapTimeout) {
                    clearTimeout(tapTimeout);
                    tapTimeout = null;
                    // Double tap detected - open fullscreen immediately
                    this.openMobileFullscreen(videoElement, video);
                    return;
                }
                
                // Single tap - start video and set timeout for potential double tap
                tapTimeout = setTimeout(() => {
                    tapTimeout = null;
                    stopAllOtherVideos();
                    
                    if (videoElement.paused) {
                        videoElement.currentTime = 0;
                        videoElement.play().catch(() => {});
                        playOverlay.style.opacity = '0';
                    } else {
                        // If already playing, single tap opens fullscreen
                        this.openMobileFullscreen(videoElement, video);
                    }
                }, 300); // 300ms window for double tap
            });

            // Single tap on video area for quick fullscreen
            videoElement.addEventListener('click', (e) => {
                e.stopPropagation();
                if (window.innerWidth <= 768) { // Mobile only
                    this.openMobileFullscreen(videoElement, video);
                }
            });

            // Volume control
            volumeControl.addEventListener('click', (e) => {
                e.stopPropagation();
                if (videoElement.muted) {
                    videoElement.muted = false;
                    videoElement.volume = 0.5;
                    volumeControl.textContent = '🔊';
                } else {
                    videoElement.muted = true;
                    volumeControl.textContent = '🔇';
                }
            });

            // Fullscreen for mobile
            fullscreenBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.openMobileFullscreen(videoElement, video);
            });

            // Keyboard support
            card.addEventListener('keydown', (e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    if (videoElement.paused) {
                        stopAllOtherVideos();
                        videoElement.play().catch(() => {});
                    } else {
                        videoElement.pause();
                    }
                }
            });
        }
        
        return card;
    }

    openMobileFullscreen(videoElement, videoData) {
        // Create fullscreen modal
        const modal = document.createElement('div');
        modal.className = 'mobile-fullscreen-modal';
        modal.innerHTML = `
            <div class="fullscreen-header">
                <h3>${videoData.title}</h3>
                <button class="close-fullscreen">✕</button>
            </div>
            <div class="fullscreen-video-container">
                <video src="${videoElement.src}" controls autoplay playsinline style="width:100%;height:auto;max-height:80vh;object-fit:contain;">
                </video>
            </div>
            <div class="fullscreen-controls">
                <button class="fs-play-pause">⏯</button>
                <button class="fs-volume">🔊</button>
                <input type="range" class="fs-progress" min="0" max="100" value="0">
                <span class="fs-time">0:00 / 0:00</span>
            </div>
        `;

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        const fsVideo = modal.querySelector('video');
        const closeBtn = modal.querySelector('.close-fullscreen');
        const playPauseBtn = modal.querySelector('.fs-play-pause');
        const volumeBtn = modal.querySelector('.fs-volume');
        const progressBar = modal.querySelector('.fs-progress');
        const timeDisplay = modal.querySelector('.fs-time');

        // Close functionality
        const closeFullscreen = () => {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
        };

        closeBtn.addEventListener('click', closeFullscreen);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeFullscreen();
        });

        // Video controls
        playPauseBtn.addEventListener('click', () => {
            if (fsVideo.paused) {
                fsVideo.play();
                playPauseBtn.textContent = '⏸';
            } else {
                fsVideo.pause();
                playPauseBtn.textContent = '▶';
            }
        });

        volumeBtn.addEventListener('click', () => {
            fsVideo.muted = !fsVideo.muted;
            volumeBtn.textContent = fsVideo.muted ? '🔇' : '🔊';
        });

        // Progress bar
        fsVideo.addEventListener('timeupdate', () => {
            if (fsVideo.duration) {
                const progress = (fsVideo.currentTime / fsVideo.duration) * 100;
                progressBar.value = progress;
                
                const currentMin = Math.floor(fsVideo.currentTime / 60);
                const currentSec = Math.floor(fsVideo.currentTime % 60);
                const durationMin = Math.floor(fsVideo.duration / 60);
                const durationSec = Math.floor(fsVideo.duration % 60);
                
                timeDisplay.textContent = `${currentMin}:${currentSec.toString().padStart(2, '0')} / ${durationMin}:${durationSec.toString().padStart(2, '0')}`;
            }
        });

        progressBar.addEventListener('input', () => {
            if (fsVideo.duration) {
                fsVideo.currentTime = (progressBar.value / 100) * fsVideo.duration;
            }
        });
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

        const msgElement = document.getElementById('formMsg');
        msgElement.innerHTML = '<span style="color: #7b2ff2;">📤 Sending via Formspree...</span>';

        // GitHub Pages deployment - prioritize client-side solutions
        // Method 1: Formspree (works on GitHub Pages)
        this.sendViaFormspree(name, email, budget, message, event.target)
            .catch(() => {
                // Method 2: EmailJS (backup client-side service)
                msgElement.innerHTML = '<span style="color: #7b2ff2;">📧 Trying backup method...</span>';
                return this.sendViaEmailJS(name, email, budget, message, event.target);
            })
            .catch(() => {
                // Method 3: Discord webhook as notification fallback
                msgElement.innerHTML = '<span style="color: #7b2ff2;">� Sending Discord notification...</span>';
                return this.sendToDiscord(name, email, budget, message).then(() => {
                    const msgElement = document.getElementById('formMsg');
                    msgElement.innerHTML = '<span style="color: #4ade80;">✅ Message sent via Discord! Please also email directly: connectwithsachin06@gmail.com</span>';
                    event.target.reset();
                    return true;
                });
            })
            .catch(() => {
                // All methods failed - show error with direct contact
                const msgElement = document.getElementById('formMsg');
                msgElement.innerHTML = '<span style="color: #f87171;">❌ Failed to send message. Please email directly at connectwithsachin06@gmail.com</span>';
            });

        return false;
    }

    async sendViaGmailSMTP(name, email, budget, message, form) {
        try {
            const response = await fetch('gmail-smtp.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, budget, message })
            });

            if (!response.ok) {
                throw new Error(`Gmail SMTP failed with status: ${response.status}`);
            }

            const result = await response.json();
            
            if (result.success) {
                const msgElement = document.getElementById('formMsg');
                msgElement.innerHTML = '<span style="color: #4ade80;">✅ Perfect! Emails sent to both addresses via Gmail SMTP. I\'ll get back to you within 24 hours!</span>';
                form.reset();
                console.log('Gmail SMTP email sent successfully');
                return true;
            } else {
                throw new Error(result.message || 'Gmail SMTP failed');
            }
        } catch (error) {
            console.log('Gmail SMTP failed:', error.message);
            throw error;
        }
    }

    async sendViaPHP(name, email, budget, message, form) {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('budget', budget || 'Not specified');
        formData.append('message', message);
        
        const response = await fetch('contact.php', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (response.ok && result.success) {
            const msgElement = document.getElementById('formMsg');
            msgElement.innerHTML = '<span style="color: #4ade80;">✅ Message sent successfully! I\'ll get back to you within 24 hours.</span>';
            form.reset();
            return true;
        } else {
            throw new Error(result.error || 'PHP backend failed');
        }
    }

    async sendViaFormspree(name, email, budget, message, form) {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('budget', budget || 'Not specified');
        formData.append('message', message);
        formData.append('_replyto', email);
        formData.append('_subject', `🎬 New Project Inquiry from ${name} - edited.frame`);
        
        // Send only to connectwithsachin06@gmail.com
        formData.append('_to', 'connectwithsachin06@gmail.com');
        
        // Using your new Formspree endpoint
        const response = await fetch('https://formspree.io/f/mvgqjqqg', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            const msgElement = document.getElementById('formMsg');
            msgElement.innerHTML = '<span style="color: #4ade80;">✅ Message sent successfully! Email sent to connectwithsachin06@gmail.com. I\'ll get back to you within 24 hours.</span>';
            form.reset();
            
            // Also send to Discord as backup
            this.sendToDiscord(name, email, budget, message).catch(() => {
                console.log('Discord notification failed, but email was sent successfully');
            });
            return true;
        } else {
            throw new Error('Formspree failed');
        }
    }

    async sendViaEmailJS(name, email, budget, message, form) {
        // EmailJS requires setup at emailjs.com
        if (typeof emailjs === 'undefined') {
            throw new Error('EmailJS not loaded');
        }

        const templateParams = {
            from_name: name,
            from_email: email,
            budget: budget || 'Not specified',
            message: message,
            to_email: 'npdimagine@gmail.com'
        };

        const response = await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams);
        
        const msgElement = document.getElementById('formMsg');
        msgElement.innerHTML = '<span style="color: #4ade80;">✅ Message sent successfully via EmailJS!</span>';
        form.reset();
        return true;
    }

    sendViaMailto(name, email, budget, message) {
        const subject = encodeURIComponent(`New Project Inquiry from ${name}`);
        const body = encodeURIComponent(
            `Name: ${name}\n` +
            `Email: ${email}\n` +
            `Budget: ${budget || 'Not specified'}\n\n` +
            `Message:\n${message}\n\n` +
            `---\nSent from edited.frame contact form`
        );
        
        const mailtoLink = `mailto:npdimagine@gmail.com?subject=${subject}&body=${body}`;
        window.location.href = mailtoLink;
        
        const msgElement = document.getElementById('formMsg');
        msgElement.innerHTML = '<span style="color: #fbbf24;">📧 Opening your email client... Please send the message manually.</span>';
    }

    async sendToDiscord(name, email, budget, message) {
        // Your actual Discord webhook URL
        const webhookURL = 'https://discord.com/api/webhooks/1407102230620016660/PktP90bwhlLKelQ5wwScuke9qmYjuKoVLjxFAVcR0dBGheqdUyXmTXwBazVB70GVtffL';
        
        const embed = {
            title: "🎬 New Project Inquiry - edited.frame",
            color: 8067042, // Purple color
            fields: [
                { name: "👤 Client Name", value: name, inline: true },
                { name: "📧 Client Email", value: email, inline: true },
                { name: "💰 Budget", value: budget || "Not specified", inline: true },
                { name: "📝 Project Details", value: message.length > 1000 ? message.substring(0, 1000) + "..." : message }
            ],
            footer: { 
                text: "📧 Emails sent to: connectwithsachin06@gmail.com" 
            },
            timestamp: new Date().toISOString()
        };

        const webhookData = { 
            content: "🚨 **New Project Inquiry Received!** 🚨",
            embeds: [embed] 
        };

        try {
            const response = await fetch(webhookURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(webhookData)
            });

            if (!response.ok) {
                console.log('Discord webhook failed with status:', response.status);
                throw new Error('Discord webhook failed');
            }
            
            console.log('Discord notification sent successfully');
            return true;
        } catch (error) {
            console.log('Discord notification failed:', error.message);
            throw error;
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
