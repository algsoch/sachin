# Test Formspree endpoint
$formData = @{
    name = "Test User"
    email = "test@example.com"
    budget = "500-1000"
    message = "Testing email delivery from PowerShell"
    _replyto = "test@example.com"
    _subject = "🧪 Test Message - edited.frame"
    _cc = "npdimagine@gmail.com"
    _to = "connectwithsachin06@gmail.com"
}

Write-Host "🧪 Testing Formspree email delivery..." -ForegroundColor Cyan

try {
    $response = Invoke-RestMethod -Uri "https://formspree.io/f/mzzvlvel" -Method Post -Body $formData
    Write-Host "✅ SUCCESS: Email sent via Formspree!" -ForegroundColor Green
    Write-Host "Check both email addresses for the test message." -ForegroundColor Yellow
} catch {
    Write-Host "❌ ERROR: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Status Code: $($_.Exception.Response.StatusCode)" -ForegroundColor Red
}

Write-Host "`n🔍 Now testing Discord webhook..." -ForegroundColor Cyan

# Test Discord webhook
$discordData = @{
    content = "🧪 **PowerShell Test Message - edited.frame**"
    embeds = @(
        @{
            title = "🎬 Test Project Inquiry - edited.frame"
            color = 8067042
            fields = @(
                @{name = "👤 Client Name"; value = "Test User"; inline = $true},
                @{name = "📧 Client Email"; value = "test@example.com"; inline = $true},
                @{name = "💰 Budget"; value = "500-1000"; inline = $true},
                @{name = "📝 Project Details"; value = "This is a test message to verify the contact form system is working properly"}
            )
            footer = @{text = "📧 PowerShell test - verifying email delivery system"}
            timestamp = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss.fffZ")
        }
    )
} | ConvertTo-Json -Depth 10

try {
    $discordResponse = Invoke-RestMethod -Uri "https://discord.com/api/webhooks/1407102230620016660/PktP90bwhlLKelQ5wwScuke9qmYjuKoVLjxFAVcR0dBGheqdUyXmTXwBazVB70GVtffL" -Method Post -Body $discordData -ContentType "application/json"
    Write-Host "✅ SUCCESS: Discord notification sent!" -ForegroundColor Green
    Write-Host "Check your Discord channel for the test message." -ForegroundColor Yellow
} catch {
    Write-Host "❌ Discord ERROR: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n🎯 Test Summary:" -ForegroundColor Magenta
Write-Host "- If successful, check both email addresses for messages" -ForegroundColor White
Write-Host "- Check Discord channel for notification" -ForegroundColor White  
Write-Host "- Both should arrive within 1-2 minutes" -ForegroundColor White
Write-Host "`n📧 Expected emails at:" -ForegroundColor Magenta
Write-Host "  • connectwithsachin06@gmail.com (primary)" -ForegroundColor White
Write-Host "  • npdimagine@gmail.com (CC)" -ForegroundColor White
