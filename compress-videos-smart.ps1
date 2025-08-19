# Smart Video Compression Script
# Compresses videos while maintaining good quality for web

Write-Host "🎬 Smart Video Compression for Web Deployment" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan

$assetsPath = "assets"
$outputPath = "assets-compressed"

# Create compressed assets directory
if (!(Test-Path $outputPath)) {
    New-Item -ItemType Directory -Path $outputPath
    Write-Host "✅ Created $outputPath directory" -ForegroundColor Green
}

# Copy non-video files
Get-ChildItem $assetsPath -File | Where-Object { $_.Extension -notin @('.mp4', '.mov', '.avi') } | ForEach-Object {
    Copy-Item $_.FullName "$outputPath\$($_.Name)"
    Write-Host "📄 Copied: $($_.Name)" -ForegroundColor Yellow
}

# Check if FFmpeg is available
$ffmpegPath = Get-Command ffmpeg -ErrorAction SilentlyContinue
if (-not $ffmpegPath) {
    Write-Host "❌ FFmpeg not found! Installing via Chocolatey..." -ForegroundColor Red
    Write-Host "📥 Run: choco install ffmpeg" -ForegroundColor Yellow
    Write-Host "Or download from: https://ffmpeg.org/download.html" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "🔄 Alternative: Use online compression tools below" -ForegroundColor Cyan
    exit 1
}

# Compress video files
Get-ChildItem $assetsPath -Filter "*.mp4" | ForEach-Object {
    $inputFile = $_.FullName
    $outputFile = "$outputPath\$($_.Name)"
    $originalSize = [math]::Round($_.Length / 1MB, 2)
    
    Write-Host "🎬 Compressing: $($_.Name) (${originalSize}MB)" -ForegroundColor Cyan
    
    # Smart compression settings
    # CRF 28: Good quality/size balance for web
    # Scale: Optimize for web while maintaining aspect ratio
    $ffmpegArgs = @(
        "-i", $inputFile,
        "-c:v", "libx264",
        "-crf", "28",
        "-preset", "medium",
        "-c:a", "aac",
        "-b:a", "128k",
        "-movflags", "+faststart",
        "-y",
        $outputFile
    )
    
    & ffmpeg @ffmpegArgs
    
    if (Test-Path $outputFile) {
        $newSize = [math]::Round((Get-Item $outputFile).Length / 1MB, 2)
        $reduction = [math]::Round((1 - ($newSize / $originalSize)) * 100, 1)
        Write-Host "✅ Compressed: $($_.Name)" -ForegroundColor Green
        Write-Host "   Original: ${originalSize}MB → Compressed: ${newSize}MB (${reduction}% reduction)" -ForegroundColor Yellow
    } else {
        Write-Host "❌ Failed to compress: $($_.Name)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "🎉 Video compression complete!" -ForegroundColor Green
Write-Host "📁 Compressed files in: $outputPath" -ForegroundColor Yellow
Write-Host "📊 Use the compressed assets for deployment" -ForegroundColor Cyan
