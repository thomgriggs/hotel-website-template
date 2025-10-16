/**
 * Theme Configuration System
 * Manages adaptive color themes for preview mode
 */

export interface ThemeColors {
  // Primary colors
  primary: string;
  primaryHover: string;
  primaryLight: string;
  
  // Background colors
  background: string;
  backgroundHover: string;
  backgroundLight: string;
  
  // Text colors
  text: string;
  textSecondary: string;
  textInverse: string;
  
  // Border colors
  border: string;
  borderLight: string;
  borderStrong: string;
  
  // Status colors
  success: string;
  warning: string;
  error: string;
  info: string;
  
  // Shadow colors
  shadow: string;
  shadowLight: string;
}

export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  colors: ThemeColors;
  cssVariables: Record<string, string>;
}

export interface AdaptiveThemeConfig {
  currentTheme: string;
  autoDetect: boolean;
  customOverrides: Partial<ThemeColors>;
  contrastThreshold: number;
}

class ThemeManager {
  private themes: Map<string, ThemeConfig> = new Map();
  private currentTheme: string = 'neutral';
  private adaptiveConfig: AdaptiveThemeConfig = {
    currentTheme: 'neutral',
    autoDetect: true,
    customOverrides: {},
    contrastThreshold: 0.5
  };

  constructor() {
    this.initializeThemes();
    this.applyTheme(this.currentTheme);
  }

