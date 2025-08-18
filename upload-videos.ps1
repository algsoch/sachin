# Video Upload Script for Azure Storage
# This script uploads your high-quality videos to Azure Blob Storage

param(
    [string]$StorageAccountName = "",
    [string]$ContainerName = "videos"
)

Write-Host "🎬 Video Portfolio - Azure Upload Script" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan

# Check if Azure CLI is installed
if (!(Get-Command az -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Azure CLI not found. Please install: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli" -ForegroundColor Red
    exit 1
}

# Get storage account name from azd if not provided
if ([string]::IsNullOrEmpty($StorageAccountName)) {
    Write-Host "🔍 Getting storage account from azd..." -ForegroundColor Yellow
    $azdOutput = azd env get-values | ConvertFrom-Json
    $StorageAccountName = $azdOutput.AZURE_STORAGE_ACCOUNT_NAME
    
    if ([string]::IsNullOrEmpty($StorageAccountName)) {
        Write-Host "❌ Could not find storage account. Please run 'azd up' first." -ForegroundColor Red
        exit 1
    }
}

Write-Host "📦 Storage Account: $StorageAccountName" -ForegroundColor Green
Write-Host "📁 Container: $ContainerName" -ForegroundColor Green

# Get list of video files
$videoFiles = Get-ChildItem -Path "assets" -Filter "*.mp4" | Where-Object { $_.Length -gt 0 }

if ($videoFiles.Count -eq 0) {
    Write-Host "❌ No video files found in assets folder" -ForegroundColor Red
    exit 1
}

Write-Host "📹 Found $($videoFiles.Count) video files to upload:" -ForegroundColor Yellow
foreach ($file in $videoFiles) {
    $sizeMB = [math]::Round($file.Length / 1MB, 2)
    Write-Host "   • $($file.Name) ($sizeMB MB)" -ForegroundColor White
}

# Upload each video file
$uploadedUrls = @{}
foreach ($file in $videoFiles) {
    $blobName = $file.Name -replace " ", "-" -replace "\(|\)", ""
    Write-Host "⬆️  Uploading $($file.Name) as $blobName..." -ForegroundColor Yellow
    
    try {
        az storage blob upload `
            --account-name $StorageAccountName `
            --container-name $ContainerName `
            --name $blobName `
            --file $file.FullName `
            --overwrite
            
        $url = "https://$StorageAccountName.blob.core.windows.net/$ContainerName/$blobName"
        $uploadedUrls[$file.Name] = $url
        Write-Host "✅ Uploaded: $url" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Failed to upload $($file.Name): $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Generate URL mapping for updating HTML
Write-Host "`n📝 Video URL Mapping:" -ForegroundColor Cyan
Write-Host "=====================" -ForegroundColor Cyan

$urlMapping = @"
// Replace these URLs in your HTML/JS files:
const videoUrls = {
"@

foreach ($mapping in $uploadedUrls.GetEnumerator()) {
    $cleanName = $mapping.Key -replace "\s+", "-" -replace "\(|\)", ""
    $urlMapping += "`n  '$cleanName': '$($mapping.Value)',"
}

$urlMapping += "`n};"

Write-Host $urlMapping -ForegroundColor White

# Save URL mapping to file
$urlMapping | Out-File -FilePath "video-urls.js" -Encoding UTF8
Write-Host "`n✅ URL mapping saved to video-urls.js" -ForegroundColor Green

Write-Host "`n🎉 Upload Complete!" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Update your HTML files with the new URLs from video-urls.js" -ForegroundColor White
Write-Host "2. Deploy your updated website with 'azd deploy'" -ForegroundColor White
Write-Host "3. Your videos are now hosted on Azure with global CDN! 🌍" -ForegroundColor White
