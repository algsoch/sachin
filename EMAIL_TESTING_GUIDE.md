# 🧪 Email Testing Guide - edited.frame Contact Form

## 📧 How to Test Email Delivery with curl

### 🎯 **Test 1: Formspree Endpoint (Primary Method)**

```bash
# Test your Formspree endpoint
curl -X POST https://formspree.io/f/mzzvlvel \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "name=Test User" \
  -d "email=test@example.com" \
  -d "budget=500-1000" \
  -d "message=This is a test message from curl to verify email delivery" \
  -d "_replyto=test@example.com" \
  -d "_subject=🧪 Test Message - edited.frame" \
  -d "_cc=npdimagine@gmail.com" \
  -d "_to=connectwithsachin06@gmail.com"
```

**Expected Response:**
- Status: `200 OK` = Email sent successfully
- Status: `400/422` = Invalid form data
- Status: `429` = Rate limit exceeded

### 🎯 **Test 2: Discord Webhook (Instant Notification)**

```bash
# Test your Discord webhook
curl -X POST https://discord.com/api/webhooks/1407102230620016660/PktP90bwhlLKelQ5wwScuke9qmYjuKoVLjxFAVcR0dBGheqdUyXmTXwBazVB70GVtffL \
  -H "Content-Type: application/json" \
  -d '{
    "content": "🧪 **Test Message from curl**",
    "embeds": [
      {
        "title": "🎬 Test Project Inquiry - edited.frame",
        "color": 8067042,
        "fields": [
          {"name": "👤 Client Name", "value": "Test User", "inline": true},
          {"name": "📧 Client Email", "value": "test@example.com", "inline": true},
          {"name": "💰 Budget", "value": "$500-1000", "inline": true},
          {"name": "📝 Project Details", "value": "This is a test message to verify Discord webhook is working"}
        ],
        "footer": {"text": "📧 curl test - checking email delivery system"},
        "timestamp": "'$(date -u +%Y-%m-%dT%H:%M:%S.000Z)'"
      }
    ]
  }'
```

**Expected Response:**
- Status: `204 No Content` = Message sent successfully
- Status: `400` = Invalid webhook data
- Status: `404` = Webhook not found

### 🎯 **Test 3: PowerShell Testing (Windows)**

```powershell
# Test Formspree with PowerShell
$formData = @{
    name = "Test User"
    email = "test@example.com"
    budget = "500-1000"
    message = "PowerShell test message"
    _replyto = "test@example.com"
    _subject = "🧪 PowerShell Test - edited.frame"
    _cc = "npdimagine@gmail.com"
    _to = "connectwithsachin06@gmail.com"
}

Invoke-RestMethod -Uri "https://formspree.io/f/mzzvlvel" -Method Post -Body $formData

# Test Discord webhook with PowerShell
$discordData = @{
    content = "🧪 **PowerShell Test Message**"
    embeds = @(
        @{
            title = "🎬 PowerShell Test - edited.frame"
            color = 8067042
            fields = @(
                @{name = "👤 Client Name"; value = "Test User"; inline = $true},
                @{name = "📧 Client Email"; value = "test@example.com"; inline = $true},
                @{name = "💰 Budget"; value = "500-1000"; inline = $true}
            )
            footer = @{text = "📧 PowerShell test - checking system"}
            timestamp = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss.fffZ")
        }
    )
} | ConvertTo-Json -Depth 10

Invoke-RestMethod -Uri "https://discord.com/api/webhooks/1407102230620016660/PktP90bwhlLKelQ5wwScuke9qmYjuKoVLjxFAVcR0dBGheqdUyXmTXwBazVB70GVtffL" -Method Post -Body $discordData -ContentType "application/json"
```

## 🔍 **How to Check Response Status**

### ✅ **Successful Responses**
```bash
# Check HTTP status with curl
curl -w "HTTP Status: %{http_code}\n" -X POST https://formspree.io/f/mzzvlvel \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "name=Status Test" \
  -d "email=test@example.com" \
  -d "message=Testing HTTP status codes"
```

