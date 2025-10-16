/**
 * Icon Manager Service Layer
 * Handles CRUD operations for icons and integrates with Sanity CMS
 */

import { createClient } from '@sanity/client';
import { iconRegistry, IconMetadata } from './iconRegistry';

export interface IconUploadData {
  file: File;
  metadata: {
    name: string;
    description: string;
    category: string;
    tags: string[];
  };
}

export interface IconUsageStats {
  iconId: string;
  usageCount: number;
  lastUsed: string;
  usedIn: string[];
}

class IconManagerService {
  private sanityClient: any;
  private usageStats: Map<string, IconUsageStats> = new Map();

  constructor() {
    // Initialize Sanity client for icon management
    this.sanityClient = createClient({
      projectId: '0knotzp4',
      dataset: 'production',
      apiVersion: '2023-05-03',
      token: process.env.SANITY_API_WRITE_TOKEN || 'skTgX04FcukL6ovhMe8qGUtUmiUIdPH0pLxiFuFWeCLts4fkrVb2dp8t0OU4PObdTeMmxzEnpQ0ckQiqq7v4Q4NkgiBvU8JSGxSZCDZIqHWRcfYZmWmZVV6DIXqIp5vdfjv0tLpi9mJEbhKeXpOsq0yJiwptMZHiuQ93rTjTGUSc0SvEU40v',
      useCdn: false,
    });
  }

  /**
   * Get all available icons (both Lucide and custom)
   */
  async getAvailableIcons(): Promise<IconMetadata[]> {
    try {
      return await iconRegistry.getAllIcons();
    } catch (error) {
      console.error('Error fetching available icons:', error);
      return [];
    }
  }

  /**
   * Get icons by category
   */
  async getIconsByCategory(categoryId: string): Promise<IconMetadata[]> {
    try {
      return await iconRegistry.getIconsByCategory(categoryId);
    } catch (error) {
      console.error(`Error fetching icons for category ${categoryId}:`, error);
      return [];
    }
  }

  /**
   * Search icons by query
   */
  async searchIcons(query: string): Promise<IconMetadata[]> {
    try {
      return await iconRegistry.searchIcons(query);
    } catch (error) {
      console.error(`Error searching icons with query "${query}":`, error);
      return [];
    }
  }

  /**
   * Get icon by ID
   */
  async getIconById(iconId: string): Promise<IconMetadata | null> {
    try {
      return await iconRegistry.getIconById(iconId);
    } catch (error) {
      console.error(`Error fetching icon ${iconId}:`, error);
      return null;
    }
  }

