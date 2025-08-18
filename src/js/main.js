// Main JavaScript functionality for the video portfolio website

class VideoPortfolio {
    constructor() {
        this.lightbox = document.getElementById('lightbox');
        this.lightboxVideo = document.getElementById('lightboxVideo');
        this.workGrid = document.getElementById('workGrid');
        this.filterButtons = document.querySelectorAll('.filter');
        this.videos = [];
        
        this.init();
    }

    init() {
        this.loadVideos();
        this.setupEventListeners();
        this.setupFilterButtons();
        this.setupServiceShowcases();
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
            <div class="thumb" onclick="videoPortfolio.openLightbox('assets/${video.filename}')">
                <video 
                    src="assets/${video.filename}" 
                    muted 
                    loop 
                    playsinline 
                    preload="metadata"
                    onloadedmetadata="this.play().catch(()=>{})"
                    style="width:100%;height:100%;object-fit:cover;border-radius:12px;">
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
        
        return card;
    }

    setupEventListeners() {
        // Lightbox close functionality
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.closeLightbox();
            }
        });

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
                const filterValue = button.getAttribute('onclick').match(/'([^']+)'/)[1];
                this.filterGrid(filterValue);
            });
        });

        // Set "All" as default active
        document.querySelector('.filter[onclick*="all"]').classList.add('active');
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
        this.lightboxVideo.src = src;
        this.lightbox.classList.add('open');
        this.lightboxVideo.play().catch(() => {
            console.log('Video autoplay prevented');
        });
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        this.lightbox.classList.remove('open');
        this.lightboxVideo.pause();
        this.lightboxVideo.src = '';
        
        // Restore body scroll
        document.body.style.overflow = 'auto';
    }

    async handleContactForm(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            budget: document.getElementById('budget').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        // Validate form data
        if (!formData.name || !formData.email || !formData.message) {
            document.getElementById('formMsg').textContent = 
                'Please fill in all required fields (Name, Email, and Message).';
            document.getElementById('formMsg').style.color = '#ff4757';
            return;
        }

        // Show loading message
        const formMsgElement = document.getElementById('formMsg');
        formMsgElement.textContent = 'Sending message...';
        formMsgElement.style.color = '#fff';

        try {
            // Prepare Discord webhook payload
            const discordPayload = {
                embeds: [{
                    title: "🎬 New Project Inquiry",
                    color: 0x7289DA, // Discord blue
                    fields: [
                        {
                            name: "👤 Name",
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
                            name: "💬 Message",
                            value: formData.message,
                            inline: false
                        }
                    ],
                    timestamp: new Date().toISOString(),
                    footer: {
                        text: "Video Portfolio Contact Form"
                    }
                }]
            };

            // Send to Discord webhook
            const response = await fetch('https://discord.com/api/webhooks/1407102230620016660/PktP90bwhlLKelQ5wwScuke9qmYjuKoVLjxFAVcR0dBGheqdUyXmTXwBazVB70GVtffL', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(discordPayload)
            });

            if (response.ok) {
                // Success message
                formMsgElement.textContent = 'Message sent successfully! I\'ll get back to you soon.';
                formMsgElement.style.color = '#2ed573';
                
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

    // Utility function for smooth scrolling
    scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Method to add new videos dynamically (for future use)
    addVideo(videoData) {
        this.videos.push(videoData);
        this.renderVideoGrid();
    }

    // Method to update video categories (for future use)
    updateVideoCategories() {
        // This method can be used to automatically detect new videos
        // and categorize them based on filename patterns
        console.log('Video categories updated');
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
        
        // Setup individual video item interactions
        const showcaseVideoItems = document.querySelectorAll('.showcase-video-item');
        
        showcaseVideoItems.forEach(videoItem => {
            const video = videoItem.querySelector('video');
            const playBtn = videoItem.querySelector('.showcase-play-btn');
            
            // Handle video click for fullscreen-like experience
            videoItem.addEventListener('click', (e) => {
                e.stopPropagation();
                
                if (video.paused) {
                    // Pause all other showcase videos
                    document.querySelectorAll('.showcase-video').forEach(otherVideo => {
                        if (otherVideo !== video) {
                            otherVideo.pause();
                        }
                    });
                    
                    video.play().catch(() => {});
                    playBtn.style.opacity = '0';
                } else {
                    video.pause();
                    playBtn.style.opacity = '1';
                }
            });
            
            // Handle video end
            video.addEventListener('ended', () => {
                playBtn.style.opacity = '1';
                video.currentTime = 0;
            });
            
            // Handle video play/pause state
            video.addEventListener('play', () => {
                playBtn.style.opacity = '0';
            });
            
            video.addEventListener('pause', () => {
                playBtn.style.opacity = '1';
            });
            
            // Handle hover effects
            videoItem.addEventListener('mouseenter', () => {
                if (video.paused) {
                    video.play().catch(() => {});
                }
            });
            
            videoItem.addEventListener('mouseleave', () => {
                // Don't pause on mouse leave to allow continuous viewing
                // video.pause();
            });
        });
    }
}

// Utility functions for global access
function scrollToId(id) {
    videoPortfolio.scrollToSection(id);
}

function filterGrid(filter) {
    videoPortfolio.filterGrid(filter);
}

function openLightbox(src) {
    videoPortfolio.openLightbox(src);
}

function closeLightbox(e) {
    if (e && e.target !== videoPortfolio.lightbox) return;
    videoPortfolio.closeLightbox();
}

function sendEmail(e) {
    return videoPortfolio.handleContactForm(e);
}

// Smooth scroll function for navigation
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Force hero video autoplay
function ensureHeroVideoPlays() {
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        heroVideo.muted = true;
        heroVideo.play().catch(() => {
            // If autoplay fails, try again after user interaction
            document.addEventListener('click', () => {
                heroVideo.play().catch(() => {});
            }, { once: true });
        });
        
        // Ensure video keeps playing
        heroVideo.addEventListener('pause', () => {
            if (!heroVideo.ended) {
                heroVideo.play().catch(() => {});
            }
        });
        
        // Restart video when it ends
        heroVideo.addEventListener('ended', () => {
            heroVideo.currentTime = 0;
            heroVideo.play().catch(() => {});
        });
    }
}