### 📊 **Response Codes Meaning**
- **200**: ✅ Email sent successfully
- **400**: ❌ Bad request (invalid form data)
- **422**: ❌ Unprocessable entity (missing required fields)
- **429**: ⚠️ Rate limit exceeded (try again later)
- **500**: ❌ Server error (service down)

## 🧪 **Advanced Testing Methods**

### 🎯 **Test with Verbose Output**
```bash
# Get detailed response information
curl -v -X POST https://formspree.io/f/mzzvlvel \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "name=Verbose Test" \
  -d "email=test@example.com" \
  -d "message=Testing with verbose output to see all headers and response details"
```

### 🎯 **Test JSON Format (Alternative)**
```bash
# Test with JSON payload
curl -X POST https://formspree.io/f/mzzvlvel \
  -H "Content-Type: application/json" \
  -d '{
    "name": "JSON Test User",
    "email": "test@example.com",
    "budget": "$500-1000",
    "message": "Testing JSON format submission",
    "_replyto": "test@example.com",
    "_subject": "🧪 JSON Test - edited.frame",
    "_cc": "npdimagine@gmail.com"
  }'
```

## 📧 **Email Verification Checklist**

### ✅ **After Running Tests, Check:**
1. **Primary Email** (connectwithsachin06@gmail.com):
   - Check inbox for test messages
   - Look in spam/junk folder
   - Verify subject line formatting

2. **Secondary Email** (npdimagine@gmail.com):
   - Check inbox for CC messages
   - Verify both emails received same content
   - Check timestamps match

3. **Discord Channel**:
   - Look for rich embed messages
   - Verify all fields are populated
   - Check timestamps are correct

4. **Formspree Dashboard**:
   - Login to formspree.io
   - Check submission logs
   - Verify quota usage

## 🛠️ **Troubleshooting Common Issues**

### ❌ **If curl returns 400/422:**
```bash
# Check required fields are present
curl -v -X POST https://formspree.io/f/mzzvlvel \
  -d "name=Required Test" \
  -d "email=valid@email.com" \
  -d "message=All required fields included"
```

### ❌ **If Discord returns 404:**
```bash
# Verify webhook URL is correct
curl -I https://discord.com/api/webhooks/1407102230620016660/PktP90bwhlLKelQ5wwScuke9qmYjuKoVLjxFAVcR0dBGheqdUyXmTXwBazVB70GVtffL
```

### ❌ **If no emails received:**
1. Check Formspree account status
2. Verify email addresses are correct
3. Check spam folders on both accounts
4. Test with different email addresses

## 🚀 **Quick Test Script**

Create a file `test-emails.sh`:
```bash
#!/bin/bash
echo "🧪 Testing edited.frame contact form..."

echo "📧 Testing Formspree..."
FORMSPREE_RESPONSE=$(curl -s -w "%{http_code}" -X POST https://formspree.io/f/mzzvlvel \
  -d "name=Curl Test" \
  -d "email=test@example.com" \
  -d "message=Automated test message")

echo "Formspree Status: $FORMSPREE_RESPONSE"

echo "📱 Testing Discord..."
DISCORD_RESPONSE=$(curl -s -w "%{http_code}" -X POST https://discord.com/api/webhooks/1407102230620016660/PktP90bwhlLKelQ5wwScuke9qmYjuKoVLjxFAVcR0dBGheqdUyXmTXwBazVB70GVtffL \
  -H "Content-Type: application/json" \
  -d '{"content": "🧪 Automated test from script"}')

echo "Discord Status: $DISCORD_RESPONSE"
echo "✅ Test complete! Check your emails and Discord channel."
```

Run with: `bash test-emails.sh`

## 📊 **Expected Results**
- **Formspree**: HTTP 200, emails in both inboxes within 1-2 minutes
- **Discord**: HTTP 204, immediate notification in Discord channel
- **Response Time**: Formspree 1-5 seconds, Discord <1 second

Your email system is working if you see **200/204 status codes** and receive messages in both email accounts! 🎉