  /**
   * Upload a custom icon
   */
  async uploadCustomIcon(uploadData: IconUploadData): Promise<boolean> {
    try {
      // Validate the SVG file
      const validationResult = await this.validateSVG(uploadData.file);
      if (!validationResult.isValid) {
        console.error('SVG validation failed:', validationResult.errors);
        return false;
      }

      // Read the SVG content
      const svgContent = await this.readFileAsText(uploadData.file);
      
      // Generate unique ID
      const iconId = this.generateIconId(uploadData.metadata.name);
      
      // Create icon metadata
      const iconMetadata: IconMetadata = {
        id: iconId,
        name: uploadData.metadata.name,
        description: uploadData.metadata.description,
        category: uploadData.metadata.category,
        tags: uploadData.metadata.tags,
        lucide: false,
        custom: true,
        uploadDate: new Date().toISOString(),
        fileSize: uploadData.file.size
      };

      // Save to Sanity CMS
      const success = await this.saveIconToSanity(iconMetadata, svgContent);
      
      if (success) {
        // Update local registry
        await iconRegistry.addCustomIcon(iconMetadata, svgContent);
        
        // Initialize usage stats
        this.usageStats.set(iconId, {
          iconId,
          usageCount: 0,
          lastUsed: '',
          usedIn: []
        });
        
        console.log(`Successfully uploaded custom icon: ${iconId}`);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error uploading custom icon:', error);
      return false;
    }
  }

  /**
   * Delete a custom icon
   */
  async deleteCustomIcon(iconId: string): Promise<boolean> {
    try {
      const icon = await this.getIconById(iconId);
      if (!icon || !icon.custom) {
        console.warn(`Cannot delete icon ${iconId}: not found or not custom`);
        return false;
      }

      // Delete from Sanity CMS
      const success = await this.deleteIconFromSanity(iconId);
      
      if (success) {
        // Update local registry
        await iconRegistry.removeCustomIcon(iconId);
        
        // Remove usage stats
        this.usageStats.delete(iconId);
        
        console.log(`Successfully deleted custom icon: ${iconId}`);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error(`Error deleting custom icon ${iconId}:`, error);
      return false;
    }
  }

  /**
   * Get icon SVG content
   */
  async getIconSVG(iconId: string): Promise<string | null> {
    try {
      return await iconRegistry.getIconSVG(iconId);
    } catch (error) {
      console.error(`Error getting SVG for icon ${iconId}:`, error);
      return null;
    }
  }

  /**
   * Validate SVG file
   */
  async validateSVG(file: File): Promise<{ isValid: boolean; errors: string[] }> {
    const errors: string[] = [];
    
    // Check file type
    if (!file.type.includes('svg')) {
      errors.push('File must be an SVG');
    }
    
    // Check file size (max 50KB)
    if (file.size > 50 * 1024) {
      errors.push('File size must be less than 50KB');
    }
    
    // Read and validate SVG content
    try {
      const content = await this.readFileAsText(file);
      
      // Check for script tags (security)
      if (content.includes('<script')) {
        errors.push('SVG cannot contain script tags');
      }
      
      // Check for external references
      if (content.includes('xlink:href') || content.includes('href=')) {
        errors.push('SVG cannot contain external references');
      }
      
      // Basic SVG structure check
      if (!content.includes('<svg') || !content.includes('</svg>')) {
        errors.push('Invalid SVG structure');
      }
      
    } catch (error) {
      errors.push('Failed to read SVG file');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Track icon usage
   */
  trackIconUsage(iconId: string, context: string): void {
    const stats = this.usageStats.get(iconId);
    if (stats) {
      stats.usageCount++;
      stats.lastUsed = new Date().toISOString();
      if (!stats.usedIn.includes(context)) {
        stats.usedIn.push(context);
      }
    } else {
      this.usageStats.set(iconId, {
        iconId,
        usageCount: 1,
        lastUsed: new Date().toISOString(),
        usedIn: [context]
      });
    }
  }

  /**
   * Get usage statistics for an icon
   */
  getIconUsageStats(iconId: string): IconUsageStats | null {
    return this.usageStats.get(iconId) || null;
  }

  /**
   * Get all usage statistics
   */
  getAllUsageStats(): IconUsageStats[] {
    return Array.from(this.usageStats.values());
  }

  /**
   * Get most used icons
   */
  getMostUsedIcons(limit: number = 10): IconUsageStats[] {
    return Array.from(this.usageStats.values())
      .sort((a, b) => b.usageCount - a.usageCount)
      .slice(0, limit);
  }

  /**
   * Save icon to Sanity CMS
   */
  private async saveIconToSanity(metadata: IconMetadata, svgContent: string): Promise<boolean> {
    try {
      const document = {
        _id: `icon-${metadata.id}`,
        _type: 'customIcon',
        ...metadata,
        svgContent,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await this.sanityClient.create(document);
      await this.sanityClient.patch(`icon-${metadata.id}`).commit();
      
      return true;
    } catch (error) {
      console.error('Error saving icon to Sanity:', error);
      return false;
    }
  }

  /**
   * Delete icon from Sanity CMS
   */
  private async deleteIconFromSanity(iconId: string): Promise<boolean> {
    try {
      await this.sanityClient.delete(`icon-${iconId}`);
      return true;
    } catch (error) {
      console.error('Error deleting icon from Sanity:', error);
      return false;
    }
  }

  /**
   * Read file as text
   */
  private readFileAsText(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string || '');
      reader.onerror = (e) => reject(e);
      reader.readAsText(file);
    });
  }

  /**
   * Generate unique icon ID
   */
  private generateIconId(name: string): string {
    const timestamp = Date.now();
    const sanitizedName = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    return `${sanitizedName}-${timestamp}`;
  }

  /**
   * Load usage statistics from Sanity
   */
  async loadUsageStats(): Promise<void> {
    try {
      const query = `*[_type == "iconUsage"]`;
      const usageData = await this.sanityClient.fetch(query);
      
      usageData.forEach((usage: any) => {
        this.usageStats.set(usage.iconId, {
          iconId: usage.iconId,
          usageCount: usage.usageCount || 0,
          lastUsed: usage.lastUsed || '',
          usedIn: usage.usedIn || []
        });
      });
    } catch (error) {
      console.error('Error loading usage stats:', error);
    }
  }

  /**
   * Save usage statistics to Sanity
   */
  async saveUsageStats(): Promise<void> {
    try {
      for (const [iconId, stats] of this.usageStats) {
        const document = {
          _id: `usage-${iconId}`,
          _type: 'iconUsage',
          ...stats,
          updatedAt: new Date().toISOString()
        };

        await this.sanityClient.createOrReplace(document);
      }
    } catch (error) {
      console.error('Error saving usage stats:', error);
    }
  }
}

// Export singleton instance
export const iconManager = new IconManagerService();
export default iconManager;
