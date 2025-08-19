# Azure Video Portfolio Deployment

## Prerequisites
1. Install Azure CLI: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli
2. Install Azure Developer CLI (azd): https://learn.microsoft.com/en-us/azure/developer/azure-developer-cli/install-azd

## Deployment Steps

### 1. Login to Azure
```bash
az login
azd auth login
```

### 2. Initialize and Deploy
```bash
# Initialize the project
azd init

# Deploy infrastructure and app
azd up
```

### 3. Upload Videos to Azure Storage
After deployment, use the upload script:
```bash
# Run the video upload script
.\upload-videos.ps1
```

### 4. Update Video URLs
The script will automatically update your HTML files with Azure Blob Storage URLs.

## What Gets Created
- ✅ **Azure Static Web App**: Hosts your website (FREE tier)
- ✅ **Azure Storage Account**: Stores your high-quality videos
- ✅ **CDN-enabled**: Fast global delivery
- ✅ **Application Insights**: Monitor performance
- ✅ **Key Vault**: Secure configuration

## Benefits
- 🚀 **No file size limits** for video storage
- ⚡ **Global CDN** for fast video loading
- 💰 **Free hosting** for static content
- 🔒 **Enterprise security**
- 📈 **Auto-scaling**

## Cost Estimate
- Static Web App: **FREE**
- Storage (2GB videos): **~$0.05/month**
- Bandwidth (100GB): **~$5/month**
- **Total: ~$5/month for professional hosting**

## Next Steps
1. Run `azd up` to deploy
2. Upload videos with the script
3. Your portfolio will be live with full-quality videos!
