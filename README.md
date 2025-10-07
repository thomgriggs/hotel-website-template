# Hotel Website Template

A modern, CMS-driven hotel website built with Astro and Sanity.

## 🚀 Features

- **CMS-Driven Content** - All content managed through Sanity Studio
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Interactive Maps** - Leaflet integration for contact and location pages
- **Modern Stack** - Astro, TypeScript, Sanity, GSAP, Swiper
- **SEO Optimized** - Semantic HTML and meta tags

## 📁 Project Structure

```
hotel-website-template/
├── src/                    # Main website source
│   ├── components/         # Reusable components
│   ├── layouts/           # Page layouts
│   ├── pages/             # Website pages
│   ├── styles/            # CSS stylesheets
│   └── lib/               # Utilities (Sanity client)
├── hotel-website/         # Sanity Studio
│   └── schemaTypes/       # Content schemas
└── package.json           # Dependencies
```

## 🎨 Required Assets

The following placeholder images need to be added to the `public/` directory:

- `favicon.svg` - Website favicon
- `logo-placeholder.png` - Main logo (800x200px)
- `logo-white-placeholder.png` - White logo variant (800x200px)
- `hero-image.jpg` - Default hero background image

## 🛠️ Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Start Sanity Studio:**
   ```bash
   cd hotel-website && npm run dev
   ```

## 📝 Content Management

All content is managed through Sanity Studio at `http://localhost:3333`:

- **Homepage** - Hero content, featured sections
- **Contact Page** - Contact info, form, map
- **Location Page** - Address, directions, local attractions
- **Rooms** - Room types and details
- **Dining** - Restaurant information
- **Amenities** - Hotel facilities
- **Site Settings** - Global settings, navigation, footer

## 🎯 Pages

- `/` - Homepage
- `/rooms` - Room listings
- `/dining` - Restaurant listings  
- `/amenities` - Hotel facilities
- `/location` - Location and directions
- `/contact` - Contact information and form

## 🔧 Technologies

- **Astro** - Static site generation
- **Sanity** - Headless CMS
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Leaflet** - Interactive maps
- **GSAP** - Animations
- **Swiper** - Sliders/carousels