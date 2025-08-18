// Direct Video Manager - NO AZURE - Uses your actual videos
class DirectVideoManager {
    constructor() {
        console.log('🎬 Loading YOUR actual videos from assets folder...');
        
        // Your actual video files - NO AZURE NEEDED!
        this.videos = {
            'trading-1': 'assets/trading (1).mp4',
            'trading-2': 'assets/trading (2).mp4', 
            'trading-3': 'assets/trading (3).mp4',
            'trading-4': 'assets/trading (4).mp4',
            'trading-5': 'assets/tradind 5.mp4',
            'motion-1': 'assets/motion graphic (1).mp4',
            'motion-2': 'assets/motion graphic (2).mp4',
            'motion-3': 'assets/motion graphic (3).mp4',
            'educational-1': 'assets/educational.mp4',
            'educational-2': 'assets/educational (2).mp4',
            'sub-video': 'assets/sub vdo.mp4'
        };

        this.titles = {
            'trading-1': 'Trading Analysis - YouTube Shorts',
            'trading-2': 'Market Analysis - Instagram Reels', 
            'trading-3': 'Forex Strategy - YouTube Shorts',
            'trading-4': 'Crypto Trading - Instagram Reels',
            'trading-5': 'Trading Tutorial - YouTube Shorts',
            'motion-1': 'Motion Graphics - Promo Videos',
            'motion-2': 'Real Estate Video - Property Showcase',
            'motion-3': 'Brand Animation - Promo Videos',
            'educational-1': 'Educational Content - YouTube Shorts',
            'educational-2': 'Tutorial Series - Instagram Reels',
            'sub-video': 'Subtitle Demo - YouTube Shorts'
        };
    }

    init() {
        console.log('🎬 Initializing Direct Video Manager...');
        this.removeAllAzureStuff();
        this.loadActualVideos();
        this.setupVideoShowcases();
        this.setupFooterVideos();
        console.log('✅ ALL VIDEOS LOADED FROM YOUR ASSETS FOLDER!');
    }

    removeAllAzureStuff() {
        // Kill ALL Azure references immediately and aggressively
        setTimeout(() => {
            // Remove upload button
            const uploadBtn = document.getElementById('video-upload-notice');
            if (uploadBtn) {
                uploadBtn.remove();
                console.log('🗑️ REMOVED Azure upload button');
            }

            // Remove any Azure loading messages
            document.querySelectorAll('*').forEach(el => {
                if (el.textContent && (
                    el.textContent.includes('Video Loading from Azure') ||
                    el.textContent.includes('Upload Videos to Azure') ||
                    el.textContent.includes('High-quality video will appear here') ||
                    el.textContent.includes('Azure') ||
                    el.textContent.toLowerCase().includes('upload')
                )) {
                    el.remove();
                    console.log('🗑️ REMOVED Azure message element');
                }
            });

            // Remove placeholder divs with Azure messages
            document.querySelectorAll('.video-placeholder').forEach(placeholder => {
                placeholder.remove();
                console.log('🗑️ REMOVED video placeholder');
            });

            // Remove any elements with Azure-related classes or IDs
            document.querySelectorAll('[id*="azure"], [class*="azure"], [data-azure], [id*="upload"], [class*="upload"]').forEach(el => {
                el.remove();
                console.log('🗑️ REMOVED Azure element');
            });
        }, 100);

        // Also run again after 1 second to catch any delayed elements
        setTimeout(() => {
            document.querySelectorAll('#video-upload-notice').forEach(el => el.remove());
            document.querySelectorAll('*').forEach(el => {
                if (el.textContent && el.textContent.includes('Azure')) {
                    el.remove();
                }
            });
            console.log('🗑️ SECOND CLEANUP PASS COMPLETED');
        }, 1000);

        console.log('🗑️ AGGRESSIVE AZURE CLEANUP INITIATED');
    }

    loadActualVideos() {
        // First, aggressively remove ALL placeholder content
        document.querySelectorAll('.video-placeholder, .thumb').forEach(container => {
            // Clear ALL content from video containers
            const placeholderDivs = container.querySelectorAll('div[style*="Video Loading"], div[style*="Azure"]');
            placeholderDivs.forEach(div => div.remove());
        });

        // Replace ALL video sources with your actual files
        document.querySelectorAll('video').forEach((video, index) => {
            const videoKeys = Object.keys(this.videos);
            const videoKey = videoKeys[index % videoKeys.length];
            const videoPath = this.videos[videoKey];
            
            // Clear existing sources
            video.innerHTML = '';
            
            // Add your actual video
            const source = document.createElement('source');
            source.src = videoPath;
            source.type = 'video/mp4';
            video.appendChild(source);
            
            video.muted = true;
            video.loop = true;
            video.style.cssText = 'width: 100%; height: 100%; object-fit: cover;';
            
            console.log(`✅ Video ${index + 1}: ${videoPath}`);
        });

        // Also replace any thumb containers that have placeholder content
        document.querySelectorAll('.thumb').forEach((thumb, index) => {
            // Remove all placeholder content
            const placeholders = thumb.querySelectorAll('div[style*="gradient"], div[style*="Video Loading"], .video-placeholder');
            placeholders.forEach(p => p.remove());

            // If no video exists, create one
            if (!thumb.querySelector('video')) {
                const videoKeys = Object.keys(this.videos);
                const videoKey = videoKeys[index % videoKeys.length];
                const videoPath = this.videos[videoKey];
                
                const video = document.createElement('video');
                video.muted = true;
                video.loop = true;
                video.style.cssText = 'width: 100%; height: 100%; object-fit: cover; position: absolute; top: 0; left: 0;';
                
                const source = document.createElement('source');
                source.src = videoPath;
                source.type = 'video/mp4';
                video.appendChild(source);
                
                thumb.insertBefore(video, thumb.firstChild);
                console.log(`✅ Added video to thumb: ${videoPath}`);
            }
        });
    }