// Footer video interactions
function setupFooterVideos() {
    const footerVideos = document.querySelectorAll('.footer-video');
    const serviceItems = document.querySelectorAll('.service-video-item');
    
    serviceItems.forEach((item, index) => {
        const video = item.querySelector('.footer-video');
        
        item.addEventListener('mouseenter', () => {
            if (video) {
                video.currentTime = 0;
                video.play().catch(() => {});
            }
        });
        
        item.addEventListener('mouseleave', () => {
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
        });
        
        item.addEventListener('click', () => {
            // Could open lightbox or navigate to portfolio
            const portfolioSection = document.getElementById('portfolio');
            if (portfolioSection) {
                portfolioSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Initialize the application when DOM is loaded
let videoPortfolio;

document.addEventListener('DOMContentLoaded', () => {
    videoPortfolio = new VideoPortfolio();
    
    // Ensure hero video autoplays
    ensureHeroVideoPlays();
    
    // Setup footer video interactions
    setupFooterVideos();
    
    // Setup random footer background videos
    setupRandomFooterBackground();
    
    // Setup interactive workflow animations
    setupWorkflowAnimations();
    
    // Setup smooth scrolling for navigation links
    document.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                const targetId = href.substring(1);
                smoothScrollTo(targetId);
            }
        });
    });
});

// Setup random footer background video rotation
function setupRandomFooterBackground() {
    const backgroundVideo = document.querySelector('.footer-bg-video');
    if (!backgroundVideo) return;

    // Get your actual video URLs
    const getVideoUrls = () => {
        // Use your actual videos from assets folder
        return [
            'assets/motion graphic (1).mp4',
            'assets/motion graphic (2).mp4',
            'assets/motion graphic (3).mp4',
            'assets/trading (1).mp4',
            'assets/trading (2).mp4',
            'assets/trading (3).mp4',
            'assets/trading (4).mp4',
            'assets/tradind 5.mp4',
            'assets/educational.mp4',
            'assets/educational (2).mp4',
            'assets/sub vdo.mp4'
        ];
    };

    let currentVideoIndex = 0;
    
    // Function to change to random video
    function changeToRandomVideo() {
        const videoAssets = getVideoUrls();
        
        // Get random video different from current
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * videoAssets.length);
        } while (randomIndex === currentVideoIndex && videoAssets.length > 1);
        
        currentVideoIndex = randomIndex;
        const newVideoSrc = videoAssets[currentVideoIndex];
        
        // Create smooth transition
        backgroundVideo.style.opacity = '0.5';
        
        setTimeout(() => {
            backgroundVideo.src = newVideoSrc;
            backgroundVideo.load();
            
            backgroundVideo.addEventListener('loadeddata', () => {
                backgroundVideo.style.opacity = '1';
                backgroundVideo.play().catch(() => {});
            }, { once: true });
            
            // If video fails to load, show placeholder
            backgroundVideo.addEventListener('error', () => {
                console.log('Background video failed to load:', newVideoSrc);
                backgroundVideo.style.opacity = '1';
            }, { once: true });
        }, 500);
    }
    
    // Change video every 15 seconds
    setInterval(changeToRandomVideo, 15000);
    
    // Change video on footer hover
    const footer = document.querySelector('.footer');
    let hoverTimeout;
    
    footer.addEventListener('mouseenter', () => {
        clearTimeout(hoverTimeout);
        hoverTimeout = setTimeout(changeToRandomVideo, 1000);
    });
    
    footer.addEventListener('mouseleave', () => {
        clearTimeout(hoverTimeout);
    });
    
    // Set initial random video
    changeToRandomVideo();
}

