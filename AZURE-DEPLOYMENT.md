# Azure Deployment Guide - Full Quality Videos

## Why Azure for Video Portfolio?

✅ **Unlimited file sizes** for blob storage  
✅ **Global CDN** for fast video loading worldwide  
✅ **Free tier available** (100GB bandwidth/month)  
✅ **Professional hosting** with custom domains  
✅ **No file size limits** like GitHub  

## Deployment Steps

### 1. Azure Static Web Apps (for website)
- Free hosting for HTML/CSS/JS
- Custom domain support
- Automatic HTTPS
- Global CDN

### 2. Azure Blob Storage (for videos)
- Store full-quality videos (no size limits)
- CDN-enabled for fast global delivery
- Direct video streaming
- Cost-effective storage

### 3. Update Video URLs
Replace local paths with Azure Blob URLs:
```html
<!-- Before -->
<source src="assets/trading (1).mp4" type="video/mp4">

<!-- After -->
<source src="https://yourstorageaccount.blob.core.windows.net/videos/trading-1.mp4" type="video/mp4">
```

## Cost Estimate
- **Static Web App**: FREE (100GB/month)
- **Blob Storage**: ~$0.02/GB/month
- **CDN**: ~$0.09/GB for first 10TB
- **Total for 2GB videos**: ~$2-5/month

## Benefits
- ⚡ Lightning fast loading
- 🌍 Global CDN delivery  
- 📱 Mobile optimized
- 🔒 HTTPS by default
- 💰 Very affordable
- 📈 Scales automatically