  /**
   * Initialize all available themes
   */
  private initializeThemes(): void {
    // Neutral Theme (Default)
    this.themes.set('neutral', {
      id: 'neutral',
      name: 'Neutral',
      description: 'Dark gray with high contrast - works on any background',
      colors: {
        primary: '#374151',
        primaryHover: '#4B5563',
        primaryLight: '#6B7280',
        background: 'rgba(55, 65, 81, 0.9)',
        backgroundHover: 'rgba(55, 65, 81, 0.95)',
        backgroundLight: 'rgba(55, 65, 81, 0.1)',
        text: '#FFFFFF',
        textSecondary: '#D1D5DB',
        textInverse: '#111827',
        border: '#374151',
        borderLight: '#6B7280',
        borderStrong: '#111827',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
        shadow: 'rgba(0, 0, 0, 0.3)',
        shadowLight: 'rgba(0, 0, 0, 0.1)'
      },
      cssVariables: {
        '--preview-primary': '#374151',
        '--preview-primary-hover': '#4B5563',
        '--preview-primary-light': '#6B7280',
        '--preview-background': 'rgba(55, 65, 81, 0.9)',
        '--preview-background-hover': 'rgba(55, 65, 81, 0.95)',
        '--preview-background-light': 'rgba(55, 65, 81, 0.1)',
        '--preview-text': '#FFFFFF',
        '--preview-text-secondary': '#D1D5DB',
        '--preview-text-inverse': '#111827',
        '--preview-border': '#374151',
        '--preview-border-light': '#6B7280',
        '--preview-border-strong': '#111827',
        '--preview-shadow': 'rgba(0, 0, 0, 0.3)',
        '--preview-shadow-light': 'rgba(0, 0, 0, 0.1)'
      }
    });

    // Warm Theme
    this.themes.set('warm', {
      id: 'warm',
      name: 'Warm',
      description: 'Amber and bronze accents - perfect for warm backgrounds',
      colors: {
        primary: '#D97706',
        primaryHover: '#F59E0B',
        primaryLight: '#FCD34D',
        background: 'rgba(217, 119, 6, 0.9)',
        backgroundHover: 'rgba(217, 119, 6, 0.95)',
        backgroundLight: 'rgba(217, 119, 6, 0.1)',
        text: '#FFFFFF',
        textSecondary: '#FEF3C7',
        textInverse: '#92400E',
        border: '#D97706',
        borderLight: '#F59E0B',
        borderStrong: '#92400E',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
        shadow: 'rgba(146, 64, 14, 0.3)',
        shadowLight: 'rgba(146, 64, 14, 0.1)'
      },
      cssVariables: {
        '--preview-primary': '#D97706',
        '--preview-primary-hover': '#F59E0B',
        '--preview-primary-light': '#FCD34D',
        '--preview-background': 'rgba(217, 119, 6, 0.9)',
        '--preview-background-hover': 'rgba(217, 119, 6, 0.95)',
        '--preview-background-light': 'rgba(217, 119, 6, 0.1)',
        '--preview-text': '#FFFFFF',
        '--preview-text-secondary': '#FEF3C7',
        '--preview-text-inverse': '#92400E',
        '--preview-border': '#D97706',
        '--preview-border-light': '#F59E0B',
        '--preview-border-strong': '#92400E',
        '--preview-shadow': 'rgba(146, 64, 14, 0.3)',
        '--preview-shadow-light': 'rgba(146, 64, 14, 0.1)'
      }
    });

    // Cool Theme
    this.themes.set('cool', {
      id: 'cool',
      name: 'Cool',
      description: 'Teal and cyan accents - ideal for cool backgrounds',
      colors: {
        primary: '#0D9488',
        primaryHover: '#14B8A6',
        primaryLight: '#5EEAD4',
        background: 'rgba(13, 148, 136, 0.9)',
        backgroundHover: 'rgba(13, 148, 136, 0.95)',
        backgroundLight: 'rgba(13, 148, 136, 0.1)',
        text: '#FFFFFF',
        textSecondary: '#CCFBF1',
        textInverse: '#134E4A',
        border: '#0D9488',
        borderLight: '#14B8A6',
        borderStrong: '#134E4A',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
        shadow: 'rgba(19, 78, 74, 0.3)',
        shadowLight: 'rgba(19, 78, 74, 0.1)'
      },
      cssVariables: {
        '--preview-primary': '#0D9488',
        '--preview-primary-hover': '#14B8A6',
        '--preview-primary-light': '#5EEAD4',
        '--preview-background': 'rgba(13, 148, 136, 0.9)',
        '--preview-background-hover': 'rgba(13, 148, 136, 0.95)',
        '--preview-background-light': 'rgba(13, 148, 136, 0.1)',
        '--preview-text': '#FFFFFF',
        '--preview-text-secondary': '#CCFBF1',
        '--preview-text-inverse': '#134E4A',
        '--preview-border': '#0D9488',
        '--preview-border-light': '#14B8A6',
        '--preview-border-strong': '#134E4A',
        '--preview-shadow': 'rgba(19, 78, 74, 0.3)',
        '--preview-shadow-light': 'rgba(19, 78, 74, 0.1)'
      }
    });

    // Professional Theme
    this.themes.set('professional', {
      id: 'professional',
      name: 'Professional',
      description: 'Navy blue accents - perfect for corporate environments',
      colors: {
        primary: '#1E40AF',
        primaryHover: '#2563EB',
        primaryLight: '#60A5FA',
        background: 'rgba(30, 64, 175, 0.9)',
        backgroundHover: 'rgba(30, 64, 175, 0.95)',
        backgroundLight: 'rgba(30, 64, 175, 0.1)',
        text: '#FFFFFF',
        textSecondary: '#DBEAFE',
        textInverse: '#1E3A8A',
        border: '#1E40AF',
        borderLight: '#2563EB',
        borderStrong: '#1E3A8A',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
        shadow: 'rgba(30, 58, 138, 0.3)',
        shadowLight: 'rgba(30, 58, 138, 0.1)'
      },
      cssVariables: {
        '--preview-primary': '#1E40AF',
        '--preview-primary-hover': '#2563EB',
        '--preview-primary-light': '#60A5FA',
        '--preview-background': 'rgba(30, 64, 175, 0.9)',
        '--preview-background-hover': 'rgba(30, 64, 175, 0.95)',
        '--preview-background-light': 'rgba(30, 64, 175, 0.1)',
        '--preview-text': '#FFFFFF',
        '--preview-text-secondary': '#DBEAFE',
        '--preview-text-inverse': '#1E3A8A',
        '--preview-border': '#1E40AF',
        '--preview-border-light': '#2563EB',
        '--preview-border-strong': '#1E3A8A',
        '--preview-shadow': 'rgba(30, 58, 138, 0.3)',
        '--preview-shadow-light': 'rgba(30, 58, 138, 0.1)'
      }
    });
  }

  /**
   * Apply a theme by ID
   */
  applyTheme(themeId: string): void {
    const theme = this.themes.get(themeId);
    if (!theme) {
      console.warn(`Theme "${themeId}" not found, using neutral theme`);
      this.applyTheme('neutral');
      return;
    }

    this.currentTheme = themeId;
    this.adaptiveConfig.currentTheme = themeId;

    // Apply CSS variables to document root
    const root = document.documentElement;
    Object.entries(theme.cssVariables).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    console.log(`Applied theme: ${theme.name}`);
  }

  /**
   * Get current theme
   */
  getCurrentTheme(): ThemeConfig | null {
    return this.themes.get(this.currentTheme) || null;
  }

