# Video Portfolio - Deployment Guide

## Problem
GitHub has file size limits:
- **Recommended max**: 50MB per file
- **Hard limit**: 100MB per file
- Your videos: 63MB - 147MB (too large)

## Solutions

### Option 1: Compress Videos Locally ⭐ RECOMMENDED
1. Install FFmpeg: https://ffmpeg.org/download.html
2. Run `compress-videos.bat` script
3. Update video paths to use compressed versions
4. Push to GitHub normally

### Option 2: Use External Video Hosting
Host videos on:
- **Cloudinary** (free tier: 25GB)
- **Vimeo** (free: 5GB/week)
- **YouTube** (unlimited, but with player)
- **Google Drive** (15GB free)

### Option 3: GitHub Releases
Upload large files as release assets:
1. Create GitHub release
2. Attach video files
3. Use direct download URLs in website

### Option 4: Two-Repository Setup
- **Code repository**: HTML, CSS, JS (small files)
- **Asset repository**: Large video files
- Use GitHub Pages for the code repository

## Quick Fix for Now

I'll create a version that works with smaller placeholder videos and can be updated later:

1. Remove large videos from git
2. Add placeholder/compressed videos
3. Deploy to GitHub Pages
4. Update with full videos via external hosting

## Implementation

Run the following commands:

```bash
# Remove large videos
git rm assets/*.mp4
git commit -m "Remove large video files"

# Add compressed videos (after compression)
git add assets/compressed/*.mp4
git commit -m "Add compressed videos for GitHub"

# Push successfully
git push origin main
```
