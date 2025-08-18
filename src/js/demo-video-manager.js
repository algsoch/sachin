// Demo Video Manager - Works without requiring user uploads
class DemoVideoManager {
    constructor() {
        this.demoVideos = {
            // Using your actual videos from assets folder
            'trading-1': 'assets/trading (1).mp4',
            'trading-2': 'assets/trading (2).mp4',
            'trading-3': 'assets/trading (3).mp4',
            'trading-4': 'assets/trading (4).mp4',
            'trading-5': 'assets/tradind 5.mp4',
            'motion-graphic-1': 'assets/motion graphic (1).mp4',
            'motion-graphic-2': 'assets/motion graphic (2).mp4',
            'motion-graphic-3': 'assets/motion graphic (3).mp4',
            'educational': 'assets/educational.mp4',
            'educational-2': 'assets/educational (2).mp4',
            'sub-video': 'assets/sub vdo.mp4'
        };
        
        this.fallbackContent = {
            'trading-1': { title: 'Technical Analysis Trading', category: 'trading' },
            'trading-2': { title: 'Market Movement Analysis', category: 'trading' },
            'trading-3': { title: 'Forex Trading Strategy', category: 'trading' },
            'trading-4': { title: 'Crypto Trading Guide', category: 'trading' },
            'trading-5': { title: 'Advanced Trading Setup', category: 'trading' },
            'motion-graphic-1': { title: 'Motion Graphics Reel', category: 'graphics' },
            'motion-graphic-2': { title: 'Property Showcase', category: 'realestate' },
            'motion-graphic-3': { title: 'Brand Promotion', category: 'promo' },
            'educational': { title: 'Educational Content', category: 'educational' },
            'educational-2': { title: 'Tutorial Series', category: 'educational' },
            'sub-video': { title: 'Subtitle Demo', category: 'demo' }
        };
    }

    init() {
        console.log('🎬 Demo Video Manager: Initializing with your actual videos...');
        this.replaceVideoSources();
        this.setupErrorHandling();
        console.log('✅ Your videos from assets folder are now active!');
    }

    replaceVideoSources() {
        // Replace all video sources with your actual videos
        document.querySelectorAll('video source').forEach(source => {
            const currentSrc = source.getAttribute('src');
            if (currentSrc && currentSrc.includes('assets/')) {
                const videoKey = this.extractVideoKey(currentSrc);
                if (this.demoVideos[videoKey]) {
                    source.setAttribute('src', this.demoVideos[videoKey]);
                    console.log(`✅ Using your video: ${currentSrc} -> ${this.demoVideos[videoKey]}`);
                }
            }
        });

        // Handle video elements with direct src
        document.querySelectorAll('video[src]').forEach(video => {
            const currentSrc = video.getAttribute('src');
            if (currentSrc && currentSrc.includes('assets/')) {
                const videoKey = this.extractVideoKey(currentSrc);
                if (this.demoVideos[videoKey]) {
                    video.setAttribute('src', this.demoVideos[videoKey]);
                    console.log(`✅ Using your video: ${currentSrc} -> ${this.demoVideos[videoKey]}`);
                }
            }
        });
    }

    extractVideoKey(src) {
        // Extract key from paths like "assets/trading (1).mp4"
        const filename = src.split('/').pop().toLowerCase();
        
        if (filename.includes('trading (1)')) return 'trading-1';
        if (filename.includes('trading (2)')) return 'trading-2';
        if (filename.includes('trading (3)')) return 'trading-3';
        if (filename.includes('trading (4)')) return 'trading-4';
        if (filename.includes('tradind 5')) return 'trading-5';
        if (filename.includes('motion graphic (1)')) return 'motion-graphic-1';
        if (filename.includes('motion graphic (2)')) return 'motion-graphic-2';
        if (filename.includes('motion graphic (3)')) return 'motion-graphic-3';
        if (filename.includes('educational (2)')) return 'educational-2';
        if (filename.includes('educational.mp4')) return 'educational';
        if (filename.includes('sub vdo')) return 'sub-video';
        
        return null;
    }

