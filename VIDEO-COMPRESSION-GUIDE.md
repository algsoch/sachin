# 🎬 Video Compression Guide for GitHub Deployment

## 🚫 The Problem
GitHub has a 100MB file limit, and your video portfolio files are likely larger.

## ✅ Quick Solutions (No Quality Loss)

### Method 1: Online Video Compressors (Easiest)
1. **CloudConvert** (Recommended)
   - Go to: https://cloudconvert.com/mp4-to-mp4
   - Upload your video
   - Settings: Quality 75-80%, Format MP4, Codec H.264
   - Download compressed version

2. **Video Smaller**
   - Go to: https://www.videosmaller.com/
   - Upload video (max 500MB)
   - Choose compression level
   - Download compressed file

3. **Clideo**
   - Go to: https://clideo.com/compress-video
   - Upload and compress
   - Good quality retention

### Method 2: PowerShell Script (Run the script I created)
```powershell
# Run this in PowerShell
.\compress-videos-smart.ps1
```

### Method 3: FFmpeg Manual Commands
```bash
# Install FFmpeg first: choco install ffmpeg
# Then run for each video:
ffmpeg -i "input.mp4" -c:v libx264 -crf 28 -preset medium -c:a aac -b:a 128k -movflags +faststart "output.mp4"
```

## 🎯 Target File Sizes for GitHub
- **Instagram Reels**: Under 25MB
- **YouTube Shorts**: Under 50MB  
- **Longer videos**: Under 75MB

## 📱 Deployment After Compression

### Option A: Direct Netlify (Recommended)
1. Compress videos using any method above
2. Replace files in assets/ folder
3. Go to netlify.com
4. Drag entire project folder
5. Get instant live URL!

### Option B: GitHub + Netlify
1. Compress videos
2. Push to GitHub (files now under 100MB)
3. Connect Netlify to GitHub repo
4. Auto-deploy on every push

### Option C: External Video Hosting
1. Upload original videos to:
   - YouTube (unlisted)
   - Vimeo
   - Cloudinary
   - Azure Blob Storage
2. Embed video URLs in your site
3. Deploy static files only

## 🚀 Fastest Deployment Path
1. Use online compressor for 2-3 main videos
2. Deploy to Netlify directly
3. Live in 5 minutes!

## 💡 Pro Tips
- Keep one high-quality video for hero section
- Use compressed versions for portfolio grid
- Add loading states for better UX
- Consider lazy loading for mobile users
