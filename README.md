# Hotel Website Template

A modern, responsive hotel website built with Astro and Sanity CMS, featuring inline editing capabilities and a comprehensive content management system.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Sanity account

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd hotel-website-template
   npm install
   ```

2. **Install Sanity dependencies:**
   ```bash
   cd hotel-website
   npm install
   ```

3. **Start development servers:**
   ```bash
   # Terminal 1: Start Astro website
   npm run dev
   
   # Terminal 2: Start Sanity Studio (optional - online version recommended)
   cd hotel-website
   npm run dev
   ```

## 🌐 Live URLs

- **Website**: `http://localhost:4323` (local development)
- **Sanity Studio**: `https://www.sanity.io/@oPHpfbZpb/studio/olobv8thwgcnuzse4xr7ntni/hotel-website/releases` (online)

## ✨ Features

### 🎨 Frontend (Astro)
- **Modern Design**: Clean, responsive layout with Tailwind CSS
- **Performance**: Optimized with Astro's static site generation
- **Components**: Reusable Astro components for consistency
- **Icons**: Lucide icon system for semantic, consistent icons

### 📝 Content Management (Sanity)
- **Online Studio**: Accessible Sanity Studio for content editing
- **Inline Editing**: Preview mode with WYSIWYG editor
- **Rich Content**: Support for text, images, and structured content
- **Real-time**: Live preview of changes

### 🔧 Preview Mode
- **Live Editing**: Edit content directly on the website
- **WYSIWYG Editor**: Rich text editing with formatting options
- **Icon Picker**: Insert icons directly into content
- **Save Changes**: Real-time saving to Sanity

## 📁 Project Structure

```
hotel-website-template/
├── src/                    # Astro source files
│   ├── components/         # Reusable components
│   ├── layouts/           # Page layouts
│   ├── lib/              # Utilities and scripts
│   ├── pages/            # Astro pages
│   └── styles/           # CSS and styling
├── hotel-website/         # Sanity Studio
│   ├── schemaTypes/      # Content schemas
│   └── sanity.config.ts  # Sanity configuration
├── public/               # Static assets
└── tests/               # Playwright tests
```

## 🛠️ Development

### Local Development
```bash
# Start Astro development server
npm run dev

# Access website at http://localhost:4323
# Add ?preview=true to enable preview mode
```

### Content Editing
1. **Online Studio**: Use the Sanity Studio URL for content management
2. **Preview Mode**: Visit any page with `?preview=true` for inline editing
3. **WYSIWYG Editor**: Click on editable fields to open the editor

### Testing
```bash
# Run all tests
npm test

# Run specific test suites
npm run test:preview
npm run test:ui
```

## 🚀 Deployment

### Vercel Deployment
The project is configured for Vercel deployment with:
- Automatic builds on push
- Environment variables for Sanity
- Static site generation

### Sanity Studio
The Sanity Studio is deployed online and accessible at:
`https://www.sanity.io/@oPHpfbZpb/studio/olobv8thwgcnuzse4xr7ntni/hotel-website/releases`

## 📋 Content Types

### Homepage
- Hero section with title and description
- Call-to-action sections
- Content blocks

### Site Settings
- Navigation menu
- Footer content
- Contact information
- Custom colors and branding

## 🎯 Key Technologies

- **Astro**: Static site generator
- **Sanity**: Headless CMS
- **Tailwind CSS**: Utility-first CSS
- **TypeScript**: Type safety
- **Lucide**: Icon system
- **Playwright**: Testing framework

## 🔧 Configuration

### Environment Variables
```bash
SANITY_STUDIO_PROJECT_ID=0knotzp4
SANITY_STUDIO_DATASET=production
```

### Sanity Configuration
- Project ID: `0knotzp4`
- Dataset: `production`
- Studio URL: Online deployment

## 📚 Documentation

- **Astro**: https://docs.astro.build/
- **Sanity**: https://www.sanity.io/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Lucide Icons**: https://lucide.dev/

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Note**: Local Sanity Studio development may have CORS issues. The online Sanity Studio is recommended for content management.