    createPlaceholderForVideo(videoElement) {
        const placeholder = document.createElement('div');
        placeholder.className = 'video-demo-placeholder';
        placeholder.style.cssText = `
            width: 100%;
            height: 100%;
            min-height: 200px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 16px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            text-align: center;
            position: relative;
            cursor: pointer;
            transition: all 0.3s ease;
        `;
        
        const videoKey = Math.random() > 0.5 ? 'trading-1' : 'motion-graphic-1';
        const content = this.fallbackContent[videoKey];
        
        placeholder.innerHTML = `
            <div style="font-size: 48px; margin-bottom: 16px;">🎬</div>
            <div style="font-size: 18px; margin-bottom: 8px;">${content.title}</div>
            <div style="font-size: 14px; opacity: 0.8; margin-bottom: 16px;">Demo Content</div>
            <div style="background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 20px; font-size: 12px;">
                Click to play demo
            </div>
        `;
        
        placeholder.addEventListener('click', () => {
            this.showVideoModal(content.title, this.demoVideos[videoKey]);
        });
        
        placeholder.addEventListener('mouseenter', () => {
            placeholder.style.transform = 'scale(1.02)';
            placeholder.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
        });
        
        placeholder.addEventListener('mouseleave', () => {
            placeholder.style.transform = 'scale(1)';
            placeholder.style.boxShadow = 'none';
        });
        
        videoElement.parentNode.replaceChild(placeholder, videoElement);
    }

    createVideoPlaceholders() {
        // Create placeholders for video cards that don't have videos
        document.querySelectorAll('.card .thumb').forEach(thumb => {
            if (!thumb.querySelector('video') && !thumb.querySelector('.video-demo-placeholder')) {
                const placeholder = document.createElement('div');
                placeholder.className = 'video-demo-placeholder';
                placeholder.style.cssText = `
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, #7b2ff2, #ff6b6b);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: bold;
                    text-align: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                `;
                
                const randomVideo = Object.keys(this.demoVideos)[Math.floor(Math.random() * Object.keys(this.demoVideos).length)];
                const content = this.fallbackContent[randomVideo];
                
                placeholder.innerHTML = `
                    <div style="font-size: 32px; margin-bottom: 12px;">🎬</div>
                    <div style="font-size: 16px; margin-bottom: 8px;">${content.title}</div>
                    <div style="font-size: 12px; opacity: 0.8;">Demo Portfolio</div>
                `;
                
                placeholder.addEventListener('click', () => {
                    this.showVideoModal(content.title, this.demoVideos[randomVideo]);
                });
                
                thumb.appendChild(placeholder);
            }
        });
    }

    showVideoModal(title, videoUrl) {
        // Create modal for video playback
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            backdrop-filter: blur(10px);
        `;
        
        modal.innerHTML = `
            <div style="max-width: 80%; max-height: 80%; position: relative;">
                <div style="color: white; text-align: center; margin-bottom: 20px; font-size: 24px; font-weight: bold;">
                    ${title}
                </div>
                <video controls autoplay style="width: 100%; border-radius: 10px;">
                    <source src="${videoUrl}" type="video/mp4">
                    Your browser does not support the video tag.
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

    setupErrorHandling() {
        document.querySelectorAll('video').forEach(video => {
            video.addEventListener('error', () => {
                console.log('Video failed to load, creating placeholder');
                this.createPlaceholderForVideo(video);
            });
        });
    }

    removeUploadNotices() {
        // Remove the upload button since this is a demo
        const uploadBtn = document.getElementById('video-upload-notice');
        if (uploadBtn) {
            uploadBtn.style.display = 'none';
        }
    }

    // Method to easily switch to real videos later
    updateToRealVideos(videoMapping) {
        this.demoVideos = { ...this.demoVideos, ...videoMapping };
        this.replaceVideoSources();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const demoManager = new DemoVideoManager();
    demoManager.init();
    
    // Make it globally accessible
    window.DemoVideoManager = demoManager;
    
    console.log('🎬 Demo Video Manager: Ready! Website now shows working content.');
});
