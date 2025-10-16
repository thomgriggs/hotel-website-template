# Hotel Website Template

A modern, CMS-driven hotel website built with Astro and Sanity, featuring live preview mode, inline editing, and comprehensive content management.

## 🚀 Features

- **Live Preview Mode** - Real-time content editing with password protection
- **Inline Editing** - Direct content editing from the frontend with visual indicators
- **WYSIWYG Editor** - Rich text editor with formatting, icons, and lists
- **Progressive Icon Picker** - Core icons + search + favorites system
- **CMS-Driven Content** - All content managed through Sanity Studio
- **Content Templates** - Flexible template system for dynamic page creation
- **Visual Editing** - Sanity's visual editing capabilities
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Interactive Maps** - Leaflet integration for contact and location pages
- **Modern Stack** - Astro, TypeScript, Sanity, GSAP, Swiper
- **SEO Optimized** - Semantic HTML, meta tags, and structured data
- **Performance** - Static site generation with optimized assets

## 📁 Project Structure

```
hotel-website-template/
├── src/                    # Main website source
│   ├── components/         # Reusable components
│   ├── layouts/           # Page layouts
│   ├── pages/             # Website pages
│   ├── styles/            # CSS stylesheets
│   │   ├── main.css       # Main styles
│   │   └── wysiwyg.css    # WYSIWYG editor styles
│   └── lib/               # Utilities and preview mode
│       ├── previewMode.ts  # Global preview mode functionality
│       ├── inlineEditor.ts # Inline editing system
│       ├── wysiwygEditor.ts # WYSIWYG editor with icon picker
│       └── sanity.ts      # Sanity client configuration
├── hotel-website/         # Sanity Studio
│   ├── schemaTypes/       # Content schemas
│   │   └── siteSettings.ts # Site settings
│   └── scripts/          # Content management scripts
├── public/               # Static assets
├── tests/               # Playwright test suite
│   ├── tests/           # Test files
│   └── playwright.config.ts # Test configuration
└── package.json         # Dependencies and scripts
```

## 🎨 Assets

The project includes placeholder assets that are ready to use:

- `icon-192.svg` - Website favicon (already configured)
- `logo-placeholder.png` - Main logo (800x200px)
- `logo-white-placeholder.png` - White logo variant (800x200px)
- `logo-placeholder.webp` - Optimized logo format
- `manifest.json` - PWA configuration

**To customize:** Simply replace the placeholder files in the `public/` directory with your own assets. The project will automatically use your custom images.

## ✨ **WYSIWYG Editor**

The hotel website template includes a powerful WYSIWYG (What-You-See-Is-What-You-Get) editor for rich text content editing in preview mode.

### **Core Features**
- **Rich Text Formatting**: Bold, italic, links
- **Progressive Icon Picker**: Core icons + search + favorites
- **List Creation**: Bulleted and numbered lists
- **Keyboard Shortcuts**: Ctrl+B (bold), Ctrl+I (italic), Ctrl+K (link)
- **Responsive Design**: Works on all devices

### **Icon System**
- **Core Icons**: 20 essential icons always visible
- **Search Functionality**: Search through full Lucide icon library
- **Favorites System**: Auto-favorite frequently used icons
- **Recent Icons**: Track recently used icons
- **Clean Interface**: Intuitive tabbed interface

### **Usage**
1. Enter preview mode (`?preview`)
2. Click on any text field
3. Use toolbar for formatting
4. Click icon button to insert icons
5. Save changes

### **Progressive Enhancement**
- **Phase 1**: Core icons + search (current)
- **Phase 2**: Categories + favorites (future)
- **Phase 3**: Custom upload (future)

This ensures users get immediate value while having a clear growth path for advanced needs.

## 🎨 Preview Mode

The website features a powerful preview mode that allows real-time content editing:

### **Activating Preview Mode:**
Add `?preview=true` to any page URL:
- `http://localhost:4321/?preview=true`
- `http://localhost:4321/rooms?preview=true`
- `http://localhost:4321/contact?preview=true`

### **Preview Mode Features:**
- **Password Protection** - Secure access to editing features
- **Smart Indicator** - Floating preview mode indicator with collision detection
- **Inline Editing** - Click on any content to edit directly
- **Visual Indicators** - Hover effects show editable content
- **Persistent Navigation** - Preview mode maintained across page navigation
- **Studio Integration** - Direct links to Sanity Studio for advanced editing

