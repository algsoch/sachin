# Contact Form Setup Guide - edited.frame

Your contact form now has multiple backup methods to ensure messages reach you. Here's how to set up each option:

## 🚀 Quick Setup (Choose Your Preferred Method)

### Option 1: Formspree (Recommended - Easy & Reliable)

1. **Go to [formspree.io](https://formspree.io)**
2. **Sign up for free account**
3. **Create a new form** with endpoint: `npdimagine@gmail.com`
4. **Copy your form ID** (looks like: `xpzgkqyw`)
5. **Update JavaScript**: Replace `your_form_id_here` with your actual form ID

```javascript
// In js/main.js, find this line:
const response = await fetch('https://formspree.io/f/your_form_id_here', {
// Replace with:
const response = await fetch('https://formspree.io/f/xpzgkqyw', {
```

### Option 2: Discord Webhook (Secondary)

1. **Go to your Discord server**
2. **Server Settings → Integrations → Webhooks**
3. **Create New Webhook**
4. **Copy webhook URL**
5. **Update JavaScript**: Replace `YOUR_DISCORD_WEBHOOK_URL_HERE` with your webhook URL

```javascript
// In js/main.js, find this line:
const webhookURL = 'YOUR_DISCORD_WEBHOOK_URL_HERE';
// Replace with your actual webhook URL
```

### Option 3: PHP Backend (If you have web hosting)

1. **Upload `contact.php` to your web server**
2. **Update Discord webhook in PHP file** (optional)
3. **Test the form** - it should send emails to `npdimagine@gmail.com`

### Option 4: EmailJS (Alternative Email Service)

1. **Go to [emailjs.com](https://emailjs.com)**
2. **Create account and email service**
3. **Create email template**
4. **Get Service ID and Template ID**
5. **Add EmailJS SDK to your HTML**

## 📧 Current Fallback Chain

Your form will try these methods in order:

1. **PHP Backend** (if available) → Sends email directly + Discord
2. **Formspree** → Reliable email service + Discord backup  
3. **EmailJS** → Alternative email service
4. **Mailto** → Opens user's email client as last resort

## 🎯 Immediate Action Required

**To get emails working right now:**

1. **Set up Formspree** (5 minutes, free)
   - Visit formspree.io
   - Create form for `npdimagine@gmail.com`
   - Replace `your_form_id_here` in the JavaScript

2. **Create new Discord webhook** (2 minutes)
   - Your current webhook is invalid (404 error)
   - Create new one and replace `YOUR_DISCORD_WEBHOOK_URL_HERE`

## ✅ Test Instructions

After setup:
1. Fill out the contact form on your website
2. Check your email (`npdimagine@gmail.com`)
3. Check your Discord channel
4. Verify the success message appears

## 🛠️ Files Modified

- `js/main.js` - Enhanced contact form with multiple fallback methods
- `index.html` - Added proper form attributes  
- `contact.php` - PHP backend for direct email sending
- `CONTACT_SETUP.md` - This setup guide

## 📞 Support

If you need help with setup:
- Test the current fallback (mailto) - it should open your email client
- The form will show clear error messages if methods fail
- All methods are designed to be independent backups
