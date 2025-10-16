# Icon System & Adaptive Styling Documentation

## Overview

The hotel website template now includes a comprehensive icon management system and adaptive styling framework for preview mode. This system provides:

- **Professional Lucide Icons**: Replaces emoji icons with consistent, semantic Lucide icons
- **Custom Icon Upload**: Upload and manage custom SVG icons
- **Adaptive Color Themes**: Automatically adjusts colors based on background content
- **Icon Management Interface**: Admin dashboard for managing icons and usage statistics
- **Theme Configuration**: Configurable themes via Sanity Studio

## Table of Contents

1. [Icon System](#icon-system)
2. [Adaptive Styling](#adaptive-styling)
3. [Theme Configuration](#theme-configuration)
4. [Icon Management](#icon-management)
5. [API Reference](#api-reference)
6. [Customization Guide](#customization-guide)
7. [Troubleshooting](#troubleshooting)

## Icon System

### Built-in Icons

The system includes a curated set of Lucide icons organized by category:

#### Content Icons
- `type` - Headlines and titles
- `image` - Images and media
- `file-text` - Paragraphs and text content
- `map-pin` - Addresses and locations
- `link` - Buttons and links

#### Action Icons
- `edit` - Edit content
- `save` - Save changes
- `cancel` - Cancel actions
- `settings` - Configuration

#### Navigation Icons
- `menu` - Menu and navigation
- `home` - Home page
- `arrow-right` - Next/forward navigation
- `arrow-left` - Previous/back navigation

### Custom Icons

Upload custom SVG icons with the following requirements:

- **Format**: SVG only
- **Size**: Maximum 50KB
- **Security**: No script tags or external references
- **Structure**: Must include viewBox or width/height attributes

### Icon Registry

Icons are managed through a centralized registry system:

```typescript
// Get all available icons
const icons = await iconManager.getAvailableIcons();

// Get icons by category
const contentIcons = await iconManager.getIconsByCategory('content');

// Search icons
const searchResults = await iconManager.searchIcons('edit');

// Get icon SVG content
const svgContent = await iconRegistry.getIconSVG('type');
```

## Adaptive Styling

### Theme System

The adaptive styling system includes four preset themes:

#### Neutral Theme (Default)
- **Primary**: Dark gray (#374151)
- **Background**: Semi-transparent dark gray
- **Text**: White with high contrast
- **Use Case**: Works on any background

#### Warm Theme
- **Primary**: Amber (#D97706)
- **Background**: Warm amber tones
- **Text**: White with warm accents
- **Use Case**: Perfect for warm backgrounds

#### Cool Theme
- **Primary**: Teal (#0D9488)
- **Background**: Cool teal tones
- **Text**: White with cool accents
- **Use Case**: Ideal for cool backgrounds

#### Professional Theme
- **Primary**: Navy blue (#1E40AF)
- **Background**: Professional blue tones
- **Text**: White with corporate styling
- **Use Case**: Perfect for corporate environments

### Smart Contrast Detection

The system automatically detects optimal themes based on:

1. **Background Luminance**: Calculates brightness of content background
2. **Color Temperature**: Detects warm vs cool color tones
3. **Contrast Threshold**: Configurable threshold for light/dark detection

```typescript
// Detect optimal theme for an element
const optimalTheme = themeManager.detectOptimalTheme(element);

// Apply theme
themeManager.applyTheme(optimalTheme);
```

### CSS Variables

All styling uses CSS custom properties for easy customization:

```css
:root {
  --preview-primary: #374151;
  --preview-primary-hover: #4B5563;
  --preview-background: rgba(55, 65, 81, 0.9);
  --preview-text: #FFFFFF;
  --preview-border: #374151;
  --preview-shadow: rgba(0, 0, 0, 0.3);
}
```

## Theme Configuration

### Sanity Studio Configuration

Configure themes and icons through Sanity Studio:

1. **Navigate to Site Settings**
2. **Open Preview Mode Configuration**
3. **Configure Theme Settings**:
   - Default theme selection
   - Auto-detect theme toggle
   - Custom color overrides
4. **Configure Icon Settings**:
   - Default icon mappings
   - Custom icon preferences
   - Icon size settings

### Programmatic Configuration

```typescript
// Update theme configuration
themeManager.updateAdaptiveConfig({
  currentTheme: 'warm',
  autoDetect: true,
  contrastThreshold: 0.6
});

// Apply custom color overrides
themeManager.applyCustomOverrides({
  primary: '#FF6B35',
  background: 'rgba(255, 107, 53, 0.9)',
  text: '#FFFFFF'
});
```

## Icon Management

### Admin Interface

Access the icon management interface at `/admin/icons`:

- **Upload Icons**: Drag and drop SVG files
- **Browse Icons**: View all available icons
- **Usage Statistics**: Track icon usage across the site
- **Delete Icons**: Remove custom icons
- **Icon Details**: View metadata and usage info

### Usage Tracking

The system tracks icon usage for analytics:

```typescript
// Track icon usage
iconManager.trackIconUsage('type', 'headline-field');

// Get usage statistics
const stats = iconManager.getIconUsageStats('type');

// Get most used icons
const popularIcons = iconManager.getMostUsedIcons(10);
```

### Icon Picker Integration

Icons can be changed directly in preview mode:

1. **Hover over editable content**
2. **Click the icon picker button** (⚙️ icon)
3. **Select new icon** from the grid
4. **Icon updates automatically**

## API Reference

### IconManager

```typescript
class IconManagerService {
  // Get all available icons
  async getAvailableIcons(): Promise<IconMetadata[]>
  
  // Get icons by category
  async getIconsByCategory(categoryId: string): Promise<IconMetadata[]>
  
  // Search icons
  async searchIcons(query: string): Promise<IconMetadata[]>
  
  // Upload custom icon
  async uploadCustomIcon(uploadData: IconUploadData): Promise<boolean>
  
  // Delete custom icon
  async deleteCustomIcon(iconId: string): Promise<boolean>
  
  // Get icon SVG content
  async getIconSVG(iconId: string): Promise<string | null>
  
  // Track usage
  trackIconUsage(iconId: string, context: string): void
  
  // Get usage statistics
  getIconUsageStats(iconId: string): IconUsageStats | null
}
```

### ThemeManager

```typescript
class ThemeManager {
  // Apply theme
  applyTheme(themeId: string): void
  
  // Get current theme
  getCurrentTheme(): ThemeConfig | null
  
  // Get all themes
  getAllThemes(): ThemeConfig[]
  
  // Detect optimal theme
  detectOptimalTheme(element: Element): string
  
  // Update configuration
  updateAdaptiveConfig(config: Partial<AdaptiveThemeConfig>): void
  
  // Apply custom overrides
  applyCustomOverrides(overrides: Partial<ThemeColors>): void
}
```

### IconRegistry

```typescript
class IconRegistryService {
  // Load registry
  async loadRegistry(): Promise<IconRegistry>
  
  // Get all icons
  async getAllIcons(): Promise<IconMetadata[]>
  
  // Get icon by ID
  async getIconById(iconId: string): Promise<IconMetadata | null>
  
  // Search icons
  async searchIcons(query: string): Promise<IconMetadata[]>
  
  // Get icon SVG
  async getIconSVG(iconId: string): Promise<string | null>
  
  // Add custom icon
  async addCustomIcon(iconData: IconMetadata, svgContent: string): Promise<boolean>
  
  // Remove custom icon
  async removeCustomIcon(iconId: string): Promise<boolean>
}
```

## Customization Guide

### Adding New Themes

1. **Define theme colors** in `themeConfig.ts`:

```typescript
this.themes.set('custom', {
  id: 'custom',
  name: 'Custom Theme',
  description: 'Your custom theme description',
  colors: {
    primary: '#YOUR_COLOR',
    primaryHover: '#YOUR_HOVER_COLOR',
    // ... other colors
  },
  cssVariables: {
    '--preview-primary': '#YOUR_COLOR',
    // ... other CSS variables
  }
});
```

2. **Add to Sanity schema** in `siteSettings.ts`:

```typescript
{
  name: 'defaultTheme',
  title: 'Default Theme',
  type: 'string',
  options: {
    list: [
      { title: 'Neutral', value: 'neutral' },
      { title: 'Warm', value: 'warm' },
      { title: 'Cool', value: 'cool' },
      { title: 'Professional', value: 'professional' },
      { title: 'Custom', value: 'custom' }, // Add your theme
    ],
    layout: 'radio',
  },
}
```

### Custom Icon Categories

1. **Add category** to `metadata.json`:

```json
{
  "categories": {
    "custom": {
      "name": "Custom Category",
      "description": "Your custom icon category",
      "icons": [
        {
          "id": "custom-icon",
          "name": "Custom Icon",
          "description": "Your custom icon",
          "category": "custom",
          "tags": ["custom", "special"],
          "lucide": false
        }
      ]
    }
  }
}
```

2. **Update icon mappings** in Sanity Studio

### Custom CSS Overrides

Add custom CSS to override default styles:

```css
/* Override preview mode colors */
:root {
  --preview-primary: #YOUR_COLOR;
  --preview-background: rgba(YOUR_R, YOUR_G, YOUR_B, 0.9);
  --preview-text: #YOUR_TEXT_COLOR;
}

/* Override specific elements */
[data-sanity-edit-field]:hover::before {
  border-color: #YOUR_BORDER_COLOR;
  background: rgba(YOUR_R, YOUR_G, YOUR_B, 0.1);
}

[data-sanity-edit-field]:hover::after {
  background: #YOUR_LABEL_BACKGROUND;
  color: #YOUR_LABEL_TEXT;
}
```

## Troubleshooting

### Common Issues

#### Icons Not Loading
- **Check**: Icon ID exists in registry
- **Check**: SVG content is valid
- **Check**: Network connectivity
- **Solution**: Clear browser cache and reload

#### Theme Not Applying
- **Check**: CSS variables are defined
- **Check**: Theme ID is correct
- **Check**: Element has proper classes
- **Solution**: Check browser console for errors

#### Custom Icons Not Uploading
- **Check**: File is SVG format
- **Check**: File size under 50KB
- **Check**: No script tags in SVG
- **Check**: Sanity write token is valid
- **Solution**: Validate SVG content manually

#### Preview Mode Not Working
- **Check**: URL has `?preview=true` parameter
- **Check**: Password is correct
- **Check**: Preview mode is enabled in Sanity
- **Solution**: Check browser console for JavaScript errors

### Debug Mode

Enable debug mode in Sanity Studio:

1. **Go to Site Settings**
2. **Open Preview Mode Configuration**
3. **Enable Debug Mode**
4. **Check browser console** for detailed logs

### Performance Optimization

- **Icon Loading**: Icons are loaded on-demand
- **Theme Detection**: Cached for performance
- **SVG Optimization**: Automatically sanitized
- **Bundle Size**: Lucide icons are tree-shaken

### Browser Support

- **Modern Browsers**: Full support
- **IE11**: Limited support (no CSS custom properties)
- **Mobile**: Full support with touch interactions
- **Screen Readers**: Full accessibility support

## Migration Guide

### From Emoji Icons

If migrating from emoji-based icons:

1. **Update icon references** in code
2. **Replace emoji strings** with icon IDs
3. **Test icon rendering** in preview mode
4. **Update documentation** and examples

### From Custom Icon System

If migrating from a custom icon system:

1. **Export existing icons** as SVG files
2. **Upload to new system** via admin interface
3. **Update icon references** in code
4. **Test functionality** thoroughly

## Best Practices

### Icon Selection
- **Use semantic icons** that clearly represent content
- **Maintain consistency** across similar content types
- **Consider accessibility** with proper ARIA labels
- **Test on different backgrounds** for visibility

### Theme Configuration
- **Start with neutral theme** as default
- **Enable auto-detection** for best user experience
- **Test custom colors** on various backgrounds
- **Document custom configurations** for team members

### Performance
- **Optimize SVG files** before uploading
- **Use appropriate icon sizes** for context
- **Monitor usage statistics** to identify popular icons
- **Clean up unused icons** regularly

### Accessibility
- **Provide alt text** for custom icons
- **Ensure sufficient contrast** with backgrounds
- **Test with screen readers** for proper announcements
- **Use semantic HTML** for icon containers

---

For additional support or feature requests, please refer to the project documentation or contact the development team.
