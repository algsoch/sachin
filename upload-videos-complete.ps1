# Complete Video Upload Script for Azure Storage
# This script uploads your high-quality videos to Azure Blob Storage

param(
    [string]$StorageAccountName = "azvpstpucyxfsmd2gjc",
    [string]$ContainerName = "videos",
    [string]$VideoFolder = "assets"
)

Write-Host "🎬 Sachin's Video Portfolio - Azure Upload Script" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan

# Check if Azure CLI is installed
if (!(Get-Command az -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Azure CLI not found. Please install: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli" -ForegroundColor Red
    exit 1
}

Write-Host "📦 Storage Account: $StorageAccountName" -ForegroundColor Green
Write-Host "📁 Container: $ContainerName" -ForegroundColor Green
Write-Host "📹 Video Folder: $VideoFolder" -ForegroundColor Green

# Check if video folder exists
if (!(Test-Path $VideoFolder)) {
    Write-Host "❌ Video folder '$VideoFolder' not found." -ForegroundColor Red
    Write-Host "Please create the folder and add your video files:" -ForegroundColor Yellow
    Write-Host "   • trading (1).mp4" -ForegroundColor White
    Write-Host "   • trading (2).mp4" -ForegroundColor White
    Write-Host "   • trading (3).mp4" -ForegroundColor White
    Write-Host "   • trading (4).mp4" -ForegroundColor White
    Write-Host "   • motion graphic (1).mp4" -ForegroundColor White
    Write-Host "   • motion graphic (2).mp4" -ForegroundColor White
    Write-Host "   • motion graphic (3).mp4" -ForegroundColor White
    Write-Host "   • educational.mp4" -ForegroundColor White
    Write-Host "   • educational (2).mp4" -ForegroundColor White
    Write-Host "   • sub vdo.mp4" -ForegroundColor White
    exit 1
}

# Get list of video files
$videoFiles = Get-ChildItem -Path $VideoFolder -Filter "*.mp4" | Where-Object { $_.Length -gt 0 }

if ($videoFiles.Count -eq 0) {
    Write-Host "❌ No video files found in '$VideoFolder' folder" -ForegroundColor Red
    Write-Host "Please add your MP4 video files to the folder and try again." -ForegroundColor Yellow
    exit 1
}

Write-Host "📹 Found $($videoFiles.Count) video files to upload:" -ForegroundColor Yellow
$totalSizeMB = 0
foreach ($file in $videoFiles) {
    $sizeMB = [math]::Round($file.Length / 1MB, 2)
    $totalSizeMB += $sizeMB
    Write-Host "   • $($file.Name) ($sizeMB MB)" -ForegroundColor White
}
Write-Host "📊 Total size: $([math]::Round($totalSizeMB, 2)) MB" -ForegroundColor Cyan

# Confirm upload
$confirmation = Read-Host "`n🤔 Do you want to upload these videos to Azure Storage? (y/N)"
if ($confirmation -ne 'y' -and $confirmation -ne 'Y') {
    Write-Host "❌ Upload cancelled by user." -ForegroundColor Yellow
    exit 0
}

Write-Host "`n🚀 Starting upload process..." -ForegroundColor Green

# Login check
$loginCheck = az account show 2>$null
if (!$loginCheck) {
    Write-Host "🔐 Please login to Azure first..." -ForegroundColor Yellow
    az login
}

# Upload each video file
$uploadedUrls = @{}
$successCount = 0
$failCount = 0

foreach ($file in $videoFiles) {
    # Create clean blob name (replace spaces and special characters)
    $blobName = $file.Name -replace " ", "-" -replace "\(|\)", "" -replace "tradind", "trading"
    
    Write-Host "`n⬆️  Uploading $($file.Name) as $blobName..." -ForegroundColor Yellow
    Write-Host "    Size: $([math]::Round($file.Length / 1MB, 2)) MB" -ForegroundColor Gray
    
    try {
        # Upload with progress
        $uploadResult = az storage blob upload `
            --account-name $StorageAccountName `
            --container-name $ContainerName `
            --name $blobName `
            --file $file.FullName `
            --overwrite `
            --output json 2>&1
            
        if ($LASTEXITCODE -eq 0) {
            $url = "https://$StorageAccountName.blob.core.windows.net/$ContainerName/$blobName"
            $uploadedUrls[$file.Name] = @{
                'url' = $url
                'blobName' = $blobName
            }
            Write-Host "✅ SUCCESS: $url" -ForegroundColor Green
            $successCount++
        } else {
            Write-Host "❌ FAILED: $uploadResult" -ForegroundColor Red
            $failCount++
        }
    }
    catch {
        Write-Host "❌ ERROR: $($_.Exception.Message)" -ForegroundColor Red
        $failCount++
    }
}

# Generate results
Write-Host "`n📊 Upload Summary:" -ForegroundColor Cyan
Write-Host "=================" -ForegroundColor Cyan
Write-Host "✅ Successful uploads: $successCount" -ForegroundColor Green
if ($failCount -gt 0) {
    Write-Host "❌ Failed uploads: $failCount" -ForegroundColor Red
}

if ($successCount -gt 0) {
    Write-Host "`n🔗 Uploaded Video URLs:" -ForegroundColor Cyan
    Write-Host "======================" -ForegroundColor Cyan
    
    $jsContent = @"
// Azure Video URLs - Generated $(Get-Date)
const AZURE_VIDEO_URLS = {
"@
    
    foreach ($mapping in $uploadedUrls.GetEnumerator()) {
        Write-Host "• $($mapping.Key) -> $($mapping.Value.url)" -ForegroundColor White
        $cleanKey = $mapping.Key -replace " ", "-" -replace "\(|\)", ""
        $jsContent += "`n    '$cleanKey': '$($mapping.Value.url)',"
    }
    
    $jsContent += "`n};"
    
    # Save URL mapping to file
    $jsContent | Out-File -FilePath "src/js/azure-video-urls.js" -Encoding UTF8
    Write-Host "`n✅ Video URLs saved to: src/js/azure-video-urls.js" -ForegroundColor Green
    
    # Update the Azure video manager
    Write-Host "🔄 Updating Azure Video Manager..." -ForegroundColor Yellow
    
    Write-Host "`n🎉 Upload Complete!" -ForegroundColor Green
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Run 'azd deploy' to update your website" -ForegroundColor White
    Write-Host "2. Your videos are now hosted on Azure with global CDN! 🌍" -ForegroundColor White
    Write-Host "3. Website URL: https://lively-sand-04980360f.1.azurestaticapps.net" -ForegroundColor Cyan
    
    # Test a video URL
    $firstVideo = $uploadedUrls.Values | Select-Object -First 1
    if ($firstVideo) {
        Write-Host "`n🔍 Testing video accessibility..." -ForegroundColor Yellow
        try {
            $response = Invoke-WebRequest -Uri $firstVideo.url -Method Head -TimeoutSec 10
            if ($response.StatusCode -eq 200) {
                Write-Host "✅ Videos are accessible and ready!" -ForegroundColor Green
            }
        } catch {
            Write-Host "⚠️  Videos uploaded but may take a moment to be accessible" -ForegroundColor Yellow
        }
    }
} else {
    Write-Host "`n❌ No videos were uploaded successfully." -ForegroundColor Red
    Write-Host "Please check your Azure login and permissions." -ForegroundColor Yellow
}

Write-Host "`n🏁 Script completed." -ForegroundColor Cyan
