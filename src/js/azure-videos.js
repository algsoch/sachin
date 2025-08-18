// Azure Video Configuration
// This file will be updated automatically when you run upload-videos.ps1

class AzureVideoManager {
    constructor() {
        // Azure Storage URLs will be populated here after running upload-videos.ps1
        this.videoUrls = {
            // Example structure - will be replaced with actual URLs:
            'trading-1': 'https://azvpstpucyxfsmd2gjc.blob.core.windows.net/videos/trading-1.mp4',
            'trading-2': 'https://azvpstpucyxfsmd2gjc.blob.core.windows.net/videos/trading-2.mp4',
            'trading-3': 'https://azvpstpucyxfsmd2gjc.blob.core.windows.net/videos/trading-3.mp4',
            'trading-4': 'https://azvpstpucyxfsmd2gjc.blob.core.windows.net/videos/trading-4.mp4',
            'trading-5': 'https://azvpstpucyxfsmd2gjc.blob.core.windows.net/videos/tradind-5.mp4',
            'educational': 'https://azvpstpucyxfsmd2gjc.blob.core.windows.net/videos/educational.mp4',
            'educational-2': 'https://azvpstpucyxfsmd2gjc.blob.core.windows.net/videos/educational-2.mp4',
            'motion-graphic-1': 'https://azvpstpucyxfsmd2gjc.blob.core.windows.net/videos/motion-graphic-1.mp4',
            'motion-graphic-2': 'https://azvpstpucyxfsmd2gjc.blob.core.windows.net/videos/motion-graphic-2.mp4',
            'motion-graphic-3': 'https://azvpstpucyxfsmd2gjc.blob.core.windows.net/videos/motion-graphic-3.mp4',
            'sub-vdo': 'https://azvpstpucyxfsmd2gjc.blob.core.windows.net/videos/sub-vdo.mp4'
        };

        this.placeholderUrl = 'data:video/mp4;base64,'; // Placeholder for missing videos
        this.init();
    }

    init() {
        this.updateVideoSources();
        this.setupVideoErrorHandling();
    }

    updateVideoSources() {
        // Update all video sources in the page
        const videos = document.querySelectorAll('video source');
        videos.forEach(source => {
            const originalSrc = source.getAttribute('src');
            if (originalSrc && originalSrc.includes('assets/')) {
                const filename = this.extractFilename(originalSrc);
                const azureUrl = this.getAzureUrl(filename);
                if (azureUrl) {
                    source.setAttribute('src', azureUrl);
                    console.log(`Updated video source: ${filename} -> Azure Storage`);
                }
            }
        });
    }

    extractFilename(path) {
        const filename = path.split('/').pop().replace('.mp4', '');
        return filename.replace(/\s+/g, '-').replace(/\(|\)/g, '').toLowerCase();
    }

    getAzureUrl(filename) {
        // Try to find matching URL in our mapping
        for (const [key, url] of Object.entries(this.videoUrls)) {
            if (key.includes(filename) || filename.includes(key)) {
                return url;
            }
        }
        return null;
    }

    setupVideoErrorHandling() {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            video.addEventListener('error', (e) => {
                console.warn('Video failed to load:', e.target.src);
                this.showVideoPlaceholder(video);
            });
        });
    }

    showVideoPlaceholder(videoElement) {
        const placeholder = document.createElement('div');
        placeholder.className = 'video-placeholder';
        placeholder.innerHTML = `
            <div style="
                width: 100%; 
                height: 200px; 
                background: linear-gradient(135deg, #7b2ff2, #ff6b6b);
                border-radius: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                text-align: center;
                margin: 10px 0;
            ">
                🎬 Video Loading from Azure...<br>
                <small style="opacity: 0.8;">High-quality video will appear here</small>
            </div>
        `;
        
        videoElement.parentNode.replaceChild(placeholder, videoElement);
    }

    // Method to update URLs after upload
    updateVideoMapping(newUrls) {
        this.videoUrls = { ...this.videoUrls, ...newUrls };
        this.updateVideoSources();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.azureVideoManager = new AzureVideoManager();
});

// Global function for updating video URLs
window.updateVideoUrls = function(newUrls) {
    if (window.azureVideoManager) {
        window.azureVideoManager.updateVideoMapping(newUrls);
    }
};
