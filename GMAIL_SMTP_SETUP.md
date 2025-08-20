# 📧 Gmail SMTP Setup Guide - edited.frame Contact Form

## 🎯 What This Does
Your contact form now sends emails **directly through Gmail SMTP** to both:
- **connectwithsachin06@gmail.com** (primary)
- **npdimagine@gmail.com** (CC)
- **Discord webhook** (instant notifications)

## ⚡ Quick Setup (5 minutes)

### Step 1: Enable Gmail App Passwords
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Click **Security** → **2-Step Verification** (enable if not already)
3. Go to **App passwords** → **Select app: Mail** → **Select device: Other**
4. Type: "edited.frame website"
5. **Copy the 16-character app password** (example: `abcd efgh ijkl mnop`)

### Step 2: Update Gmail Configuration
Edit `gmail-smtp.php` and replace these lines:

```php
// Gmail Configuration - YOU NEED TO UPDATE THESE
$gmail_address = 'YOUR_GMAIL_ADDRESS@gmail.com'; // Replace with your Gmail
$gmail_app_password = 'YOUR_APP_PASSWORD'; // Replace with your Gmail App Password
```

**With your actual credentials:**
```php
// Gmail Configuration
$gmail_address = 'connectwithsachin06@gmail.com'; // Your Gmail address
$gmail_app_password = 'abcd efgh ijkl mnop'; // Your 16-character app password
```

### Step 3: Test the System
1. Fill out your contact form
2. Check both email addresses for the automated email
3. Check Discord for instant notification
4. Form will show: "✅ Perfect! Emails sent to both addresses via Gmail SMTP"

## 🔧 Technical Details

### Email Flow
1. **Gmail SMTP** (Primary) → Direct Gmail delivery to both emails
2. **PHP Backend** (Fallback) → Server-based email sending
3. **Formspree** (Backup) → Third-party email service
4. **EmailJS** (Final) → Client-side email service

### Security Features
- ✅ App passwords (not your main Gmail password)
- ✅ SMTP encryption (TLS/SSL)
- ✅ Input validation and sanitization
- ✅ Error handling and fallbacks

### Files Created/Updated
- `gmail-smtp.php` - Gmail SMTP handler with beautiful HTML emails
- `js/main.js` - Updated contact form with Gmail priority
- Discord webhook updated with your actual URL

## 🚀 Deployment Options

### Option 1: Local Testing
```bash
# Start local PHP server
php -S localhost:8080
```

### Option 2: Web Hosting
Upload these files to any web hosting with PHP support:
- `index.html`
- `gmail-smtp.php`
- `js/main.js`
- `css/styles.css`
- `assets/` folder

## 🎬 What Happens When Someone Submits

1. **Beautiful HTML Email** sent to both addresses with:
   - Client name, email, budget, project details
   - Professional styling matching your brand
   - Direct reply-to client email

2. **Discord Rich Embed** with:
   - All form details
   - Timestamp
   - Confirmation of email delivery

3. **User Confirmation** on website:
   - Success message with timeline
   - Form automatically clears

## 🔍 Troubleshooting

### "Failed to send email"
- Check Gmail app password is correct
- Ensure 2-step verification is enabled
- Verify Gmail address in `gmail-smtp.php`

### Gmail SMTP vs Other Methods
- **Gmail SMTP**: Direct, reliable, no external dependencies
- **Formspree**: Easy but requires account
- **EmailJS**: Client-side but less reliable
- **PHP mail()**: Server-dependent

## 📱 Contact Methods Available
- **Primary**: Gmail SMTP automation (both emails)
- **Discord**: Instant webhook notifications  
- **Backup**: Multiple fallback email methods
- **Direct**: mailto links still available

## ✅ Success Checklist
- [ ] Gmail app password generated
- [ ] `gmail-smtp.php` updated with credentials
- [ ] Discord webhook URL updated (✅ Done)
- [ ] Contact form tested
- [ ] Both emails receiving messages
- [ ] Discord notifications working

Your contact form is now a **professional automated email system** that delivers to both addresses without any manual intervention! 🎉
