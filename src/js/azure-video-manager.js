// Azure Video URL Configuration
const AZURE_STORAGE_BASE_URL = 'https://azvpstpucyxfsmd2gjc.blob.core.windows.net/videos';

// Video URL mapping with Azure Storage URLs
const videoUrlMap = {
    'assets/motion graphic (1).mp4': `${AZURE_STORAGE_BASE_URL}/motion-graphic-1.mp4`,
    'assets/motion graphic (2).mp4': `${AZURE_STORAGE_BASE_URL}/motion-graphic-2.mp4`,
    'assets/motion graphic (3).mp4': `${AZURE_STORAGE_BASE_URL}/motion-graphic-3.mp4`,
    'assets/trading (1).mp4': `${AZURE_STORAGE_BASE_URL}/trading-1.mp4`,
    'assets/trading (2).mp4': `${AZURE_STORAGE_BASE_URL}/trading-2.mp4`,
    'assets/trading (3).mp4': `${AZURE_STORAGE_BASE_URL}/trading-3.mp4`,
    'assets/trading (4).mp4': `${AZURE_STORAGE_BASE_URL}/trading-4.mp4`,
    'assets/tradind 5.mp4': `${AZURE_STORAGE_BASE_URL}/trading-5.mp4`,
    'assets/educational.mp4': `${AZURE_STORAGE_BASE_URL}/educational.mp4`,
    'assets/educational (2).mp4': `${AZURE_STORAGE_BASE_URL}/educational-2.mp4`,
    'assets/sub vdo.mp4': `${AZURE_STORAGE_BASE_URL}/sub-video.mp4`
};

// Function to update video sources on page load
function updateVideoSources() {
    // Update all video elements
    document.querySelectorAll('video source').forEach(source => {
        const currentSrc = source.getAttribute('src');
        if (videoUrlMap[currentSrc]) {
            source.setAttribute('src', videoUrlMap[currentSrc]);
            console.log(`Updated video source: ${currentSrc} -> ${videoUrlMap[currentSrc]}`);
        }
    });
    
    // Update any video elements without source tags
    document.querySelectorAll('video[src]').forEach(video => {
        const currentSrc = video.getAttribute('src');
        if (videoUrlMap[currentSrc]) {
            video.setAttribute('src', videoUrlMap[currentSrc]);
            console.log(`Updated video src: ${currentSrc} -> ${videoUrlMap[currentSrc]}`);
        }
    });
    
    // Reload videos to apply new sources
    document.querySelectorAll('video').forEach(video => {
        video.load();
    });
}

// Function to create video placeholder if video fails to load
function createVideoPlaceholder(videoElement) {
    const placeholder = document.createElement('div');
    placeholder.className = 'video-placeholder';
    placeholder.style.cssText = `
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #7b2ff2, #ff6b6b);
        border-radius: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        text-align: center;
        position: relative;
    `;
    
    placeholder.innerHTML = `
        <div style="font-size: 48px; margin-bottom: 16px;">🎬</div>
        <div style="font-size: 18px; margin-bottom: 8px;">Video Loading...</div>
        <div style="font-size: 14px; opacity: 0.8;">Upload your videos to Azure Storage</div>
        <div style="position: absolute; bottom: 16px; font-size: 12px; opacity: 0.6;">
            Click "Upload Videos" button to add your content
        </div>
    `;
    
    videoElement.parentNode.replaceChild(placeholder, videoElement);
}

// Set up error handling for videos
function setupVideoErrorHandling() {
    document.querySelectorAll('video').forEach(video => {
        video.addEventListener('error', function() {
            console.log('Video failed to load:', this.src || this.querySelector('source')?.src);
            createVideoPlaceholder(this);
        });
        
        // Also handle source errors
        video.querySelectorAll('source').forEach(source => {
            source.addEventListener('error', function() {
                console.log('Video source failed to load:', this.src);
            });
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎬 Azure Video Manager: Updating video sources...');
    updateVideoSources();
    setupVideoErrorHandling();
    
    // Create upload button for easy video management
    createUploadButton();
});

// Create upload instruction button
function createUploadButton() {
    const uploadBtn = document.createElement('div');
    uploadBtn.id = 'video-upload-notice';
    uploadBtn.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #7b2ff2, #ff6b6b);
        color: white;
        padding: 12px 20px;
        border-radius: 25px;
        font-weight: bold;
        font-size: 14px;
        box-shadow: 0 4px 15px rgba(123, 47, 242, 0.3);
        cursor: pointer;
        z-index: 10000;
        transition: all 0.3s ease;
        border: 2px solid rgba(255, 255, 255, 0.2);
    `;
    
    uploadBtn.innerHTML = '📹 Upload Videos to Azure';
    
    uploadBtn.addEventListener('click', function() {
        alert(`To upload your videos to Azure Storage:

1. Copy your video files to the project folder
2. Run this command in PowerShell:
   .\\upload-videos.ps1

3. Your videos will be automatically uploaded to:
   ${AZURE_STORAGE_BASE_URL}

4. Redeploy with: azd deploy

The website will then load your high-quality videos!`);
    });
    
    uploadBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.boxShadow = '0 6px 20px rgba(123, 47, 242, 0.4)';
    });
    
    uploadBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 15px rgba(123, 47, 242, 0.3)';
    });
    
    document.body.appendChild(uploadBtn);
}

// Export for global access
window.AzureVideoManager = {
    updateVideoSources,
    setupVideoErrorHandling,
    videoUrlMap,
    AZURE_STORAGE_BASE_URL
};
