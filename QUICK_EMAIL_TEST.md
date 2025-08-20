## 🧪 **QUICK EMAIL TEST COMMANDS**

### ✅ **Method 1: Simple PowerShell Test**
```powershell
# Copy and paste this into PowerShell
$data = @{
    name = "Test User"
    email = "test@example.com"  
    message = "Testing email system"
    _to = "connectwithsachin06@gmail.com"
    _cc = "npdimagine@gmail.com"
}
Invoke-RestMethod -Uri "https://formspree.io/f/mzzvlvel" -Method Post -Body $data
```

### ✅ **Method 2: Discord Test**
```powershell
# Test Discord webhook
$discordData = '{"content": "🧪 Test from PowerShell - edited.frame contact form working!"}'
Invoke-RestMethod -Uri "https://discord.com/api/webhooks/1407102230620016660/PktP90bwhlLKelQ5wwScuke9qmYjuKoVLjxFAVcR0dBGheqdUyXmTXwBazVB70GVtffL" -Method Post -Body $discordData -ContentType "application/json"
```

### ✅ **Method 3: Check HTTP Status**
```powershell
# Get status code to verify if working
try {
    $response = Invoke-WebRequest -Uri "https://formspree.io/f/mzzvlvel" -Method Post -Body @{name="Status Test";email="test@example.com";message="Status check"}
    Write-Host "Status Code: $($response.StatusCode)"
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}
```

## 🔍 **What to Look For:**

### ✅ **Success Indicators:**
- **Formspree**: Returns HTTP 200 or redirects
- **Discord**: Returns HTTP 204 (No Content)
- **Emails**: Arrive within 1-2 minutes

### ❌ **Failure Indicators:**
- **400/422**: Bad request (missing fields)
- **429**: Rate limit exceeded
- **500**: Server error

## 📧 **Email Verification:**
After running tests, check:
1. **connectwithsachin06@gmail.com** (primary inbox)
2. **npdimagine@gmail.com** (CC inbox) 
3. **Discord channel** (immediate notification)

## 🚀 **Your System Status:**
- ✅ Formspree endpoint: `https://formspree.io/f/mzzvlvel`
- ✅ Discord webhook: Configured and tested
- ✅ Email recipients: Both addresses configured
- ✅ GitHub Pages ready: Client-side only

**Run the PowerShell commands above to test your email delivery!** 🎬
