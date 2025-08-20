# 🚀 AUTOMATED CONTACT FORM SETUP - edited.frame

## What You'll Get:
✅ **Automatic emails to BOTH addresses**:
- `connectwithsachin06@gmail.com` (your client email)
- `npdimagine@gmail.com` (your personal email)

✅ **Discord notifications** with project details
✅ **No email app opening** - fully automated
✅ **Professional form experience** for clients

---

## 🎯 STEP 1: Setup Formspree (5 minutes - FREE)

### 1.1 Create Formspree Account
1. Go to **[formspree.io](https://formspree.io)**
2. Click **"Get Started Free"**
3. Sign up with your email (use `npdimagine@gmail.com`)

### 1.2 Create New Form
1. Click **"+ New Form"**
2. **Form Name**: `edited.frame Contact Form`
3. **Email**: `connectwithsachin06@gmail.com` (this will be the primary recipient)
4. Click **"Create Form"**

### 1.3 Configure Form Settings
1. **Go to Settings** for your new form
2. **Add CC Email**: In the "Email Settings" section, add `npdimagine@gmail.com` as CC
3. **Form ID**: Copy your form ID (looks like `xpzgkqyw` or similar)

### 1.4 Update Your JavaScript
Replace the form ID in your code:

```javascript
// In js/main.js, line ~360, find:
const response = await fetch('https://formspree.io/f/xqazynvp', {

// Replace 'xqazynvp' with YOUR actual form ID:
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID_HERE', {
```

---

## 🎯 STEP 2: Setup Discord Webhook (3 minutes)

### 2.1 Create Discord Webhook
1. **Go to your Discord server**
2. **Right-click on the channel** where you want notifications
3. **Edit Channel → Integrations → Webhooks**
4. **Create Webhook**
5. **Name it**: `edited.frame Inquiries`
6. **Copy the Webhook URL**

### 2.2 Update JavaScript with Your Webhook
```javascript
// In js/main.js, find this line:
const webhookURL = 'https://discord.com/api/webhooks/1317089543234560000/abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';

// Replace with YOUR webhook URL
```

---

## 🎯 STEP 3: Test Everything

### 3.1 Test the Form
1. **Fill out your contact form** on the website
2. **Check results**:
   - ✅ Email should arrive at `connectwithsachin06@gmail.com`
   - ✅ Email should arrive at `npdimagine@gmail.com`
   - ✅ Discord notification should appear
   - ✅ Success message on website

### 3.2 Expected Email Content
**Subject**: 🎬 New Project Inquiry from [Name] - edited.frame
**To**: connectwithsachin06@gmail.com
**CC**: npdimagine@gmail.com
**Content**: All form details nicely formatted

---

## 🎯 ALTERNATIVE: Quick EmailJS Setup (If Formspree doesn't work)

### Option B: EmailJS (Also Free)
1. **Go to [emailjs.com](https://emailjs.com)**
2. **Create account**
3. **Create email service** (Gmail)
4. **Create email template**
5. **Get Service ID and Template ID**
6. **Add to your HTML**:

```html
<!-- Add before closing </body> tag -->
<script src="https://cdn.emailjs.com/npm/emailjs-com@3/dist/email.min.js"></script>
<script>
  emailjs.init("YOUR_PUBLIC_KEY");
</script>
```

---

## 📧 CURRENT STATUS

Your form is **ready to work** with these setups:

1. **Primary Method**: Formspree → Sends to both emails + Discord
2. **Backup Method**: PHP backend (if you have web hosting)
3. **Alternative**: EmailJS
4. **Final Fallback**: Clear error message (no email app opening)

---

## 🆘 IMMEDIATE TESTING

**To test right now** (before full setup):
1. Fill out your contact form
2. If not configured yet, you'll see: *"Failed to send message. Please contact directly at connectwithsachin06@gmail.com"*
3. After Formspree setup, you'll get automatic emails to both addresses

---

## 📞 NEED HELP?

**If you get stuck:**
1. **Formspree issues**: Check your form ID is correct
2. **Discord issues**: Verify webhook URL is complete
3. **Email issues**: Check spam folders in both Gmail accounts
4. **Form shows errors**: Open browser developer tools (F12) to see detailed error messages

**Your website will work perfectly** once you complete the Formspree setup (5 minutes)!
