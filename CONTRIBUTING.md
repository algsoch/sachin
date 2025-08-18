# Contributing to edited.frame Portfolio

Thank you for your interest in contributing to the edited.frame portfolio project! We welcome contributions from everyone.

## 🤝 How to Contribute

### Reporting Bugs

1. **Check existing issues** to see if the bug has already been reported
2. **Create a detailed bug report** including:
   - Steps to reproduce the issue
   - Expected behavior
   - Actual behavior
   - Screenshots or videos if applicable
   - Browser and operating system information

### Suggesting Features

1. **Check existing feature requests** to avoid duplicates
2. **Create a feature request** with:
   - Clear description of the feature
   - Use case and benefits
   - Possible implementation approach
   - Any relevant mockups or examples

### Code Contributions

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`
3. **Make your changes** following our coding guidelines
4. **Test thoroughly** across different browsers and devices
5. **Commit with clear messages**: `git commit -m "Add: feature description"`
6. **Push to your fork**: `git push origin feature/your-feature-name`
7. **Create a Pull Request** with detailed description

## 📝 Coding Guidelines

### HTML
- Use semantic HTML5 elements
- Maintain proper indentation (2 spaces)
- Include alt attributes for images
- Ensure accessibility compliance

### CSS
- Follow existing naming conventions
- Use CSS custom properties for colors
- Group related properties together
- Comment complex animations and calculations
- Maintain cross-browser compatibility

### JavaScript
- Use modern ES6+ syntax
- Follow consistent naming conventions
- Add comments for complex logic
- Handle errors gracefully
- Optimize for performance

### File Organization
```
css/
  styles.css          # Main stylesheet
js/
  main.js             # Main JavaScript file
assets/
  *.mp4               # Video files
  *.jpg/.png          # Image files
```

## 🎨 Design Guidelines

### Animation Principles
- **Performance**: Use transform and opacity for animations
- **Duration**: Keep animations between 200ms-800ms
- **Easing**: Use cubic-bezier for smooth transitions
- **Purpose**: Every animation should enhance UX

### Color Scheme
- Primary: `#7b2ff2` (Purple)
- Secondary: `#ff6b6b` (Coral)
- Background: `#0a0a0f` (Dark)
- Text: `#ffffff` (White)

### Typography
- Headers: Poppins (600-700)
- Body: Inter (300-600)
- Maintain 1.4-1.6 line height for readability

## 🔧 Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/edited-frame-portfolio.git
   cd edited-frame-portfolio
   ```

2. **Start local server**
   ```bash
   # Python
   python -m http.server 8000
   
   # Node.js
   npx serve .
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

## 🧪 Testing

### Browser Testing
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Device Testing
- Desktop (1920x1080, 1366x768)
- Tablet (768x1024)
- Mobile (375x667, 414x896)

### Performance Testing
- Lighthouse score > 90
- Page load time < 3 seconds
- Video optimization
- Image compression

## 📋 Pull Request Checklist

- [ ] Code follows existing style guidelines
- [ ] Changes are tested across multiple browsers
- [ ] Responsive design works on mobile devices
- [ ] No console errors or warnings
- [ ] Performance impact is minimal
- [ ] Documentation is updated if needed
- [ ] Commit messages are clear and descriptive

## 🏷️ Commit Message Format

Use clear, descriptive commit messages:

```
Type: Brief description

Detailed explanation if needed

Types:
- Add: New feature or content
- Fix: Bug fix
- Update: Modification to existing feature
- Remove: Deletion of feature or code
- Style: CSS/design changes
- Docs: Documentation changes
- Performance: Performance improvements
```

Examples:
```
Add: Interactive workflow animation with progress indicator
Fix: Video autoplay issue on mobile Safari
Update: Improve text contrast in services section
Style: Enhance button hover animations
```

## 🎯 Areas for Contribution

### High Priority
- [ ] Accessibility improvements (ARIA labels, keyboard navigation)
- [ ] Performance optimizations (lazy loading, compression)
- [ ] Cross-browser compatibility fixes
- [ ] Mobile responsiveness enhancements

### Medium Priority
- [ ] Additional animation effects
- [ ] Theme customization options
- [ ] SEO improvements
- [ ] Code documentation

### Low Priority
- [ ] Additional language support
- [ ] Advanced admin features
- [ ] Integration with other platforms
- [ ] Analytics implementation

## 🆘 Getting Help

- **Discord**: Join our community server
- **Issues**: Use GitHub issues for questions
- **Email**: Contact the maintainer
- **Documentation**: Check the README.md

## 👥 Community

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow the code of conduct

Thank you for contributing to make this project better! 🎬✨
