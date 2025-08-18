# edited.frame - Video Editor Portfolio

A modern, responsive video portfolio website for professional video editing services. Built with advanced CSS animations, interactive elements, and dynamic video backgrounds.

![edited.frame Portfolio](https://img.shields.io/badge/Status-Live-brightgreen) ![License](https://img.shields.io/badge/License-MIT-blue) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 🎬 Features

### ✨ Advanced Animations
- **Glass Morphism Design** with backdrop blur effects
- **Interactive Workflow Graph** with connecting animations
- **Scroll-triggered Animations** using Intersection Observer
- **Dynamic Video Backgrounds** with random rotation
- **Hover Ripple Effects** and 3D transformations

### 🎯 Interactive Elements
- **Animated Navbar Logo** with particle effects
- **Click-to-Complete Workflow** progression system
- **Dynamic Footer Videos** with auto-changing backgrounds
- **Contact Form Integration** with Discord webhook
- **Lightbox Video Player** for portfolio showcase

### 📱 Responsive Design
- **Mobile-first approach** with optimized layouts
- **Cross-browser compatibility** with webkit prefixes
- **Performance optimized** video loading
- **Touch-friendly interactions** for all devices

### 🎨 Modern UI/UX
- **Advanced CSS Grid** and Flexbox layouts
- **Gradient Text Effects** and animations
- **Professional Color Scheme** with consistent theming
- **Micro-interactions** for enhanced user experience

## 🚀 Demo

Visit the live demo: [edited.frame Portfolio](https://your-demo-link.com)

## 📁 Project Structure

```
edited.frame/
├── index.html                 # Main HTML file
├── css/
│   └── styles.css            # All styling and animations
├── js/
│   └── main.js               # JavaScript functionality
├── assets/
│   ├── logo.jpg              # Brand logo
│   ├── educational.mp4       # Educational video samples
│   ├── educational (2).mp4   
│   ├── motion graphic (1-3).mp4  # Motion graphics
│   ├── trading (1-4).mp4     # Trading video samples
│   ├── sub vdo.mp4           # Additional video content
│   └── tradind 5.mp4         
└── README.md                 # This file
```

## �️ Installation & Setup

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/edited-frame-portfolio.git
   cd edited-frame-portfolio
   ```

2. **Open in browser**
   ```bash
   # Option 1: Direct file opening
   open index.html
   
   # Option 2: Using Python server
   python -m http.server 8000
   
   # Option 3: Using Node.js server
   npx serve .
   ```

3. **Customize content**
   - Replace videos in `/assets` folder with your own content
   - Update contact information in `index.html`
   - Modify Discord webhook URL in `js/main.js`
   - Customize colors and branding in `css/styles.css`

## ⚙️ Configuration

### Discord Integration
Update the webhook URL in `js/main.js`:
```javascript
const response = await fetch('YOUR_DISCORD_WEBHOOK_URL', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(discordPayload)
});
```

### Video Assets
Replace sample videos in `/assets` folder:
- **Trading videos**: `trading (1-4).mp4`
- **Educational content**: `educational.mp4`, `educational (2).mp4`
- **Motion graphics**: `motion graphic (1-3).mp4`
- **Additional content**: `sub vdo.mp4`, `tradind 5.mp4`

### Contact Information
Update personal details in `index.html`:
```html
<a href="mailto:your-email@example.com">your-email@example.com</a>
<a href="https://www.instagram.com/your-handle">@your-handle</a>
```

## 🎨 Customization

### Color Scheme
Primary colors are defined as CSS custom properties:
```css
:root {
    --accent: #7b2ff2;        /* Primary purple */
    --accent2: #ff6b6b;       /* Secondary coral */
    --background: #0a0a0f;    /* Dark background */
    --panel: #161620;         /* Panel background */
}
```

### Animations
Customize animation durations and effects:
```css
/* Example: Modify workflow animation timing */
.workflow-step:nth-child(1){ animation-delay: 0.2s; }
.workflow-step:nth-child(2){ animation-delay: 0.4s; }
```

## 🚀 Deployment

### GitHub Pages
1. Push to GitHub repository
2. Go to repository Settings > Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://yourusername.github.io/repository-name`

### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: (none needed)
3. Set publish directory: `/` (root)
4. Deploy automatically on git push

### Vercel
1. Import project from GitHub
2. No build configuration needed
3. Deploy with zero configuration

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines
1. **Code Style**: Follow existing code formatting
2. **Comments**: Add comments for complex animations
3. **Testing**: Test across different browsers and devices
4. **Performance**: Optimize images and videos before adding

### Reporting Issues
Please use the GitHub issue tracker to report bugs or request features.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Fonts**: Inter and Poppins from Google Fonts
- **Icons**: Emoji icons for universal compatibility
- **Inspiration**: Modern video editing portfolio trends
- **Community**: Thanks to all contributors and users

## 📞 Contact

**Sachin Prajapati** - Professional Video Editor
- 📧 Email: [connectwithsachin06@gmail.com](mailto:connectwithsachin06@gmail.com)
- 📱 Instagram: [@edited.frame](https://www.instagram.com/edited.frame)
- 🌐 Portfolio: [edited.frame](https://your-website.com)

---

⭐ Star this repository if you found it helpful!

## 🔄 Version History

### v1.0.0 (Current)
- ✅ Initial release with full functionality
- ✅ Advanced animations and interactions
- ✅ Discord webhook integration
- ✅ Responsive design implementation
- ✅ Dynamic video backgrounds

### Future Updates
- 🔮 Admin dashboard for content management
- 🔮 Blog section for video editing tips
- 🔮 Client testimonials carousel
- 🔮 Advanced video compression
- 🔮 Multi-language support

---

**Built with ❤️ and passion for visual storytelling**
- **Lightbox video player** with full-screen viewing

### Modern Design
- **Premium gradient color scheme** with consistent branding
- **Glassmorphism effects** with backdrop blur
- **Smooth animations** and hover effects
- **Mobile-first responsive design**

### Performance Optimized
- **Lazy loading** for videos
- **Optimized video compression** recommendations
- **Cross-browser compatibility** including Safari support
- **SEO optimized** structure

## 📁 Project Structure

```
sachin/
├── index.html              # Main HTML file
├── css/
│   └── styles.css         # All styles and responsive design
├── js/
│   └── main.js           # JavaScript functionality and video management
├── assets/               # Video and image assets
│   ├── logo.jpg         # Brand logo
│   ├── trading (1-5).mp4    # Trading video content
│   ├── educational.mp4       # Educational content
│   ├── motion graphic (1-3).mp4  # Motion graphics
│   └── sub vdo.mp4          # Social media content
└── README.md            # Project documentation
```

## 🎥 Video Categories

The system automatically categorizes videos based on filename patterns:

### Trading Reels
- `trading (1).mp4` → Technical Analysis Trading
- `trading (2).mp4` → Market Movement Analysis  
- `trading (3).mp4` → Forex Trading Strategy
- `trading (4).mp4` → Crypto Trading Guide
- `tradind 5.mp4` → Options Trading Basics

### Educational Videos
- `educational.mp4` → Investment Fundamentals
- `educational (2).mp4` → Risk Management Guide

### Motion Graphics
- `motion graphic (1).mp4` → Dynamic Logo Animation
- `motion graphic (2).mp4` → Data Visualization
- `motion graphic (3).mp4` → Brand Identity Animation

### Social Media Edits
- `sub vdo.mp4` → Social Media Promo

## 🛠️ Adding New Videos

To add new videos to the portfolio:

1. **Upload video files** to the `assets/` folder
2. **Follow naming conventions**:
   - Trading content: `trading (number).mp4`
   - Educational: `educational (number).mp4` 
   - Motion graphics: `motion graphic (number).mp4`
   - Social media: `social (number).mp4`

3. **Update the video database** in `js/main.js`:
```javascript
// Add new video object to the videos array
{
    filename: 'your-video.mp4',
    title: 'Your Video Title',
    category: 'category-name', // trading-reel, educational-video, motion-graphic, social-media
    type: 'Display Type'
}
```

## 📱 Responsive Design

The website is fully responsive with breakpoints at:
- **Desktop**: 1024px+ (3-column grid)
- **Tablet**: 768px-1023px (2-column grid) 
- **Mobile**: 320px-767px (1-column grid)

### Mobile Features
- Sticky navigation with backdrop blur
- Horizontal scroll filters
- Touch-friendly video controls
- Optimized video loading

## 🎨 Design System

### Colors
```css
--bg: #f7f8fa;           /* Background */
--panel: #ffffff;         /* Card backgrounds */
--muted: #6c7a89;        /* Secondary text */
--accent: #7b2ff2;       /* Primary purple */
--accent2: #f357a8;      /* Secondary pink */
--white: #222;           /* Primary text */
```

### Typography
- **Headings**: Poppins (600, 700)
- **Body**: Inter (300, 400, 600, 700, 800)

## ⚡ Performance

### Video Optimization
- **Recommended format**: MP4 (H.264)
- **Aspect ratio**: 9:16 for mobile-first design
- **File size**: <50MB for optimal loading
- **Resolution**: 1080x1920 maximum

### Loading Strategy
- **Preload**: metadata only
- **Autoplay**: muted loops for preview
- **Lazy loading**: videos load as needed

## 🔧 Browser Support

- **Chrome**: 60+
- **Firefox**: 55+
- **Safari**: 12+ (with webkit prefixes)
- **Edge**: 79+
- **Mobile browsers**: iOS Safari 12+, Chrome Mobile 60+

## 📞 Contact Integration

The contact form uses `mailto:` links for direct email client integration. For production use, consider implementing:
- Server-side form processing
- Email API integration (SendGrid, Mailgun)
- Form validation and spam protection

## 🚀 Deployment

### Static Hosting (Recommended)
- **Netlify**: Drag and drop deployment
- **Vercel**: Git integration with automatic deployments
- **GitHub Pages**: Free hosting for static sites

### Steps
1. Build and test locally
2. Optimize video files for web
3. Deploy to hosting platform
4. Configure custom domain (optional)

## 🔮 Future Enhancements

### Planned Features
- **CMS Integration**: Headless CMS for easy content management
- **Video Analytics**: Track engagement and popular content
- **Advanced Filtering**: Tag-based filtering system
- **Admin Panel**: Upload and manage videos without code changes

### Technical Improvements
- **Service Worker**: Offline functionality
- **Progressive Web App**: Install prompt and app-like experience
- **Image Optimization**: WebP format with fallbacks
- **CDN Integration**: Global content delivery

## 📄 License

Private project for Sachin Prajapati (edited.frame). All rights reserved.

---

**Built with ❤️ for edited.frame**

For technical support or questions, contact: [connectwithsachin06@gmail.com](mailto:connectwithsachin06@gmail.com)
