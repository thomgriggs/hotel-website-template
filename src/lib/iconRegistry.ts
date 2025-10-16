/**
 * Icon Registry Service
 * Central management for all icons in the system
 */

export interface IconMetadata {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  lucide: boolean;
  custom?: boolean;
  uploadDate?: string;
  fileSize?: number;
}

export interface IconCategory {
  name: string;
  description: string;
  icons: IconMetadata[];
}

export interface IconRegistry {
  version: string;
  lastUpdated: string;
  categories: Record<string, IconCategory>;
  customIcons: IconMetadata[];
  defaultMappings: Record<string, string>;
}

class IconRegistryService {
  private registry: IconRegistry | null = null;
  private readonly registryPath = '/icons/metadata.json';

  /**
   * Load the icon registry from the metadata file
   */
  async loadRegistry(): Promise<IconRegistry> {
    if (this.registry) {
      return this.registry;
    }

    try {
      const response = await fetch(this.registryPath);
      if (!response.ok) {
        throw new Error(`Failed to load icon registry: ${response.statusText}`);
      }
      this.registry = await response.json();
      return this.registry;
    } catch (error) {
      console.error('Error loading icon registry:', error);
      // Return a minimal registry as fallback
      return this.getFallbackRegistry();
    }
  }

  /**
   * Get all available icons
   */
  async getAllIcons(): Promise<IconMetadata[]> {
    const registry = await this.loadRegistry();
    const allIcons: IconMetadata[] = [];

    // Add built-in icons from categories
    Object.values(registry.categories).forEach(category => {
      allIcons.push(...category.icons);
    });

    // Add custom icons
    allIcons.push(...registry.customIcons);

    return allIcons;
  }

  /**
   * Get icons by category
   */
  async getIconsByCategory(categoryId: string): Promise<IconMetadata[]> {
    const registry = await this.loadRegistry();
    const category = registry.categories[categoryId];
    return category ? category.icons : [];
  }

  /**
   * Get icon by ID
   */
  async getIconById(iconId: string): Promise<IconMetadata | null> {
    const allIcons = await this.getAllIcons();
    return allIcons.find(icon => icon.id === iconId) || null;
  }

  /**
   * Search icons by query
   */
  async searchIcons(query: string): Promise<IconMetadata[]> {
    const allIcons = await this.getAllIcons();
    const lowercaseQuery = query.toLowerCase();

    return allIcons.filter(icon => 
      icon.name.toLowerCase().includes(lowercaseQuery) ||
      icon.description.toLowerCase().includes(lowercaseQuery) ||
      icon.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }

  /**
   * Get default icon for content type
   */
  async getDefaultIcon(contentType: string): Promise<string> {
    const registry = await this.loadRegistry();
    return registry.defaultMappings[contentType] || 'file-text';
  }

  /**
   * Get Lucide icon SVG content
   */
  async getLucideIconSVG(iconId: string): Promise<string | null> {
    try {
      // For Lucide icons, we'll use the lucide package directly
      const { icons } = await import('lucide');
      const iconComponent = icons[iconId as keyof typeof icons];
      
      if (!iconComponent) {
        console.warn(`Lucide icon "${iconId}" not found`);
        return null;
      }

      // Create a temporary element to render the SVG
      const tempDiv = document.createElement('div');
      const svgElement = iconComponent({ size: 24 });
      
      if (typeof svgElement === 'string') {
        return svgElement;
      } else if (svgElement && typeof svgElement === 'object') {
        tempDiv.appendChild(svgElement);
        return tempDiv.innerHTML;
      }

      return null;
    } catch (error) {
      console.error(`Error loading Lucide icon "${iconId}":`, error);
      return null;
    }
  }

  /**
   * Get custom icon SVG content
   */
  async getCustomIconSVG(iconId: string): Promise<string | null> {
    try {
      const response = await fetch(`/icons/custom/${iconId}.svg`);
      if (!response.ok) {
        return null;
      }
      return await response.text();
    } catch (error) {
      console.error(`Error loading custom icon "${iconId}":`, error);
      return null;
    }
  }

  /**
   * Get icon SVG content (works for both Lucide and custom icons)
   */
  async getIconSVG(iconId: string): Promise<string | null> {
    const icon = await this.getIconById(iconId);
    if (!icon) {
      return null;
    }

    if (icon.lucide) {
      return await this.getLucideIconSVG(iconId);
    } else {
      return await this.getCustomIconSVG(iconId);
    }
  }

  /**
   * Add a custom icon to the registry
   */
  async addCustomIcon(iconData: IconMetadata, svgContent: string): Promise<boolean> {
    try {
      const registry = await this.loadRegistry();
      
      // Add to custom icons array
      registry.customIcons.push({
        ...iconData,
        custom: true,
        uploadDate: new Date().toISOString(),
        fileSize: svgContent.length
      });

      // Update last updated timestamp
      registry.lastUpdated = new Date().toISOString();

      // Save the updated registry (this would typically be done via API)
      await this.saveRegistry(registry);
      
      return true;
    } catch (error) {
      console.error('Error adding custom icon:', error);
      return false;
    }
  }

  /**
   * Remove a custom icon from the registry
   */
  async removeCustomIcon(iconId: string): Promise<boolean> {
    try {
      const registry = await this.loadRegistry();
      
      // Remove from custom icons array
      registry.customIcons = registry.customIcons.filter(icon => icon.id !== iconId);
      
      // Update last updated timestamp
      registry.lastUpdated = new Date().toISOString();

      // Save the updated registry
      await this.saveRegistry(registry);
      
      return true;
    } catch (error) {
      console.error('Error removing custom icon:', error);
      return false;
    }
  }

  /**
   * Save the registry (placeholder for API integration)
   */
  private async saveRegistry(registry: IconRegistry): Promise<void> {
    // In a real implementation, this would save to a backend API
    // For now, we'll just update the local registry
    this.registry = registry;
    console.log('Registry updated locally:', registry);
  }

  /**
   * Get fallback registry when loading fails
   */
  private getFallbackRegistry(): IconRegistry {
    return {
      version: "1.0.0",
      lastUpdated: new Date().toISOString(),
      categories: {
        content: {
          name: "Content",
          description: "Icons for content types",
          icons: [
            {
              id: "type",
              name: "Type",
              description: "Text content",
              category: "content",
              tags: ["text"],
              lucide: true
            },
            {
              id: "file-text",
              name: "File Text",
              description: "Paragraph content",
              category: "content",
              tags: ["paragraph"],
              lucide: true
            }
          ]
        }
      },
      customIcons: [],
      defaultMappings: {
        headline: "type",
        paragraph: "file-text"
      }
    };
  }

  /**
   * Clear the cached registry (useful for development)
   */
  clearCache(): void {
    this.registry = null;
  }
}

// Export singleton instance
export const iconRegistry = new IconRegistryService();
export default iconRegistry;
