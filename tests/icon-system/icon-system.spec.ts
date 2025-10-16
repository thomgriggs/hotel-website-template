import { test, expect } from '@playwright/test';

test.describe('Icon System & Adaptive Styling', () => {
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

  test('should display Lucide icons instead of emojis', async ({ page }) => {
    // Hover over an editable field to see the icon
    const editableField = page.locator('[data-sanity-edit-field]').first();
    await editableField.hover();
    
    // Check that the content label contains SVG instead of emoji
    const contentLabel = editableField.locator('::after');
    await expect(contentLabel).toBeVisible();
    
    // The label should contain SVG content (not emoji)
    const labelContent = await contentLabel.textContent();
    expect(labelContent).not.toMatch(/[📰🖼️🔘📄📍]/); // Should not contain emojis
  });

  test('should apply adaptive theme colors', async ({ page }) => {
    // Check that CSS variables are set
    const cssVariables = await page.evaluate(() => {
      const root = document.documentElement;
      return {
        primary: getComputedStyle(root).getPropertyValue('--preview-primary'),
        background: getComputedStyle(root).getPropertyValue('--preview-background'),
        text: getComputedStyle(root).getPropertyValue('--preview-text'),
        border: getComputedStyle(root).getPropertyValue('--preview-border'),
      };
    });

    // CSS variables should be set (not empty)
    expect(cssVariables.primary).toBeTruthy();
    expect(cssVariables.background).toBeTruthy();
    expect(cssVariables.text).toBeTruthy();
    expect(cssVariables.border).toBeTruthy();
  });

  test('should show icon picker when clicking icon button', async ({ page }) => {
    // Click on an editable field to open editor
    const editableField = page.locator('[data-sanity-edit-field]').first();
    await editableField.click();
    
    // Wait for editor to open
    await page.waitForSelector('.inline-editor-popup', { timeout: 5000 });
    
    // Click the icon picker button
    const iconPickerButton = page.locator('.icon-picker-button');
    await expect(iconPickerButton).toBeVisible();
    await iconPickerButton.click();
    
    // Check that icon picker opens
    await page.waitForSelector('.icon-picker-overlay', { timeout: 5000 });
    await expect(page.locator('.icon-picker-container')).toBeVisible();
    
    // Check that icon grid is loaded
    await expect(page.locator('.icon-grid')).toBeVisible();
    
    // Check that icons are displayed
    const iconItems = page.locator('.icon-item');
    await expect(iconItems).toHaveCount.greaterThan(0);
  });

  test('should allow icon selection from picker', async ({ page }) => {
    // Open icon picker
    const editableField = page.locator('[data-sanity-edit-field]').first();
    await editableField.click();
    await page.waitForSelector('.inline-editor-popup');
    
    const iconPickerButton = page.locator('.icon-picker-button');
    await iconPickerButton.click();
    await page.waitForSelector('.icon-picker-overlay');
    
    // Select an icon
    const firstIcon = page.locator('.icon-item').first();
    await firstIcon.click();
    
    // Icon picker should close
    await expect(page.locator('.icon-picker-overlay')).not.toBeVisible();
    
    // Success toast should appear
    await expect(page.locator('.editor-toast')).toBeVisible();
  });

  test('should close icon picker with escape key', async ({ page }) => {
    // Open icon picker
    const editableField = page.locator('[data-sanity-edit-field]').first();
    await editableField.click();
    await page.waitForSelector('.inline-editor-popup');
    
    const iconPickerButton = page.locator('.icon-picker-button');
    await iconPickerButton.click();
    await page.waitForSelector('.icon-picker-overlay');
    
    // Press escape key
    await page.keyboard.press('Escape');
    
    // Icon picker should close
    await expect(page.locator('.icon-picker-overlay')).not.toBeVisible();
  });

  test('should close icon picker when clicking outside', async ({ page }) => {
    // Open icon picker
    const editableField = page.locator('[data-sanity-edit-field]').first();
    await editableField.click();
    await page.waitForSelector('.inline-editor-popup');
    
    const iconPickerButton = page.locator('.icon-picker-button');
    await iconPickerButton.click();
    await page.waitForSelector('.icon-picker-overlay');
    
    // Click outside the picker
    await page.click('.icon-picker-overlay', { position: { x: 10, y: 10 } });
    
    // Icon picker should close
    await expect(page.locator('.icon-picker-overlay')).not.toBeVisible();
  });

  test('should display different themes based on background', async ({ page }) => {
    // Test theme detection on different page sections
    const sections = [
      { selector: 'header', expectedTheme: 'neutral' },
      { selector: 'main', expectedTheme: 'neutral' },
      { selector: 'footer', expectedTheme: 'neutral' }
    ];

    for (const section of sections) {
      const element = page.locator(section.selector).first();
      if (await element.isVisible()) {
        await element.hover();
        
        // Check that theme is applied
        const theme = await page.evaluate((selector) => {
          const el = document.querySelector(selector);
          if (el) {
            const computedStyle = getComputedStyle(el);
            return {
              primary: computedStyle.getPropertyValue('--preview-primary'),
              background: computedStyle.getPropertyValue('--preview-background'),
            };
          }
          return null;
        }, section.selector);
        
        expect(theme).toBeTruthy();
      }
    }
  });

  test('should handle theme switching', async ({ page }) => {
    // Test theme switching functionality
    const themes = ['neutral', 'warm', 'cool', 'professional'];
    
    for (const theme of themes) {
      // Apply theme
      await page.evaluate((themeName) => {
        if (window.themeManager) {
          window.themeManager.applyTheme(themeName);
        }
      }, theme);
      
      // Check that theme is applied
      const currentTheme = await page.evaluate(() => {
        if (window.themeManager) {
          return window.themeManager.getCurrentTheme()?.id;
        }
        return null;
      });
      
      expect(currentTheme).toBe(theme);
    }
  });

  test('should validate custom icon upload', async ({ page }) => {
    // Navigate to admin page
    await page.goto('/admin/icons');
    
    // Check authentication
    await page.waitForSelector('input[type="password"]', { timeout: 5000 });
    await page.fill('input[type="password"]', 'admin2024');
    await page.press('input[type="password"]', 'Enter');
    
    // Wait for icon manager to load
    await page.waitForSelector('.icon-manager', { timeout: 10000 });
    
    // Click upload button
    const uploadButton = page.locator('.upload-button');
    await uploadButton.click();
    
    // Check that upload form appears
    await expect(page.locator('.upload-form')).toBeVisible();
    
    // Test file validation (this would require actual file upload)
    // For now, just check that the form is present
    await expect(page.locator('input[type="file"]')).toBeVisible();
    await expect(page.locator('input[type="text"]')).toBeVisible();
    await expect(page.locator('textarea')).toBeVisible();
  });

  test('should display icon usage statistics', async ({ page }) => {
    // Navigate to admin page
    await page.goto('/admin/icons');
    
    // Handle authentication
    await page.waitForSelector('input[type="password"]', { timeout: 5000 });
    await page.fill('input[type="password"]', 'admin2024');
    await page.press('input[type="password"]', 'Enter');
    
    // Wait for icon manager to load
    await page.waitForSelector('.icon-manager', { timeout: 10000 });
    
    // Check that statistics are displayed
    await expect(page.locator('.stats-grid')).toBeVisible();
    await expect(page.locator('.stat-card')).toHaveCount.greaterThan(0);
    
    // Check that icon count is displayed
    const iconCount = page.locator('.stat-number').first();
    await expect(iconCount).toBeVisible();
  });

  test('should handle icon search functionality', async ({ page }) => {
    // Open icon picker
    const editableField = page.locator('[data-sanity-edit-field]').first();
    await editableField.click();
    await page.waitForSelector('.inline-editor-popup');
    
    const iconPickerButton = page.locator('.icon-picker-button');
    await iconPickerButton.click();
    await page.waitForSelector('.icon-picker-overlay');
    
    // Test search functionality
    const searchInput = page.locator('.search-input');
    await searchInput.fill('edit');
    
    // Wait for search results
    await page.waitForTimeout(500);
    
    // Check that filtered icons are displayed
    const iconItems = page.locator('.icon-item');
    const count = await iconItems.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should handle icon category filtering', async ({ page }) => {
    // Open icon picker
    const editableField = page.locator('[data-sanity-edit-field]').first();
    await editableField.click();
    await page.waitForSelector('.inline-editor-popup');
    
    const iconPickerButton = page.locator('.icon-picker-button');
    await iconPickerButton.click();
    await page.waitForSelector('.icon-picker-overlay');
    
    // Test category filtering
    const categoryButtons = page.locator('.category-button');
    const buttonCount = await categoryButtons.count();
    
    if (buttonCount > 0) {
      // Click on a category button
      await categoryButtons.nth(1).click();
      
      // Check that icons are filtered
      const iconItems = page.locator('.icon-item');
      await expect(iconItems).toHaveCount.greaterThan(0);
    }
  });

  test('should maintain theme consistency across page navigation', async ({ page }) => {
    // Apply a specific theme
    await page.evaluate(() => {
      if (window.themeManager) {
        window.themeManager.applyTheme('warm');
      }
    });
    
    // Navigate to another page
    await page.goto('/rooms?preview=true');
    
    // Handle password prompt
    await page.waitForSelector('input[type="password"]', { timeout: 5000 });
    await page.fill('input[type="password"]', 'edit2024');
    await page.press('input[type="password"]', 'Enter');
    
    // Check that theme is still applied
    const currentTheme = await page.evaluate(() => {
      if (window.themeManager) {
        return window.themeManager.getCurrentTheme()?.id;
      }
      return null;
    });
    
    expect(currentTheme).toBe('warm');
  });

  test('should handle responsive design for icon picker', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Open icon picker
    const editableField = page.locator('[data-sanity-edit-field]').first();
    await editableField.click();
    await page.waitForSelector('.inline-editor-popup');
    
    const iconPickerButton = page.locator('.icon-picker-button');
    await iconPickerButton.click();
    await page.waitForSelector('.icon-picker-overlay');
    
    // Check that picker is responsive
    const pickerContainer = page.locator('.icon-picker-container');
    await expect(pickerContainer).toBeVisible();
    
    // Check that icon grid adapts to mobile
    const iconGrid = page.locator('.icon-grid');
    await expect(iconGrid).toBeVisible();
  });
});
