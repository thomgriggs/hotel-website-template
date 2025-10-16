import { test, expect } from '@playwright/test';

test.describe('Adaptive Theme System', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage with preview mode
    await page.goto('/?preview=true');
    
    // Handle password prompt
    await page.waitForSelector('input[type="password"]', { timeout: 5000 });
    await page.fill('input[type="password"]', 'edit2024');
    await page.press('input[type="password"]', 'Enter');
    
    // Wait for preview mode to initialize
    await page.waitForSelector('[data-sanity-edit-field]', { timeout: 10000 });
  });

  test('should apply neutral theme by default', async ({ page }) => {
    // Check that neutral theme is applied by default
    const theme = await page.evaluate(() => {
      if (window.themeManager) {
        return window.themeManager.getCurrentTheme()?.id;
      }
      return null;
    });
    
    expect(theme).toBe('neutral');
    
    // Check that neutral theme colors are applied
    const colors = await page.evaluate(() => {
      const root = document.documentElement;
      return {
        primary: getComputedStyle(root).getPropertyValue('--preview-primary'),
        background: getComputedStyle(root).getPropertyValue('--preview-background'),
        text: getComputedStyle(root).getPropertyValue('--preview-text'),
      };
    });
    
    expect(colors.primary).toBe('#374151');
    expect(colors.background).toBe('rgba(55, 65, 81, 0.9)');
    expect(colors.text).toBe('#FFFFFF');
  });

  test('should switch to warm theme', async ({ page }) => {
    // Apply warm theme
    await page.evaluate(() => {
      if (window.themeManager) {
        window.themeManager.applyTheme('warm');
      }
    });
    
    // Check that warm theme is applied
    const theme = await page.evaluate(() => {
      if (window.themeManager) {
        return window.themeManager.getCurrentTheme()?.id;
      }
      return null;
    });
    
    expect(theme).toBe('warm');
    
    // Check that warm theme colors are applied
    const colors = await page.evaluate(() => {
      const root = document.documentElement;
      return {
        primary: getComputedStyle(root).getPropertyValue('--preview-primary'),
        background: getComputedStyle(root).getPropertyValue('--preview-background'),
        text: getComputedStyle(root).getPropertyValue('--preview-text'),
      };
    });
    
    expect(colors.primary).toBe('#D97706');
    expect(colors.background).toBe('rgba(217, 119, 6, 0.9)');
    expect(colors.text).toBe('#FFFFFF');
  });

  test('should switch to cool theme', async ({ page }) => {
    // Apply cool theme
    await page.evaluate(() => {
      if (window.themeManager) {
        window.themeManager.applyTheme('cool');
      }
    });
    
    // Check that cool theme is applied
    const theme = await page.evaluate(() => {
      if (window.themeManager) {
        return window.themeManager.getCurrentTheme()?.id;
      }
      return null;
    });
    
    expect(theme).toBe('cool');
    
    // Check that cool theme colors are applied
    const colors = await page.evaluate(() => {
      const root = document.documentElement;
      return {
        primary: getComputedStyle(root).getPropertyValue('--preview-primary'),
        background: getComputedStyle(root).getPropertyValue('--preview-background'),
        text: getComputedStyle(root).getPropertyValue('--preview-text'),
      };
    });
    
    expect(colors.primary).toBe('#0D9488');
    expect(colors.background).toBe('rgba(13, 148, 136, 0.9)');
    expect(colors.text).toBe('#FFFFFF');
  });

  test('should switch to professional theme', async ({ page }) => {
    // Apply professional theme
    await page.evaluate(() => {
      if (window.themeManager) {
        window.themeManager.applyTheme('professional');
      }
    });
    
    // Check that professional theme is applied
    const theme = await page.evaluate(() => {
      if (window.themeManager) {
        return window.themeManager.getCurrentTheme()?.id;
      }
      return null;
    });
    
    expect(theme).toBe('professional');
    
    // Check that professional theme colors are applied
    const colors = await page.evaluate(() => {
      const root = document.documentElement;
      return {
        primary: getComputedStyle(root).getPropertyValue('--preview-primary'),
        background: getComputedStyle(root).getPropertyValue('--preview-background'),
        text: getComputedStyle(root).getPropertyValue('--preview-text'),
      };
    });
    
    expect(colors.primary).toBe('#1E40AF');
    expect(colors.background).toBe('rgba(30, 64, 175, 0.9)');
    expect(colors.text).toBe('#FFFFFF');
  });

  test('should detect optimal theme for light backgrounds', async ({ page }) => {
    // Create a light background element
    await page.evaluate(() => {
      const testElement = document.createElement('div');
      testElement.style.backgroundColor = '#FFFFFF';
      testElement.style.width = '100px';
      testElement.style.height = '100px';
      testElement.id = 'test-light-bg';
      document.body.appendChild(testElement);
    });
    
    // Test theme detection
    const detectedTheme = await page.evaluate(() => {
      const element = document.getElementById('test-light-bg');
      if (element && window.themeManager) {
        return window.themeManager.detectOptimalTheme(element);
      }
      return null;
    });
    
    // Should detect a theme suitable for light backgrounds
    expect(detectedTheme).toBeTruthy();
    expect(['neutral', 'professional', 'cool']).toContain(detectedTheme);
    
    // Clean up
    await page.evaluate(() => {
      const element = document.getElementById('test-light-bg');
      if (element) element.remove();
    });
  });

  test('should detect optimal theme for dark backgrounds', async ({ page }) => {
    // Create a dark background element
    await page.evaluate(() => {
      const testElement = document.createElement('div');
      testElement.style.backgroundColor = '#000000';
      testElement.style.width = '100px';
      testElement.style.height = '100px';
      testElement.id = 'test-dark-bg';
      document.body.appendChild(testElement);
    });
    
    // Test theme detection
    const detectedTheme = await page.evaluate(() => {
      const element = document.getElementById('test-dark-bg');
      if (element && window.themeManager) {
        return window.themeManager.detectOptimalTheme(element);
      }
      return null;
    });
    
    // Should detect a theme suitable for dark backgrounds
    expect(detectedTheme).toBeTruthy();
    expect(['neutral', 'warm', 'cool']).toContain(detectedTheme);
    
    // Clean up
    await page.evaluate(() => {
      const element = document.getElementById('test-dark-bg');
      if (element) element.remove();
    });
  });

  test('should detect optimal theme for warm colored backgrounds', async ({ page }) => {
    // Create a warm colored background element
    await page.evaluate(() => {
      const testElement = document.createElement('div');
      testElement.style.backgroundColor = '#FF6B35';
      testElement.style.width = '100px';
      testElement.style.height = '100px';
      testElement.id = 'test-warm-bg';
      document.body.appendChild(testElement);
    });
    
    // Test theme detection
    const detectedTheme = await page.evaluate(() => {
      const element = document.getElementById('test-warm-bg');
      if (element && window.themeManager) {
        return window.themeManager.detectOptimalTheme(element);
      }
      return null;
    });
    
    // Should detect a theme suitable for warm backgrounds
    expect(detectedTheme).toBeTruthy();
    expect(['neutral', 'cool', 'professional']).toContain(detectedTheme);
    
    // Clean up
    await page.evaluate(() => {
      const element = document.getElementById('test-warm-bg');
      if (element) element.remove();
    });
  });

  test('should detect optimal theme for cool colored backgrounds', async ({ page }) => {
    // Create a cool colored background element
    await page.evaluate(() => {
      const testElement = document.createElement('div');
      testElement.style.backgroundColor = '#0D9488';
      testElement.style.width = '100px';
      testElement.style.height = '100px';
      testElement.id = 'test-cool-bg';
      document.body.appendChild(testElement);
    });
    
    // Test theme detection
    const detectedTheme = await page.evaluate(() => {
      const element = document.getElementById('test-cool-bg');
      if (element && window.themeManager) {
        return window.themeManager.detectOptimalTheme(element);
      }
      return null;
    });
    
    // Should detect a theme suitable for cool backgrounds
    expect(detectedTheme).toBeTruthy();
    expect(['neutral', 'warm', 'professional']).toContain(detectedTheme);
    
    // Clean up
    await page.evaluate(() => {
      const element = document.getElementById('test-cool-bg');
      if (element) element.remove();
    });
  });

  test('should apply custom color overrides', async ({ page }) => {
    // Apply custom color overrides
    await page.evaluate(() => {
      if (window.themeManager) {
        window.themeManager.applyCustomOverrides({
          primary: '#FF6B35',
          background: 'rgba(255, 107, 53, 0.9)',
          text: '#FFFFFF',
          border: '#FF6B35'
        });
      }
    });
    
    // Check that custom colors are applied
    const colors = await page.evaluate(() => {
      const root = document.documentElement;
      return {
        primary: getComputedStyle(root).getPropertyValue('--preview-primary'),
        background: getComputedStyle(root).getPropertyValue('--preview-background'),
        text: getComputedStyle(root).getPropertyValue('--preview-text'),
        border: getComputedStyle(root).getPropertyValue('--preview-border'),
      };
    });
    
    expect(colors.primary).toBe('#FF6B35');
    expect(colors.background).toBe('rgba(255, 107, 53, 0.9)');
    expect(colors.text).toBe('#FFFFFF');
    expect(colors.border).toBe('#FF6B35');
  });

  test('should update adaptive configuration', async ({ page }) => {
    // Update adaptive configuration
    await page.evaluate(() => {
      if (window.themeManager) {
        window.themeManager.updateAdaptiveConfig({
          currentTheme: 'warm',
          autoDetect: false,
          contrastThreshold: 0.7
        });
      }
    });
    
    // Check that configuration is updated
    const config = await page.evaluate(() => {
      if (window.themeManager) {
        return window.themeManager.getAdaptiveConfig();
      }
      return null;
    });
    
    expect(config).toBeTruthy();
    expect(config.currentTheme).toBe('warm');
    expect(config.autoDetect).toBe(false);
    expect(config.contrastThreshold).toBe(0.7);
  });

  test('should maintain theme consistency during hover interactions', async ({ page }) => {
    // Apply a specific theme
    await page.evaluate(() => {
      if (window.themeManager) {
        window.themeManager.applyTheme('cool');
      }
    });
    
    // Hover over multiple editable fields
    const editableFields = page.locator('[data-sanity-edit-field]');
    const fieldCount = await editableFields.count();
    
    for (let i = 0; i < Math.min(fieldCount, 3); i++) {
      await editableFields.nth(i).hover();
      
      // Check that theme is still applied
      const theme = await page.evaluate(() => {
        if (window.themeManager) {
          return window.themeManager.getCurrentTheme()?.id;
        }
        return null;
      });
      
      expect(theme).toBe('cool');
    }
  });

  test('should handle theme switching with preview mode indicators', async ({ page }) => {
    const themes = ['neutral', 'warm', 'cool', 'professional'];
    
    for (const theme of themes) {
      // Apply theme
      await page.evaluate((themeName) => {
        if (window.themeManager) {
          window.themeManager.applyTheme(themeName);
        }
      }, theme);
      
      // Hover over an editable field
      const editableField = page.locator('[data-sanity-edit-field]').first();
      await editableField.hover();
      
      // Check that the indicator uses the correct theme colors
      const indicatorColors = await page.evaluate(() => {
        const indicator = document.querySelector('[data-sanity-edit-field]:hover::before');
        if (indicator) {
          const computedStyle = getComputedStyle(indicator);
          return {
            borderColor: computedStyle.borderColor,
            backgroundColor: computedStyle.backgroundColor,
          };
        }
        return null;
      });
      
      // Colors should be applied (exact values depend on theme)
      expect(indicatorColors).toBeTruthy();
    }
  });

  test('should handle theme switching with content labels', async ({ page }) => {
    const themes = ['neutral', 'warm', 'cool', 'professional'];
    
    for (const theme of themes) {
      // Apply theme
      await page.evaluate((themeName) => {
        if (window.themeManager) {
          window.themeManager.applyTheme(themeName);
        }
      }, theme);
      
      // Hover over an editable field
      const editableField = page.locator('[data-sanity-edit-field]').first();
      await editableField.hover();
      
      // Check that the label uses the correct theme colors
      const labelColors = await page.evaluate(() => {
        const label = document.querySelector('[data-sanity-edit-field]:hover::after');
        if (label) {
          const computedStyle = getComputedStyle(label);
          return {
            backgroundColor: computedStyle.backgroundColor,
            color: computedStyle.color,
          };
        }
        return null;
      });
      
      // Colors should be applied (exact values depend on theme)
      expect(labelColors).toBeTruthy();
    }
  });

  test('should handle theme switching with editor popup', async ({ page }) => {
    // Apply a specific theme
    await page.evaluate(() => {
      if (window.themeManager) {
        window.themeManager.applyTheme('warm');
      }
    });
    
    // Open editor
    const editableField = page.locator('[data-sanity-edit-field]').first();
    await editableField.click();
    await page.waitForSelector('.inline-editor-popup');
    
    // Check that editor uses theme colors
    const editorColors = await page.evaluate(() => {
      const editor = document.querySelector('.inline-editor-popup');
      if (editor) {
        const computedStyle = getComputedStyle(editor);
        return {
          borderColor: computedStyle.borderColor,
          backgroundColor: computedStyle.backgroundColor,
        };
      }
      return null;
    });
    
    // Editor should be visible and styled
    expect(editorColors).toBeTruthy();
    
    // Close editor
    const closeButton = page.locator('.inline-editor-close');
    await closeButton.click();
  });

  test('should handle responsive theme switching', async ({ page }) => {
    // Test on mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Apply theme
    await page.evaluate(() => {
      if (window.themeManager) {
        window.themeManager.applyTheme('professional');
      }
    });
    
    // Check that theme is applied on mobile
    const theme = await page.evaluate(() => {
      if (window.themeManager) {
        return window.themeManager.getCurrentTheme()?.id;
      }
      return null;
    });
    
    expect(theme).toBe('professional');
    
    // Test on tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    
    // Theme should still be applied
    const themeTablet = await page.evaluate(() => {
      if (window.themeManager) {
        return window.themeManager.getCurrentTheme()?.id;
      }
      return null;
    });
    
    expect(themeTablet).toBe('professional');
    
    // Test on desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Theme should still be applied
    const themeDesktop = await page.evaluate(() => {
      if (window.themeManager) {
        return window.themeManager.getCurrentTheme()?.id;
      }
      return null;
    });
    
    expect(themeDesktop).toBe('professional');
  });
});
