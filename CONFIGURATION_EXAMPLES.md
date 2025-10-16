# Configuration Examples & Best Practices

## Overview

This guide provides practical examples and best practices for configuring the icon system and adaptive styling in your hotel website template.

## Table of Contents

1. [Quick Start Examples](#quick-start-examples)
2. [Theme Configuration Examples](#theme-configuration-examples)
3. [Icon Management Examples](#icon-management-examples)
4. [Custom Styling Examples](#custom-styling-examples)
5. [Integration Examples](#integration-examples)
6. [Best Practices](#best-practices)
7. [Common Patterns](#common-patterns)
8. [Troubleshooting Examples](#troubleshooting-examples)

## Quick Start Examples

### Basic Theme Setup

```typescript
// Initialize theme manager
import { themeManager } from './lib/themeConfig';

// Apply neutral theme (works everywhere)
themeManager.applyTheme('neutral');

// Enable auto-detection
themeManager.updateAdaptiveConfig({
  autoDetect: true,
  contrastThreshold: 0.5
});
```

### Basic Icon Setup

```typescript
// Initialize icon manager
import { iconManager } from './lib/iconManager';

// Get available icons
const icons = await iconManager.getAvailableIcons();

// Track icon usage
iconManager.trackIconUsage('type', 'headline-field');
```

### Sanity Studio Configuration

```typescript
// In siteSettings.ts
{
  name: 'previewModeConfig',
  title: 'Preview Mode Configuration',
  type: 'object',
  fields: [
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
        ],
        layout: 'radio',
      },
      initialValue: 'neutral',
    }
  ]
}
```

## Theme Configuration Examples

### Brand-Specific Themes

#### Restaurant Theme
```typescript
// Custom restaurant theme
const restaurantTheme = {
  id: 'restaurant',
  name: 'Restaurant',
  description: 'Warm, inviting colors for restaurant websites',
  colors: {
    primary: '#DC2626', // Red
    primaryHover: '#EF4444',
    background: 'rgba(220, 38, 38, 0.9)',
    text: '#FFFFFF',
    border: '#DC2626',
  },
  cssVariables: {
    '--preview-primary': '#DC2626',
    '--preview-primary-hover': '#EF4444',
    '--preview-background': 'rgba(220, 38, 38, 0.9)',
    '--preview-text': '#FFFFFF',
    '--preview-border': '#DC2626',
  }
};

// Apply restaurant theme
themeManager.applyTheme('restaurant');
```

#### Spa Theme
```typescript
// Custom spa theme
const spaTheme = {
  id: 'spa',
  name: 'Spa',
  description: 'Calming, natural colors for spa websites',
  colors: {
    primary: '#059669', // Green
    primaryHover: '#10B981',
    background: 'rgba(5, 150, 105, 0.9)',
    text: '#FFFFFF',
    border: '#059669',
  },
  cssVariables: {
    '--preview-primary': '#059669',
    '--preview-primary-hover': '#10B981',
    '--preview-background': 'rgba(5, 150, 105, 0.9)',
    '--preview-text': '#FFFFFF',
    '--preview-border': '#059669',
  }
};
```

#### Luxury Theme
```typescript
// Custom luxury theme
const luxuryTheme = {
  id: 'luxury',
  name: 'Luxury',
  description: 'Elegant, sophisticated colors for luxury hotels',
  colors: {
    primary: '#7C3AED', // Purple
    primaryHover: '#8B5CF6',
    background: 'rgba(124, 58, 237, 0.9)',
    text: '#FFFFFF',
    border: '#7C3AED',
  },
  cssVariables: {
    '--preview-primary': '#7C3AED',
    '--preview-primary-hover': '#8B5CF6',
    '--preview-background': 'rgba(124, 58, 237, 0.9)',
    '--preview-text': '#FFFFFF',
    '--preview-border': '#7C3AED',
  }
};
```

### Seasonal Themes

#### Spring Theme
```typescript
const springTheme = {
  id: 'spring',
  name: 'Spring',
  description: 'Fresh, vibrant colors for spring season',
  colors: {
    primary: '#16A34A', // Fresh green
    primaryHover: '#22C55E',
    background: 'rgba(22, 163, 74, 0.9)',
    text: '#FFFFFF',
    border: '#16A34A',
  }
};
```

#### Summer Theme
```typescript
const summerTheme = {
  id: 'summer',
  name: 'Summer',
  description: 'Bright, energetic colors for summer season',
  colors: {
    primary: '#EA580C', // Orange
    primaryHover: '#F97316',
    background: 'rgba(234, 88, 12, 0.9)',
    text: '#FFFFFF',
    border: '#EA580C',
  }
};
```

### Dynamic Theme Switching

```typescript
// Switch themes based on time of day
const getTimeBasedTheme = () => {
  const hour = new Date().getHours();
  
  if (hour >= 6 && hour < 12) {
    return 'warm'; // Morning
  } else if (hour >= 12 && hour < 18) {
    return 'neutral'; // Afternoon
  } else if (hour >= 18 && hour < 22) {
    return 'cool'; // Evening
  } else {
    return 'professional'; // Night
  }
};

// Apply time-based theme
const timeTheme = getTimeBasedTheme();
themeManager.applyTheme(timeTheme);
```

### User Preference Themes

```typescript
// Store user theme preference
const setUserThemePreference = (theme: string) => {
  localStorage.setItem('preferred-theme', theme);
  themeManager.applyTheme(theme);
};

// Load user theme preference
const loadUserThemePreference = () => {
  const preferredTheme = localStorage.getItem('preferred-theme');
  if (preferredTheme) {
    themeManager.applyTheme(preferredTheme);
  }
};

// Theme selector component
const ThemeSelector = () => {
  const themes = themeManager.getAllThemes();
  
  return (
    <select onChange={(e) => setUserThemePreference(e.target.value)}>
      {themes.map(theme => (
        <option key={theme.id} value={theme.id}>
          {theme.name}
        </option>
      ))}
    </select>
  );
};
```

## Icon Management Examples

### Custom Icon Upload

```typescript
// Upload custom icon
const uploadCustomIcon = async (file: File, metadata: any) => {
  const uploadData = {
    file,
    metadata: {
      name: metadata.name,
      description: metadata.description,
      category: metadata.category,
      tags: metadata.tags.split(',').map(tag => tag.trim())
    }
  };
  
  const success = await iconManager.uploadCustomIcon(uploadData);
  
  if (success) {
    console.log('Icon uploaded successfully');
    // Refresh icon list
    await loadIcons();
  } else {
    console.error('Failed to upload icon');
  }
};
```

### Icon Usage Tracking

```typescript
// Track icon usage across the site
const trackIconUsage = (iconId: string, context: string) => {
  iconManager.trackIconUsage(iconId, context);
  
  // Log usage for analytics
  console.log(`Icon ${iconId} used in ${context}`);
};

// Get usage statistics
const getUsageStats = async () => {
  const stats = iconManager.getAllUsageStats();
  const mostUsed = iconManager.getMostUsedIcons(10);
  
  return {
    totalIcons: stats.length,
    mostUsedIcons: mostUsed,
    totalUsage: stats.reduce((sum, stat) => sum + stat.usageCount, 0)
  };
};
```

### Icon Search and Filtering

```typescript
// Search icons
const searchIcons = async (query: string) => {
  const results = await iconManager.searchIcons(query);
  return results;
};

// Filter icons by category
const getIconsByCategory = async (category: string) => {
  const icons = await iconManager.getIconsByCategory(category);
  return icons;
};

// Icon picker component
const IconPicker = ({ onSelect, category }: { onSelect: (iconId: string) => void, category?: string }) => {
  const [icons, setIcons] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    const loadIcons = async () => {
      const allIcons = await iconManager.getAvailableIcons();
      setIcons(allIcons);
    };
    loadIcons();
  }, []);
  
  const filteredIcons = icons.filter(icon => {
    const matchesSearch = icon.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !category || icon.category === category;
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="icon-picker">
      <input
        type="text"
        placeholder="Search icons..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="icon-grid">
        {filteredIcons.map(icon => (
          <div
            key={icon.id}
            className="icon-item"
            onClick={() => onSelect(icon.id)}
          >
            <IconPreview iconId={icon.id} />
            <span>{icon.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
```

## Custom Styling Examples

### CSS Variable Overrides

```css
/* Custom brand colors */
:root {
  --preview-primary: #FF6B35;
  --preview-primary-hover: #FF8C42;
  --preview-background: rgba(255, 107, 53, 0.9);
  --preview-text: #FFFFFF;
  --preview-border: #FF6B35;
  --preview-shadow: rgba(255, 107, 53, 0.3);
}

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

/* Custom border styles */
[data-sanity-edit-field]:hover::before {
  border-radius: 12px;
  border-width: 4px;
  box-shadow: 0 0 20px var(--preview-shadow);
}
```

### Responsive Styling

```css
/* Mobile-specific styles */
@media (max-width: 768px) {
  [data-sanity-edit-field]:hover::after {
    font-size: 11px;
    padding: 4px 8px;
    top: -28px;
  }
  
  [data-sanity-edit-field]:hover::before {
    border-width: 2px;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
  }
}

/* Tablet-specific styles */
@media (min-width: 769px) and (max-width: 1024px) {
  [data-sanity-edit-field]:hover::after {
    font-size: 13px;
    padding: 6px 12px;
  }
}

/* Desktop-specific styles */
@media (min-width: 1025px) {
  [data-sanity-edit-field]:hover::after {
    font-size: 14px;
    padding: 8px 16px;
  }
}
```

### Dark Mode Support

```css
/* Dark mode overrides */
@media (prefers-color-scheme: dark) {
  :root {
    --preview-primary: #60A5FA;
    --preview-primary-hover: #93C5FD;
    --preview-background: rgba(96, 165, 250, 0.9);
    --preview-text: #1F2937;
    --preview-border: #60A5FA;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  :root {
    --preview-primary: #000000;
    --preview-background: #FFFFFF;
    --preview-text: #000000;
    --preview-border: #000000;
  }
}
```

## Integration Examples

### React Component Integration

```tsx
// Icon picker React component
import React, { useState, useEffect } from 'react';
import { iconManager } from '../lib/iconManager';

const IconPicker: React.FC<{
  selectedIconId?: string;
  onIconSelect: (iconId: string) => void;
  category?: string;
}> = ({ selectedIconId, onIconSelect, category }) => {
  const [icons, setIcons] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadIcons = async () => {
      try {
        const allIcons = await iconManager.getAvailableIcons();
        const filteredIcons = category 
          ? allIcons.filter(icon => icon.category === category)
          : allIcons;
        setIcons(filteredIcons);
      } catch (error) {
        console.error('Error loading icons:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadIcons();
  }, [category]);
  
  if (loading) {
    return <div>Loading icons...</div>;
  }
  
  return (
    <div className="icon-picker">
      <div className="icon-grid">
        {icons.map(icon => (
          <div
            key={icon.id}
            className={`icon-item ${selectedIconId === icon.id ? 'selected' : ''}`}
            onClick={() => onIconSelect(icon.id)}
          >
            <IconPreview iconId={icon.id} />
            <span>{icon.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Theme selector React component
const ThemeSelector: React.FC<{
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}> = ({ currentTheme, onThemeChange }) => {
  const themes = [
    { id: 'neutral', name: 'Neutral' },
    { id: 'warm', name: 'Warm' },
    { id: 'cool', name: 'Cool' },
    { id: 'professional', name: 'Professional' },
  ];
  
  return (
    <div className="theme-selector">
      <label>Theme:</label>
      <select
        value={currentTheme}
        onChange={(e) => onThemeChange(e.target.value)}
      >
        {themes.map(theme => (
          <option key={theme.id} value={theme.id}>
            {theme.name}
          </option>
        ))}
      </select>
    </div>
  );
};
```

### Astro Component Integration

```astro
---
// Icon picker Astro component
import { iconManager } from '../lib/iconManager';

const { selectedIconId, onIconSelect, category } = Astro.props;

const icons = await iconManager.getAvailableIcons();
const filteredIcons = category 
  ? icons.filter(icon => icon.category === category)
  : icons;
---

<div class="icon-picker">
  <div class="icon-grid">
    {filteredIcons.map(icon => (
      <div
        class={`icon-item ${selectedIconId === icon.id ? 'selected' : ''}`}
        data-icon-id={icon.id}
        onclick={`onIconSelect('${icon.id}')`}
      >
        <div class="icon-preview" data-icon-id={icon.id}></div>
        <span>{icon.name}</span>
      </div>
    ))}
  </div>
</div>

<script>
  // Load SVG content for each icon
  document.addEventListener('DOMContentLoaded', async () => {
    const iconElements = document.querySelectorAll('[data-icon-id]');
    
    for (const element of iconElements) {
      const iconId = element.getAttribute('data-icon-id');
      if (iconId) {
        try {
          const { iconRegistry } = await import('../lib/iconRegistry');
          const svgContent = await iconRegistry.getIconSVG(iconId);
          if (svgContent) {
            element.innerHTML = svgContent;
          }
        } catch (error) {
          console.error(`Error loading icon ${iconId}:`, error);
        }
      }
    }
  });
</script>
```

### Sanity Studio Integration

```typescript
// Custom Sanity Studio component for theme selection
import React from 'react';
import { StringInputProps, useFormValue } from 'sanity';

const ThemeSelector = (props: StringInputProps) => {
  const themes = [
    { title: 'Neutral', value: 'neutral' },
    { title: 'Warm', value: 'warm' },
    { title: 'Cool', value: 'cool' },
    { title: 'Professional', value: 'professional' },
  ];
  
  return (
    <div>
      <label>Select Theme:</label>
      <select
        value={props.value || 'neutral'}
        onChange={(e) => props.onChange(e.target.value)}
      >
        {themes.map(theme => (
          <option key={theme.value} value={theme.value}>
            {theme.title}
          </option>
        ))}
      </select>
    </div>
  );
};

// Use in schema
{
  name: 'defaultTheme',
  title: 'Default Theme',
  type: 'string',
  components: {
    input: ThemeSelector,
  },
  initialValue: 'neutral',
}
```

## Best Practices

### Performance Optimization

```typescript
// Lazy load icons
const loadIconsOnDemand = async (iconId: string) => {
  const { iconRegistry } = await import('./iconRegistry');
  return await iconRegistry.getIconSVG(iconId);
};

// Cache theme calculations
const themeCache = new Map();

const getCachedTheme = (element: Element) => {
  const elementId = element.id || element.className;
  
  if (themeCache.has(elementId)) {
    return themeCache.get(elementId);
  }
  
  const theme = themeManager.detectOptimalTheme(element);
  themeCache.set(elementId, theme);
  
  return theme;
};

// Debounce theme switching
const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(null, args), wait);
  };
};

const debouncedThemeSwitch = debounce((theme: string) => {
  themeManager.applyTheme(theme);
}, 300);
```

### Error Handling

```typescript
// Robust error handling for icon loading
const loadIconWithFallback = async (iconId: string): Promise<string> => {
  try {
    const { iconRegistry } = await import('./iconRegistry');
    const svgContent = await iconRegistry.getIconSVG(iconId);
    
    if (svgContent) {
      return svgContent;
    }
    
    // Fallback to default icon
    return await iconRegistry.getIconSVG('type');
  } catch (error) {
    console.error(`Error loading icon ${iconId}:`, error);
    
    // Return fallback icon
    return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/></svg>';
  }
};

// Error boundary for React components
class IconErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }
  
  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Icon component error:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <div>Error loading icon</div>;
    }
    
    return this.props.children;
  }
}
```

### Accessibility

```typescript
// Accessible icon implementation
const AccessibleIcon = ({ iconId, label, size = 16 }: {
  iconId: string;
  label: string;
  size?: number;
}) => {
  const [svgContent, setSvgContent] = useState<string>('');
  
  useEffect(() => {
    const loadIcon = async () => {
      try {
        const { iconRegistry } = await import('./iconRegistry');
        const svg = await iconRegistry.getIconSVG(iconId);
        setSvgContent(svg || '');
      } catch (error) {
        console.error('Error loading icon:', error);
      }
    };
    
    loadIcon();
  }, [iconId]);
  
  return (
    <div
      role="img"
      aria-label={label}
      style={{ width: size, height: size }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

// Keyboard navigation for icon picker
const KeyboardNavigableIconPicker = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [icons, setIcons] = useState([]);
  
  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowRight':
        setSelectedIndex(prev => Math.min(prev + 1, icons.length - 1));
        break;
      case 'ArrowLeft':
        setSelectedIndex(prev => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        if (icons[selectedIndex]) {
          onIconSelect(icons[selectedIndex].id);
        }
        break;
    }
  };
  
  return (
    <div
      className="icon-picker"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {icons.map((icon, index) => (
        <div
          key={icon.id}
          className={`icon-item ${index === selectedIndex ? 'selected' : ''}`}
          tabIndex={index === selectedIndex ? 0 : -1}
        >
          <IconPreview iconId={icon.id} />
          <span>{icon.name}</span>
        </div>
      ))}
    </div>
  );
};
```

## Common Patterns

### Theme-Aware Components

```typescript
// Theme-aware component
const ThemeAwareComponent = () => {
  const [currentTheme, setCurrentTheme] = useState('neutral');
  
  useEffect(() => {
    const theme = themeManager.getCurrentTheme();
    setCurrentTheme(theme?.id || 'neutral');
  }, []);
  
  const themeColors = {
    neutral: { primary: '#374151', background: '#F9FAFB' },
    warm: { primary: '#D97706', background: '#FEF3C7' },
    cool: { primary: '#0D9488', background: '#CCFBF1' },
    professional: { primary: '#1E40AF', background: '#DBEAFE' },
  };
  
  const colors = themeColors[currentTheme];
  
  return (
    <div
      style={{
        backgroundColor: colors.background,
        color: colors.primary,
      }}
    >
      <h2>Theme: {currentTheme}</h2>
      <p>This component adapts to the current theme</p>
    </div>
  );
};
```

### Icon Usage Analytics

```typescript
// Icon usage analytics
const IconAnalytics = () => {
  const [stats, setStats] = useState(null);
  
  useEffect(() => {
    const loadStats = async () => {
      const usageStats = iconManager.getAllUsageStats();
      const mostUsed = iconManager.getMostUsedIcons(10);
      
      setStats({
        totalIcons: usageStats.length,
        mostUsedIcons: mostUsed,
        totalUsage: usageStats.reduce((sum, stat) => sum + stat.usageCount, 0),
      });
    };
    
    loadStats();
  }, []);
  
  if (!stats) return <div>Loading analytics...</div>;
  
  return (
    <div className="icon-analytics">
      <h3>Icon Usage Statistics</h3>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{stats.totalIcons}</div>
          <div className="stat-label">Total Icons</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.totalUsage}</div>
          <div className="stat-label">Total Usage</div>
        </div>
      </div>
      
      <h4>Most Used Icons</h4>
      <div className="most-used-list">
        {stats.mostUsedIcons.map(icon => (
          <div key={icon.iconId} className="usage-item">
            <IconPreview iconId={icon.iconId} />
            <span>{icon.iconId}</span>
            <span>{icon.usageCount} uses</span>
          </div>
        ))}
      </div>
    </div>
  );
};
```

### Dynamic Theme Switching

```typescript
// Dynamic theme switching based on content
const DynamicThemeSwitcher = () => {
  const [currentTheme, setCurrentTheme] = useState('neutral');
  
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY;
      
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 0 && rect.bottom > 0) {
          const optimalTheme = themeManager.detectOptimalTheme(section);
          if (optimalTheme !== currentTheme) {
            setCurrentTheme(optimalTheme);
            themeManager.applyTheme(optimalTheme);
          }
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentTheme]);
  
  return (
    <div className="theme-indicator">
      Current theme: {currentTheme}
    </div>
  );
};
```

## Troubleshooting Examples

### Common Issues and Solutions

```typescript
// Issue: Icons not loading
const debugIconLoading = async (iconId: string) => {
  console.log(`Debugging icon loading for: ${iconId}`);
  
  try {
    // Check if icon exists in registry
    const { iconManager } = await import('./iconManager');
    const icon = await iconManager.getIconById(iconId);
    
    if (!icon) {
      console.error(`Icon ${iconId} not found in registry`);
      return;
    }
    
    console.log('Icon found:', icon);
    
    // Check if SVG content can be loaded
    const { iconRegistry } = await import('./iconRegistry');
    const svgContent = await iconRegistry.getIconSVG(iconId);
    
    if (!svgContent) {
      console.error(`SVG content not available for ${iconId}`);
      return;
    }
    
    console.log('SVG content loaded:', svgContent.substring(0, 100) + '...');
    
  } catch (error) {
    console.error('Error debugging icon loading:', error);
  }
};

// Issue: Theme not applying
const debugThemeApplication = (themeId: string) => {
  console.log(`Debugging theme application for: ${themeId}`);
  
  try {
    // Check if theme exists
    const theme = themeManager.getTheme(themeId);
    if (!theme) {
      console.error(`Theme ${themeId} not found`);
      return;
    }
    
    console.log('Theme found:', theme);
    
    // Check CSS variables
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    
    const cssVariables = {
      primary: computedStyle.getPropertyValue('--preview-primary'),
      background: computedStyle.getPropertyValue('--preview-background'),
      text: computedStyle.getPropertyValue('--preview-text'),
    };
    
    console.log('CSS variables:', cssVariables);
    
    // Check if variables are empty
    Object.entries(cssVariables).forEach(([key, value]) => {
      if (!value) {
        console.error(`CSS variable --preview-${key} is empty`);
      }
    });
    
  } catch (error) {
    console.error('Error debugging theme application:', error);
  }
};

// Issue: Custom colors not overriding
const debugCustomColors = () => {
  console.log('Debugging custom color overrides');
  
  try {
    // Check if custom overrides are applied
    const config = themeManager.getAdaptiveConfig();
    console.log('Adaptive config:', config);
    
    // Check CSS variables
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    
    const customVariables = {
      primary: computedStyle.getPropertyValue('--preview-primary'),
      background: computedStyle.getPropertyValue('--preview-background'),
      text: computedStyle.getPropertyValue('--preview-text'),
    };
    
    console.log('Current CSS variables:', customVariables);
    
    // Apply test overrides
    themeManager.applyCustomOverrides({
      primary: '#FF0000',
      background: 'rgba(255, 0, 0, 0.9)',
      text: '#FFFFFF',
    });
    
    // Check if overrides are applied
    const updatedVariables = {
      primary: computedStyle.getPropertyValue('--preview-primary'),
      background: computedStyle.getPropertyValue('--preview-background'),
      text: computedStyle.getPropertyValue('--preview-text'),
    };
    
    console.log('Updated CSS variables:', updatedVariables);
    
  } catch (error) {
    console.error('Error debugging custom colors:', error);
  }
};
```

### Performance Debugging

```typescript
// Performance monitoring
const monitorPerformance = () => {
  const startTime = performance.now();
  
  // Monitor icon loading performance
  const iconLoadTimes = new Map();
  
  const originalGetIconSVG = iconRegistry.getIconSVG;
  iconRegistry.getIconSVG = async function(iconId: string) {
    const iconStartTime = performance.now();
    const result = await originalGetIconSVG.call(this, iconId);
    const iconEndTime = performance.now();
    
    iconLoadTimes.set(iconId, iconEndTime - iconStartTime);
    
    return result;
  };
  
  // Monitor theme switching performance
  const themeSwitchTimes = new Map();
  
  const originalApplyTheme = themeManager.applyTheme;
  themeManager.applyTheme = function(themeId: string) {
    const themeStartTime = performance.now();
    const result = originalApplyTheme.call(this, themeId);
    const themeEndTime = performance.now();
    
    themeSwitchTimes.set(themeId, themeEndTime - themeStartTime);
    
    return result;
  };
  
  // Log performance metrics
  setTimeout(() => {
    console.log('Performance Metrics:');
    console.log('Icon load times:', Object.fromEntries(iconLoadTimes));
    console.log('Theme switch times:', Object.fromEntries(themeSwitchTimes));
    
    const totalTime = performance.now() - startTime;
    console.log(`Total monitoring time: ${totalTime}ms`);
  }, 5000);
};
```

---

This guide provides comprehensive examples and best practices for implementing and customizing the icon system and adaptive styling in your hotel website template. Use these examples as starting points and adapt them to your specific needs.