    setupVideoShowcases() {
        // Add videos to showcase cards
        document.querySelectorAll('.card').forEach((card, index) => {
            const thumb = card.querySelector('.thumb');
            if (thumb && !thumb.querySelector('video')) {
                const videoKeys = Object.keys(this.videos);
                const videoKey = videoKeys[index % videoKeys.length];
                const videoPath = this.videos[videoKey];
                const title = this.titles[videoKey];
                
                // Create video element
                const video = document.createElement('video');
                video.muted = true;
                video.loop = true;
                video.style.cssText = `
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    cursor: pointer;
                `;
                
                const source = document.createElement('source');
                source.src = videoPath;
                source.type = 'video/mp4';
                video.appendChild(source);
                
                // Add to thumb
                thumb.appendChild(video);
                
                // Update card text
                const cardTitle = card.querySelector('.card h3, .card .title');
                if (cardTitle) cardTitle.textContent = title.split(' - ')[0];
                
                const cardCategory = card.querySelector('.card p, .card .category');
                if (cardCategory) cardCategory.textContent = title.split(' - ')[1];
                
                // Hover effects
                card.addEventListener('mouseenter', () => {
                    video.currentTime = 0;
                    video.play().catch(() => {});
                });
                
                card.addEventListener('mouseleave', () => {
                    video.pause();
                    video.currentTime = 0;
                });
                
                // Click to fullscreen
                card.addEventListener('click', () => {
                    this.showFullscreen(title, videoPath);
                });
                
                console.log(`✅ Added showcase: ${title} -> ${videoPath}`);
            }
        });
    }

    setupFooterVideos() {
        // Setup footer background videos
        const footerVideos = [
            'assets/trading (1).mp4',
            'assets/motion graphic (1).mp4',
            'assets/educational.mp4',
            'assets/trading (2).mp4'
        ];
        
        document.querySelectorAll('.footer-video').forEach((video, index) => {
            const videoPath = footerVideos[index % footerVideos.length];
            const source = video.querySelector('source') || document.createElement('source');
            source.src = videoPath;
            source.type = 'video/mp4';
            
            if (!video.querySelector('source')) {
                video.appendChild(source);
            }
            
            video.muted = true;
            video.loop = true;
            video.autoplay = true;
            
            console.log(`✅ Footer video ${index + 1}: ${videoPath}`);
        });
    }

    showFullscreen(title, videoPath) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            backdrop-filter: blur(10px);
        `;
        
        modal.innerHTML = `
            <div style="max-width: 90%; max-height: 90%; position: relative;">
                <div style="color: white; text-align: center; margin-bottom: 20px; font-size: 24px; font-weight: bold;">
                    ${title}
                </div>
                <video controls autoplay style="width: 100%; max-height: 80vh; border-radius: 10px;">
                    <source src="${videoPath}" type="video/mp4">
                </video>
                <button onclick="this.parentElement.parentElement.remove()" 
                        style="position: absolute; top: -10px; right: -10px; 
                               background: #ff4757; color: white; border: none; 
                               border-radius: 50%; width: 40px; height: 40px; 
                               font-size: 20px; cursor: pointer; font-weight: bold;">
                    ×
                </button>
            </div>
        `;
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
        
        document.body.appendChild(modal);
    }
}

// Initialize immediately - NO AZURE!
document.addEventListener('DOMContentLoaded', () => {
    const manager = new DirectVideoManager();
    manager.init();
    window.DirectVideoManager = manager;
    
    // KILL ANY UPLOAD BUTTONS IMMEDIATELY
    setInterval(() => {
        const uploadBtn = document.getElementById('video-upload-notice');
        if (uploadBtn) {
            uploadBtn.remove();
            console.log('🗑️ KILLED UPLOAD BUTTON!');
        }
        
        // Remove any Azure text
        document.querySelectorAll('*').forEach(el => {
            if (el.textContent && el.textContent.includes('Upload Videos to Azure')) {
                el.remove();
                console.log('🗑️ KILLED Azure text!');
            }
        });
    }, 500);
});
