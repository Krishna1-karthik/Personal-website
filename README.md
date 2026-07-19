# Personal Website - Karthik K

A modern, professional personal website built with vanilla HTML, CSS, and JavaScript. Showcase your portfolio, resume, blog, and professional information.

## 📁 Project Structure

```
NewRepo/
├── index.html          # Main landing page
├── resume.html         # Professional resume/CV
├── blog.html           # Blog posts listing and detail view
├── css/
│   └── styles.css      # Main stylesheet (dark theme, responsive)
├── js/
│   ├── script.js       # Navigation and form handling
│   └── blog.js         # Blog post management
└── README.md           # This file
```

## 🌟 Features

### Pages
1. **Home (index.html)**
   - Hero section with call-to-action
   - About me section with skills grid
   - Featured projects portfolio
   - Blog preview
   - Contact form with validation
   - Social media links

2. **Resume (resume.html)**
   - Professional summary
   - Detailed technical skills
   - Complete work experience
   - Education and certifications
   - Key responsibilities
   - Print-to-PDF functionality

3. **Blog (blog.html)**
   - Blog listings view
   - Individual blog post detail view
   - Pre-loaded sample posts:
	 - Microservices Architecture: Best Practices
	 - Performance Optimization in .NET Core
	 - Angular Component Communication Patterns

### Design Features
- **Modern Dark Theme**: Professional dark background with cyan/blue accent colors
- **Fully Responsive**: Mobile, tablet, and desktop optimized
- **Smooth Animations**: Fade-in and slide-in effects
- **Navigation**: Sticky navbar with smooth scrolling
- **Forms**: Contact form with client-side validation and localStorage
- **Print Support**: Resume can be printed to PDF
- **Social Integration**: LinkedIn, GitHub, and email links
- **Performance Optimized**: Lightweight CSS and vanilla JavaScript

## 🚀 Getting Started

### Option 1: Local Development Server

```bash
# Navigate to project directory
cd C:\Users\kmcak\source\repos\NewRepo

# Start Python HTTP server
python -m http.server 8000

# Open in browser
http://localhost:8000
```

### Option 2: Using Node.js Live Server

```bash
npm install -g live-server
live-server
```

### Option 3: Direct File Access
Simply open `index.html` in your web browser.

## 📝 Customization

### Personal Information
Edit the following in each HTML file:
- Name: "Karthik K" → Your name
- Email: kmcakarthi@gmail.com → Your email
- Phone: +91 9048937226 → Your phone
- LinkedIn: linkedin.com/in/karthik-k-18a17b173/ → Your LinkedIn URL
- Location: "Kannur, Kerala, India" → Your location

### Color Scheme
Edit CSS variables in `css/styles.css`:
```css
:root {
	--primary-color: #0ea5e9;      /* Main color */
	--accent-color: #06b6d4;       /* Accent color */
	--background-color: #0f172a;   /* Background */
	--text-primary: #f1f5f9;       /* Primary text */
	--text-secondary: #cbd5e1;     /* Secondary text */
}
```

### Portfolio Projects
Edit the portfolio section in `index.html` to add/modify your projects.

### Blog Posts
Edit the `blogPosts` array in `js/blog.js` to add new blog posts:
```javascript
{
	id: 4,
	title: "Your Blog Title",
	date: "Jan 1, 2025",
	author: "Your Name",
	category: "Category",
	readTime: "5 min read",
	excerpt: "Brief description",
	content: `<h2>Full HTML content here</h2>`
}
```

### Skills
Update the skills section in `index.html` to reflect your technical expertise.

## 📧 Contact Form

The contact form includes:
- **Validation**: Name, email, subject, and message validation
- **Storage**: Submissions stored in browser's localStorage
- **User Feedback**: Success/error messages

To integrate with a backend service, modify the form submission handler in `js/script.js`.

## 🎨 Styling Details

### Typography
- Modern sans-serif font stack
- Responsive heading sizes
- Optimal line heights for readability

### Layout
- CSS Grid and Flexbox for responsive layouts
- Mobile-first responsive design
- Smooth transitions and animations

### Colors
- Dark theme with cyan accents
- High contrast for readability
- Professional appearance

## 🔍 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## 🎯 SEO Features

- Semantic HTML structure
- Meta tags for description
- Mobile viewport configuration
- Proper heading hierarchy

## 📄 Print Support

The resume page includes print styles for PDF export:
1. Open `resume.html` in browser
2. Click "Print Resume" button or use Ctrl+P
3. Select "Save as PDF"

## 🔄 Git Integration

Push to GitHub:
```bash
git add .
git commit -m "Initial personal website"
git push origin master
```

## 🚀 Deployment Options

### GitHub Pages (Free)
1. Push code to GitHub
2. Go to repository Settings
3. Enable GitHub Pages for main branch
4. Site will be available at `https://yourusername.github.io/Personal-website`

### Netlify
1. Connect your Git repository
2. Set build command: (none needed for static site)
3. Set publish directory: `/` (root)

### Vercel
1. Import your GitHub repository
2. Deploy with zero configuration needed

### Traditional Hosting
1. Upload files via FTP to your hosting provider
2. Configure domain to point to hosting

## 📚 Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Grid/Flexbox, animations
- **JavaScript (Vanilla)**: No dependencies, lightweight
- **Font Awesome**: Icons (via CDN)

## 🔐 Privacy

- Contact form data stored locally (not sent anywhere by default)
- No analytics or tracking
- No third-party data collection (except Font Awesome CDN)

## 📋 TODO / Future Enhancements

- [ ] Backend API for contact form
- [ ] Comment system for blog posts
- [ ] Search functionality
- [ ] Dark/Light mode toggle
- [ ] Multi-language support
- [ ] Mobile app version
- [ ] CMS integration
- [ ] Email notifications

## 📄 License

This personal website template is free to use and modify for your own use.

## 💡 Tips

1. **Update Regularly**: Keep your portfolio and blog updated
2. **Optimize Images**: Use compressed images for better performance
3. **Test**: Test on multiple devices and browsers
4. **Monitor**: Use Google Analytics or similar to track visitors
5. **SEO**: Submit sitemap to search engines
6. **Backup**: Keep backups of your website content

## 📞 Support

For questions or issues, refer to the code comments or consult the browser developer console for errors.

---

**Website Version**: 1.0
**Last Updated**: December 2024
**Created for**: Karthik K
