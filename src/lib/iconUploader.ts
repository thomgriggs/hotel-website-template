/**
 * Icon Upload Handler
 * Handles file uploads, validation, and processing for custom icons
 */

export interface UploadProgress {
  stage: 'validating' | 'processing' | 'uploading' | 'complete' | 'error';
  progress: number; // 0-100
  message: string;
}

export interface UploadResult {
  success: boolean;
  iconId?: string;
  error?: string;
  metadata?: any;
}

class IconUploadHandler {
  private maxFileSize = 50 * 1024; // 50KB
  private allowedTypes = ['image/svg+xml', 'image/svg'];
  private uploadCallbacks: ((progress: UploadProgress) => void)[] = [];

  /**
   * Upload an icon file with progress tracking
   */
  async uploadIcon(
    file: File, 
    metadata: {
      name: string;
      description: string;
      category: string;
      tags: string[];
    },
    onProgress?: (progress: UploadProgress) => void
  ): Promise<UploadResult> {
    
    if (onProgress) {
      this.uploadCallbacks.push(onProgress);
    }

    try {
      // Stage 1: Validation
      this.updateProgress('validating', 10, 'Validating SVG file...');
      
      const validationResult = await this.validateFile(file);
      if (!validationResult.isValid) {
        this.updateProgress('error', 0, `Validation failed: ${validationResult.errors.join(', ')}`);
        return {
          success: false,
          error: validationResult.errors.join(', ')
        };
      }

      // Stage 2: Processing
      this.updateProgress('processing', 30, 'Processing SVG content...');
      
      const processedContent = await this.processSVG(file);
      if (!processedContent) {
        this.updateProgress('error', 0, 'Failed to process SVG content');
        return {
          success: false,
          error: 'Failed to process SVG content'
        };
      }

      // Stage 3: Upload
      this.updateProgress('uploading', 60, 'Uploading to server...');
      
      const uploadResult = await this.performUpload(file, metadata, processedContent);
      
      if (uploadResult.success) {
        this.updateProgress('complete', 100, 'Upload completed successfully!');
        return uploadResult;
      } else {
        this.updateProgress('error', 0, uploadResult.error || 'Upload failed');
        return uploadResult;
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      this.updateProgress('error', 0, errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      // Clean up callbacks
      this.uploadCallbacks = [];
    }
  }

  /**
   * Validate uploaded file
   */
  private async validateFile(file: File): Promise<{ isValid: boolean; errors: string[] }> {
    const errors: string[] = [];

    // Check file type
    if (!this.allowedTypes.includes(file.type) && !file.name.toLowerCase().endsWith('.svg')) {
      errors.push('File must be an SVG image');
    }

    // Check file size
    if (file.size > this.maxFileSize) {
      errors.push(`File size must be less than ${this.maxFileSize / 1024}KB`);
    }

    // Check file name
    if (!file.name || file.name.trim().length === 0) {
      errors.push('File must have a name');
    }

    // Read and validate SVG content
    try {
      const content = await this.readFileAsText(file);
      
      // Basic SVG structure validation
      if (!content.includes('<svg') || !content.includes('</svg>')) {
        errors.push('Invalid SVG structure');
      }

      // Security checks
      if (content.includes('<script')) {
        errors.push('SVG cannot contain script tags');
      }

      if (content.includes('javascript:') || content.includes('data:')) {
        errors.push('SVG cannot contain external references');
      }

      // Check for required attributes
      if (!content.includes('viewBox') && !content.includes('width') && !content.includes('height')) {
        errors.push('SVG must have viewBox or width/height attributes');
      }

    } catch (error) {
      errors.push('Failed to read file content');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Process SVG content for security and optimization
   */
  private async processSVG(file: File): Promise<string | null> {
    try {
      const content = await this.readFileAsText(file);
      
      // Create a temporary DOM element to parse and clean the SVG
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'image/svg+xml');
      const svgElement = doc.querySelector('svg');
      
      if (!svgElement) {
        return null;
      }

      // Remove potentially dangerous attributes and elements
      this.sanitizeSVGElement(svgElement);
      
      // Ensure proper attributes
      if (!svgElement.getAttribute('viewBox') && !svgElement.getAttribute('width')) {
        svgElement.setAttribute('viewBox', '0 0 24 24');
      }

      // Add standard attributes for consistency
      svgElement.setAttribute('fill', 'currentColor');
      svgElement.setAttribute('stroke', 'currentColor');
      svgElement.setAttribute('stroke-width', '2');
      svgElement.setAttribute('stroke-linecap', 'round');
      svgElement.setAttribute('stroke-linejoin', 'round');

      // Serialize back to string
      return new XMLSerializer().serializeToString(svgElement);
      
    } catch (error) {
      console.error('Error processing SVG:', error);
      return null;
    }
  }

  /**
   * Sanitize SVG element by removing dangerous content
   */
  private sanitizeSVGElement(element: Element): void {
    // Remove script elements
    const scripts = element.querySelectorAll('script');
    scripts.forEach(script => script.remove());

    // Remove event handlers
    const attributes = Array.from(element.attributes);
    attributes.forEach(attr => {
      if (attr.name.startsWith('on') || attr.name.startsWith('javascript:')) {
        element.removeAttribute(attr.name);
      }
    });

    // Remove external references
    const hrefElements = element.querySelectorAll('[href], [xlink\\:href]');
    hrefElements.forEach(el => {
      const href = el.getAttribute('href') || el.getAttribute('xlink:href');
      if (href && (href.startsWith('http') || href.startsWith('data:'))) {
        el.removeAttribute('href');
        el.removeAttribute('xlink:href');
      }
    });

    // Recursively sanitize child elements
    const children = Array.from(element.children);
    children.forEach(child => this.sanitizeSVGElement(child));
  }

  /**
   * Perform the actual upload
   */
  private async performUpload(
    file: File, 
    metadata: any, 
    processedContent: string
  ): Promise<UploadResult> {
    try {
      // Import the icon manager dynamically to avoid circular dependencies
      const { iconManager } = await import('./iconManager');
      
      const success = await iconManager.uploadCustomIcon({
        file: new File([processedContent], file.name, { type: 'image/svg+xml' }),
        metadata
      });

      if (success) {
        // Generate icon ID (same logic as in iconManager)
        const timestamp = Date.now();
        const sanitizedName = metadata.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
        const iconId = `${sanitizedName}-${timestamp}`;

        return {
          success: true,
          iconId,
          metadata: {
            ...metadata,
            id: iconId,
            fileSize: processedContent.length,
            uploadDate: new Date().toISOString()
          }
        };
      } else {
        return {
          success: false,
          error: 'Failed to save icon to database'
        };
      }

    } catch (error) {
      console.error('Upload error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed'
      };
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
   * Update progress for all registered callbacks
   */
  private updateProgress(stage: UploadProgress['stage'], progress: number, message: string): void {
    const progressData: UploadProgress = { stage, progress, message };
    this.uploadCallbacks.forEach(callback => callback(progressData));
  }

  /**
   * Generate preview image from SVG
   */
  async generatePreview(svgContent: string, size: number = 64): Promise<string | null> {
    try {
      // Create a canvas element
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        return null;
      }

      canvas.width = size;
      canvas.height = size;

      // Create an image from the SVG
      const img = new Image();
      const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(svgBlob);

      return new Promise((resolve) => {
        img.onload = () => {
          ctx.drawImage(img, 0, 0, size, size);
          const dataURL = canvas.toDataURL('image/png');
          URL.revokeObjectURL(url);
          resolve(dataURL);
        };
        
        img.onerror = () => {
          URL.revokeObjectURL(url);
          resolve(null);
        };
        
        img.src = url;
      });

    } catch (error) {
      console.error('Error generating preview:', error);
      return null;
    }
  }

  /**
   * Get upload configuration
   */
  getUploadConfig() {
    return {
      maxFileSize: this.maxFileSize,
      allowedTypes: this.allowedTypes,
      maxFileSizeFormatted: `${this.maxFileSize / 1024}KB`
    };
  }
}

// Export singleton instance
export const iconUploadHandler = new IconUploadHandler();
export default iconUploadHandler;
