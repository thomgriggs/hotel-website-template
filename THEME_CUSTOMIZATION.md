# Theme Customization Guide

## Overview

This guide covers how to customize the adaptive styling system for preview mode, including theme configuration, color customization, and advanced styling options.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Theme Configuration](#theme-configuration)
3. [Color Customization](#color-customization)
4. [Advanced Styling](#advanced-styling)
5. [CSS Variables Reference](#css-variables-reference)
6. [Theme Examples](#theme-examples)
7. [Best Practices](#best-practices)

## Quick Start

### Basic Theme Selection

1. **Open Sanity Studio**
2. **Navigate to Site Settings**
3. **Open Preview Mode Configuration**
4. **Select Default Theme**:
   - Neutral (works everywhere)
   - Warm (for warm backgrounds)
   - Cool (for cool backgrounds)
   - Professional (for corporate sites)

### Enable Auto-Detection

For automatic theme switching based on content:

1. **Enable Auto-detect Theme**
2. **Set Contrast Threshold** (0.5 recommended)
3. **Test on different page sections**

## Theme Configuration

### Available Themes

#### Neutral Theme
```css
--preview-primary: #374151;
--preview-primary-hover: #4B5563;
--preview-background: rgba(55, 65, 81, 0.9);
--preview-text: #FFFFFF;
--preview-border: #374151;
```

**Best for**: Any background color, high contrast needs

#### Warm Theme
```css
--preview-primary: #D97706;
--preview-primary-hover: #F59E0B;
--preview-background: rgba(217, 119, 6, 0.9);
--preview-text: #FFFFFF;
--preview-border: #D97706;
```

**Best for**: Warm backgrounds (beige, cream, orange, red)

#### Cool Theme
```css
--preview-primary: #0D9488;
--preview-primary-hover: #14B8A6;
--preview-background: rgba(13, 148, 136, 0.9);
--preview-text: #FFFFFF;
--preview-border: #0D9488;
```

**Best for**: Cool backgrounds (blue, green, gray, purple)

#### Professional Theme
```css
--preview-primary: #1E40AF;
--preview-primary-hover: #2563EB;
--preview-background: rgba(30, 64, 175, 0.9);
--preview-text: #FFFFFF;
--preview-border: #1E40AF;
```

**Best for**: Corporate environments, professional websites

### Theme Selection Logic

The auto-detection system uses this logic:

```typescript
if (luminance < 0.3) {
  // Dark backgrounds - use lighter themes
  return colorTemperature === 'warm' ? 'warm' : 'cool';
} else if (luminance > 0.7) {
  // Light backgrounds - use darker themes
  return colorTemperature === 'warm' ? 'cool' : 'professional';
} else {
  // Medium backgrounds - use neutral
  return 'neutral';
}
```

## Color Customization

### Custom Color Overrides

Override any theme color in Sanity Studio:

1. **Open Preview Mode Configuration**
2. **Expand Custom Colors**
3. **Set desired colors**:
   - Primary Color
   - Background Color
   - Text Color
   - Border Color

### Programmatic Color Overrides

```typescript
// Apply custom colors
themeManager.applyCustomOverrides({
  primary: '#FF6B35',
  primaryHover: '#FF8C42',
  background: 'rgba(255, 107, 53, 0.9)',
  text: '#FFFFFF',
  border: '#FF6B35'
});
```

### Color Format Guidelines

- **Hex Colors**: Use 6-digit format (`#FF6B35`)
- **RGBA Colors**: Include alpha for backgrounds (`rgba(255, 107, 53, 0.9)`)
- **HSL Colors**: Supported for advanced users (`hsl(20, 100%, 60%)`)

## Advanced Styling

### Custom CSS Overrides

Add custom CSS to override default styles:

```css
/* Override preview mode colors */
:root {
  --preview-primary: #YOUR_COLOR;
  --preview-primary-hover: #YOUR_HOVER_COLOR;
  --preview-background: rgba(YOUR_R, YOUR_G, YOUR_B, 0.9);
  --preview-text: #YOUR_TEXT_COLOR;
  --preview-border: #YOUR_BORDER_COLOR;
  --preview-shadow: rgba(0, 0, 0, 0.3);
}

/* Override specific elements */
[data-sanity-edit-field]:hover::before {
  border-color: var(--preview-primary);
  background: var(--preview-background-light);
  border-radius: 8px; /* Custom border radius */
}

[data-sanity-edit-field]:hover::after {
  background: var(--preview-background);
  color: var(--preview-text);
  font-weight: 700; /* Custom font weight */
  text-transform: uppercase; /* Custom text transform */
}
```

### Animation Customization

```css
/* Custom animations */
@keyframes customSlideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

[data-sanity-edit-field]:hover::after {
  animation: customSlideIn 0.3s ease;
}

/* Custom transitions */
[data-sanity-edit-field] {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Responsive Styling

```css
/* Mobile-specific styles */
@media (max-width: 768px) {
  [data-sanity-edit-field]:hover::after {
    font-size: 11px;
    padding: 4px 8px;
  }
  
  [data-sanity-edit-field]:hover::before {
    border-width: 2px;
  }
}

/* Tablet-specific styles */
@media (min-width: 769px) and (max-width: 1024px) {
  [data-sanity-edit-field]:hover::after {
    font-size: 13px;
    padding: 6px 12px;
  }
}
```

## CSS Variables Reference

### Core Variables

| Variable | Description | Default Value |
|----------|-------------|---------------|
| `--preview-primary` | Primary color for borders and accents | `#374151` |
| `--preview-primary-hover` | Hover state for primary color | `#4B5563` |
| `--preview-primary-light` | Light variant of primary color | `#6B7280` |
| `--preview-background` | Background color for labels | `rgba(55, 65, 81, 0.9)` |
| `--preview-background-hover` | Hover background color | `rgba(55, 65, 81, 0.95)` |
| `--preview-background-light` | Light background color | `rgba(55, 65, 81, 0.1)` |
| `--preview-text` | Primary text color | `#FFFFFF` |
| `--preview-text-secondary` | Secondary text color | `#D1D5DB` |
| `--preview-text-inverse` | Inverse text color | `#111827` |
| `--preview-border` | Border color | `#374151` |
| `--preview-border-light` | Light border color | `#6B7280` |
| `--preview-border-strong` | Strong border color | `#111827` |
| `--preview-shadow` | Shadow color | `rgba(0, 0, 0, 0.3)` |
| `--preview-shadow-light` | Light shadow color | `rgba(0, 0, 0, 0.1)` |

### Status Colors

| Variable | Description | Default Value |
|----------|-------------|---------------|
| `--preview-success` | Success state color | `#10B981` |
| `--preview-warning` | Warning state color | `#F59E0B` |
| `--preview-error` | Error state color | `#EF4444` |
| `--preview-info` | Info state color | `#3B82F6` |

## Theme Examples

### Brand-Specific Themes

#### Restaurant Theme
```css
:root {
  --preview-primary: #DC2626; /* Red */
  --preview-primary-hover: #EF4444;
  --preview-background: rgba(220, 38, 38, 0.9);
  --preview-text: #FFFFFF;
  --preview-border: #DC2626;
}
```

#### Spa Theme
```css
:root {
  --preview-primary: #059669; /* Green */
  --preview-primary-hover: #10B981;
  --preview-background: rgba(5, 150, 105, 0.9);
  --preview-text: #FFFFFF;
  --preview-border: #059669;
}
```

#### Luxury Theme
```css
:root {
  --preview-primary: #7C3AED; /* Purple */
  --preview-primary-hover: #8B5CF6;
  --preview-background: rgba(124, 58, 237, 0.9);
  --preview-text: #FFFFFF;
  --preview-border: #7C3AED;
}
```

### Seasonal Themes

#### Spring Theme
```css
:root {
  --preview-primary: #16A34A; /* Fresh green */
  --preview-background: rgba(22, 163, 74, 0.9);
  --preview-text: #FFFFFF;
}
```

#### Summer Theme
```css
:root {
  --preview-primary: #EA580C; /* Orange */
  --preview-background: rgba(234, 88, 12, 0.9);
  --preview-text: #FFFFFF;
}
```

#### Autumn Theme
```css
:root {
  --preview-primary: #D97706; /* Amber */
  --preview-background: rgba(217, 119, 6, 0.9);
  --preview-text: #FFFFFF;
}
```

#### Winter Theme
```css
:root {
  --preview-primary: #0EA5E9; /* Sky blue */
  --preview-background: rgba(14, 165, 233, 0.9);
  --preview-text: #FFFFFF;
}
```

## Best Practices

### Color Selection

1. **Ensure Sufficient Contrast**
   - Use tools like WebAIM Contrast Checker
   - Aim for WCAG AA compliance (4.5:1 ratio)
   - Test on various backgrounds

2. **Consider Brand Colors**
   - Use brand colors as primary colors
   - Ensure colors work across all content types
   - Test with different content backgrounds

3. **Maintain Consistency**
   - Use consistent color relationships
   - Follow established design patterns
   - Document color choices for team members

### Theme Testing

1. **Test on All Page Types**
   - Homepage with hero images
   - Content pages with text
   - Gallery pages with images
   - Contact pages with forms

2. **Test Different Content Backgrounds**
   - Light backgrounds
   - Dark backgrounds
   - Colored backgrounds
   - Image backgrounds

3. **Test Accessibility**
   - Screen reader compatibility
   - Keyboard navigation
   - High contrast mode
   - Color blindness considerations

### Performance Considerations

1. **Minimize CSS Overrides**
   - Use CSS variables when possible
   - Avoid complex selectors
   - Keep custom CSS minimal

2. **Optimize Color Calculations**
   - Cache theme detection results
   - Use efficient color algorithms
   - Minimize DOM queries

3. **Test on Different Devices**
   - Desktop browsers
   - Mobile devices
   - Tablets
   - Different screen sizes

### Maintenance

1. **Document Custom Themes**
   - Keep a record of custom colors
   - Document use cases
   - Maintain style guides

2. **Regular Testing**
   - Test after content updates
   - Verify theme switching works
   - Check for visual regressions

3. **Team Communication**
   - Share theme configurations
   - Train team members on customization
   - Establish review processes

## Troubleshooting

### Common Issues

#### Colors Not Applying
- Check CSS variable syntax
- Verify color format (hex, rgba, hsl)
- Ensure proper CSS specificity
- Check browser developer tools

#### Theme Not Switching
- Verify auto-detection is enabled
- Check contrast threshold setting
- Test on different backgrounds
- Review browser console for errors

#### Custom Colors Overriding Theme
- Check CSS cascade order
- Use `!important` sparingly
- Verify variable definitions
- Test in different browsers

### Debug Mode

Enable debug mode in Sanity Studio to see:
- Theme detection logs
- Color calculation details
- Performance metrics
- Error messages

### Browser Support

- **Modern Browsers**: Full support
- **IE11**: Limited support (no CSS custom properties)
- **Safari**: Full support
- **Mobile**: Full support

---

For additional customization options or advanced use cases, refer to the main documentation or contact the development team.