  /**
   * Get all available themes
   */
  getAllThemes(): ThemeConfig[] {
    return Array.from(this.themes.values());
  }

  /**
   * Get theme by ID
   */
  getTheme(themeId: string): ThemeConfig | null {
    return this.themes.get(themeId) || null;
  }

  /**
   * Detect optimal theme based on background color
   */
  detectOptimalTheme(element: Element): string {
    if (!this.adaptiveConfig.autoDetect) {
      return this.currentTheme;
    }

    const backgroundColor = this.getBackgroundColor(element);
    const luminance = this.getLuminance(backgroundColor);
    
    // Determine theme based on background luminance and color temperature
    if (luminance < 0.3) {
      // Dark backgrounds - use lighter themes
      return this.detectColorTemperature(backgroundColor) === 'warm' ? 'warm' : 'cool';
    } else if (luminance > 0.7) {
      // Light backgrounds - use darker themes
      return this.detectColorTemperature(backgroundColor) === 'warm' ? 'cool' : 'professional';
    } else {
      // Medium backgrounds - use neutral or professional
      return 'neutral';
    }
  }

  /**
   * Get background color of an element
   */
  private getBackgroundColor(element: Element): string {
    const computedStyle = window.getComputedStyle(element);
    let backgroundColor = computedStyle.backgroundColor;
    
    // If background is transparent, check parent elements
    if (backgroundColor === 'rgba(0, 0, 0, 0)' || backgroundColor === 'transparent') {
      let parent = element.parentElement;
      while (parent && (backgroundColor === 'rgba(0, 0, 0, 0)' || backgroundColor === 'transparent')) {
        backgroundColor = window.getComputedStyle(parent).backgroundColor;
        parent = parent.parentElement;
      }
    }
    
    return backgroundColor || '#FFFFFF';
  }

  /**
   * Calculate luminance of a color
   */
  private getLuminance(color: string): number {
    const rgb = this.parseColor(color);
    if (!rgb) return 0.5;
    
    // Convert to relative luminance
    const [r, g, b] = rgb.map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  /**
   * Detect color temperature (warm/cool)
   */
  private detectColorTemperature(color: string): 'warm' | 'cool' {
    const rgb = this.parseColor(color);
    if (!rgb) return 'neutral';
    
    const [r, g, b] = rgb;
    
    // Simple heuristic: more red/orange = warm, more blue/cyan = cool
    if (r > g && r > b) return 'warm';
    if (b > r && b > g) return 'cool';
    if (g > r && g > b) return 'warm'; // Green tends toward warm
    
    return 'neutral';
  }

  /**
   * Parse color string to RGB values
   */
  private parseColor(color: string): [number, number, number] | null {
    // Handle rgb() format
    const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (rgbMatch) {
      return [parseInt(rgbMatch[1]), parseInt(rgbMatch[2]), parseInt(rgbMatch[3])];
    }
    
    // Handle rgba() format
    const rgbaMatch = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*[\d.]+\)/);
    if (rgbaMatch) {
      return [parseInt(rgbaMatch[1]), parseInt(rgbaMatch[2]), parseInt(rgbaMatch[3])];
    }
    
    // Handle hex format
    const hexMatch = color.match(/^#([A-Fa-f0-9]{6})$/);
    if (hexMatch) {
      const hex = hexMatch[1];
      return [
        parseInt(hex.substr(0, 2), 16),
        parseInt(hex.substr(2, 2), 16),
        parseInt(hex.substr(4, 2), 16)
      ];
    }
    
    return null;
  }

  /**
   * Update adaptive configuration
   */
  updateAdaptiveConfig(config: Partial<AdaptiveThemeConfig>): void {
    this.adaptiveConfig = { ...this.adaptiveConfig, ...config };
  }

  /**
   * Get adaptive configuration
   */
  getAdaptiveConfig(): AdaptiveThemeConfig {
    return { ...this.adaptiveConfig };
  }

  /**
   * Apply custom color overrides
   */
  applyCustomOverrides(overrides: Partial<ThemeColors>): void {
    const currentTheme = this.getCurrentTheme();
    if (!currentTheme) return;

    const root = document.documentElement;
    
    // Apply overrides as CSS variables
    Object.entries(overrides).forEach(([key, value]) => {
      if (value) {
        const cssVar = `--preview-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
        root.style.setProperty(cssVar, value);
      }
    });
  }
}

// Export singleton instance
export const themeManager = new ThemeManager();
export default themeManager;