## 🛠️ Setup

### **Prerequisites:**
- Node.js 18+ 
- npm or yarn
- Sanity account

### **Installation:**

1. **Install dependencies:**
   ```bash
   npm install
   cd hotel-website && npm install
   ```

2. **Configure Sanity:**
   ```bash
   cd hotel-website
   npm run sanity init
   ```

3. **Set up environment variables:**
   Create `.env` file with your Sanity project details:
   ```
   SANITY_PROJECT_ID=your_project_id
   SANITY_DATASET=production
   SANITY_API_READ_TOKEN=your_read_token
   ```

4. **Start development servers:**
   ```bash
   # Terminal 1 - Astro frontend
   npm run dev
   
   # Terminal 2 - Sanity Studio
   cd hotel-website && npm run dev
   ```

## 📝 Content Management

All content is managed through Sanity Studio at `http://localhost:3333`:

### **Core Content:**
- **Homepage** - Hero content, featured sections, testimonials
- **Contact Page** - Contact info, form, interactive map
- **Location Page** - Address, directions, local attractions
- **About Page** - Hotel story, team, history

### **Dynamic Content:**
- **Rooms** - Room types, amenities, pricing, availability
- **Dining** - Restaurants, menus, hours, special events
- **Amenities** - Hotel facilities, spa services, fitness center
- **Events** - Special events, conferences, weddings
- **Gallery** - Photo galleries, virtual tours
- **Newsletter** - Email signup, updates

### **Site Settings:**
- **Navigation** - Main menu, footer links
- **Global Settings** - Site title, description, contact info
- **SEO** - Meta tags, structured data, sitemap

## 🎯 Pages

### **Main Pages:**
- `/` - Homepage with hero slider and featured content
- `/about` - About the hotel, story, team
- `/rooms` - Room listings and details
- `/dining` - Restaurant listings and menus
- `/amenities` - Hotel facilities and services
- `/location` - Location, directions, local area
- `/contact` - Contact information and form
- `/gallery` - Photo galleries and virtual tours
- `/newsletter` - Newsletter signup

### **Dynamic Pages:**
- `/rooms/[slug]` - Individual room pages
- `/dining/[slug]` - Individual restaurant pages
- `/amenities/[slug]` - Individual amenity pages
- `/[slug]` - Custom content pages

### **Utility Pages:**
- `/privacy` - Privacy policy
- `/terms` - Terms of use
- `/offline` - Offline page for PWA

## 🔧 Technologies

- **Astro** - Static site generation with component islands
- **Sanity** - Headless CMS with visual editing
- **TypeScript** - Type safety throughout
- **Tailwind CSS** - Utility-first styling
- **Leaflet** - Interactive maps
- **GSAP** - Smooth animations
- **Swiper** - Touch sliders and carousels
- **Sanity Visual Editing** - Live preview and editing

## 🚀 Deployment

### **Build for Production:**
```bash
npm run build
```

### **Deploy to Vercel:**
1. Push to GitHub
2. Connect to Vercel
3. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### **Environment Variables for Production:**
Set these in your deployment platform:
- `SANITY_PROJECT_ID`
- `SANITY_DATASET`
- `SANITY_API_READ_TOKEN`

## 📚 Content Templates

The project includes a flexible content template system:

- **Hero Sections** - Full-width hero with text overlay
- **Text Sections** - Rich text content blocks
- **Image Text Sections** - Side-by-side image and text
- **Gallery Sections** - Photo galleries and carousels
- **Testimonials** - Customer reviews and ratings
- **CTA Sections** - Call-to-action blocks
- **FAQ Sections** - Frequently asked questions
- **Form Sections** - Contact and booking forms

## 🔍 Development

### **Preview Mode Development:**
The preview mode is implemented as a global component in `src/lib/previewMode.ts` and automatically loads on all pages when `?preview=true` is present in the URL.

### **Content Scripts:**
Located in `hotel-website/scripts/`:
- Content population scripts
- Schema validation fixes
- Bulk operations
- Data migration tools

## 📖 Documentation

- `INLINE_EDITING_GUIDE.md` - Complete guide to inline editing
- `SANITY_API_SETUP.md` - Sanity configuration guide
- `SANITY_FIX_GUIDE.md` - Common issues and solutions
- `MISSING_KEYS_FIX.md` - Fixing Sanity validation errors

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with preview mode
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.