// Setup interactive workflow animations
function setupWorkflowAnimations() {
    const workflowSteps = document.querySelectorAll('.workflow-step');
    const workflowSection = document.querySelector('.workflow-section');
    
    if (!workflowSteps.length || !workflowSection) return;
    
    // Add intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const workflowObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                
                // Trigger sequential step animations
                workflowSteps.forEach((step, index) => {
                    setTimeout(() => {
                        step.style.animationDelay = `${index * 0.2}s`;
                        step.classList.add('animate-in');
                    }, index * 200);
                });
            }
        });
    }, observerOptions);
    
    workflowObserver.observe(workflowSection);
    
    // Add hover sound effect simulation
    workflowSteps.forEach((step, index) => {
        step.addEventListener('mouseenter', () => {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'workflow-ripple';
            ripple.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                background: radial-gradient(circle, rgba(123,47,242,0.3), transparent);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: rippleEffect 0.6s ease-out;
                pointer-events: none;
                z-index: 0;
            `;
            
            step.style.position = 'relative';
            step.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Add progressive highlight effect
        step.addEventListener('click', () => {
            workflowSteps.forEach((otherStep, otherIndex) => {
                if (otherIndex <= index) {
                    otherStep.classList.add('completed');
                } else {
                    otherStep.classList.remove('completed');
                }
            });
        });
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleEffect {
            from {
                width: 0;
                height: 0;
                opacity: 1;
            }
            to {
                width: 200px;
                height: 200px;
                opacity: 0;
            }
        }
        
        .workflow-step.completed .step-number {
            background: linear-gradient(135deg, #2ed573, #00d4aa) !important;
            box-shadow: 0 8px 25px rgba(46, 213, 115, 0.4) !important;
        }
        
        .workflow-step.completed::after {
            content: '✓';
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            color: #2ed573;
            font-size: 20px;
            font-weight: bold;
            opacity: 0;
            animation: checkmarkAppear 0.5s ease forwards;
        }
        
        @keyframes checkmarkAppear {
            from {
                opacity: 0;
                transform: translateY(-50%) scale(0);
            }
            to {
                opacity: 1;
                transform: translateY(-50%) scale(1);
            }
        }
        
        .workflow-step.animate-in {
            animation: workflowSlideIn 0.8s ease forwards !important;
        }
    `;
    document.head.appendChild(style);
}

// Handle page visibility for video performance
document.addEventListener('visibilitychange', () => {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        if (document.hidden) {
            if (!video.classList.contains('hero-video')) {
                video.pause();
            }
        } else {
            if (video.classList.contains('hero-video')) {
                video.play().catch(() => {});
            }
        }
    });
});

// Force hero video to play on any user interaction
document.addEventListener('click', () => {
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo && heroVideo.paused) {
        heroVideo.play().catch(() => {});
    }
}, { once: true });
