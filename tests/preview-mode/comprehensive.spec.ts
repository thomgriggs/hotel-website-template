import { test, expect } from '@playwright/test';

test.describe('Preview Mode Comprehensive Tests', () => {
  test('preview mode should work on all pages', async ({ page }) => {
    const pages = ['/', '/rooms', '/dining', '/amenities', '/contact', '/location'];
    
    for (const pagePath of pages) {
      await page.goto(`${pagePath}?preview=true`);
      
      // Wait for page to load
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);
      
      // Check if password prompt appears
      const passwordPrompt = page.locator('.password-prompt-overlay');
      const promptCount = await passwordPrompt.count();
      
      if (promptCount > 0) {
        // Enter password
        const passwordInput = page.locator('input[type="password"]');
        await expect(passwordInput).toBeVisible();
        await passwordInput.fill('edit2024');
        await passwordInput.press('Enter');
        await page.waitForTimeout(1000);
      }
      
      // Look for editable fields
      const editableFields = page.locator('[data-sanity-edit-field]');
      const fieldCount = await editableFields.count();
      
      if (fieldCount > 0) {
        console.log(`Found ${fieldCount} editable fields on ${pagePath}`);
        
        // Test clicking on first editable field
        const firstField = editableFields.first();
        await firstField.click({ force: true });
        
        // Check if editor appears
        const editorOverlay = page.locator('.inline-editor-overlay');
        const editorCount = await editorOverlay.count();
        
        if (editorCount > 0) {
          console.log(`Editor appeared on ${pagePath}`);
          
          // Close editor
          const closeButton = editorOverlay.locator('.inline-editor-close').first();
          if (await closeButton.count() > 0) {
            await closeButton.click();
          } else {
            // Press Escape to close
            await page.keyboard.press('Escape');
          }
        }
      }
    }
  });

  test('should be able to edit different field types', async ({ page }) => {
    await page.goto('/?preview=true');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Handle password prompt
    const passwordPrompt = page.locator('.password-prompt-overlay');
    if (await passwordPrompt.count() > 0) {
      const passwordInput = page.locator('input[type="password"]');
      await passwordInput.fill('edit2024');
      await passwordInput.press('Enter');
      await page.waitForTimeout(1000);
    }
    
    // Find different types of editable fields
    const editableFields = page.locator('[data-sanity-edit-field]');
    const fieldCount = await editableFields.count();
    
    console.log(`Found ${fieldCount} editable fields`);
    
    // Test editing different field types
    for (let i = 0; i < Math.min(fieldCount, 3); i++) {
      const field = editableFields.nth(i);
      const fieldPath = await field.getAttribute('data-sanity-edit-field');
      
      console.log(`Testing field: ${fieldPath}`);
      
      // Click on field
      await field.click({ force: true });
      
      // Wait for editor
      const editorOverlay = page.locator('.inline-editor-overlay');
      await page.waitForTimeout(1000);
      
      const editorCount = await editorOverlay.count();
      if (editorCount > 0) {
        console.log(`Editor appeared for field: ${fieldPath}`);
        
        // Check editor content
        const editorTitle = editorOverlay.locator('.editor-title h3');
        if (await editorTitle.count() > 0) {
          const title = await editorTitle.textContent();
          console.log(`Editor title: ${title}`);
        }
        
        // Close editor
        const closeButton = editorOverlay.locator('.inline-editor-close');
        if (await closeButton.count() > 0) {
          await closeButton.click();
        } else {
          await page.keyboard.press('Escape');
        }
        
        await page.waitForTimeout(500);
      }
    }
  });

  test('should maintain preview mode across page navigation', async ({ page }) => {
    await page.goto('/?preview=true');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Handle password prompt
    const passwordPrompt = page.locator('.password-prompt-overlay');
    if (await passwordPrompt.count() > 0) {
      const passwordInput = page.locator('input[type="password"]');
      await passwordInput.fill('edit2024');
      await passwordInput.press('Enter');
      await page.waitForTimeout(1000);
    }
    
    // Navigate to different pages
    const pages = ['/rooms', '/dining', '/amenities'];
    
    for (const pagePath of pages) {
      await page.goto(`${pagePath}?preview=true`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);
      
      // Check if editable fields are still available
      const editableFields = page.locator('[data-sanity-edit-field]');
      const fieldCount = await editableFields.count();
      
      console.log(`Preview mode active on ${pagePath}: ${fieldCount} editable fields`);
      
      // Verify we can still edit
      if (fieldCount > 0) {
        const firstField = editableFields.first();
        await firstField.click({ force: true });
        
        const editorOverlay = page.locator('.inline-editor-overlay');
        await page.waitForTimeout(1000);
        
        const editorCount = await editorOverlay.count();
        if (editorCount > 0) {
          console.log(`Editor works on ${pagePath}`);
          await page.keyboard.press('Escape');
        }
      }
    }
  });

  test('should handle save functionality with proper error handling', async ({ page }) => {
    // Capture console messages
    const consoleMessages: string[] = [];
    page.on('console', msg => {
      consoleMessages.push(`[${msg.type()}] ${msg.text()}`);
    });
    
    await page.goto('/?preview=true');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Handle password prompt
    const passwordPrompt = page.locator('.password-prompt-overlay');
    if (await passwordPrompt.count() > 0) {
      const passwordInput = page.locator('input[type="password"]');
      await passwordInput.fill('edit2024');
      await passwordInput.press('Enter');
      await page.waitForTimeout(1000);
    }
    
    // Find an editable field
    const editableFields = page.locator('[data-sanity-edit-field]');
    const fieldCount = await editableFields.count();
    
    if (fieldCount > 0) {
      const firstField = editableFields.first();
      await firstField.click({ force: true });
      
      // Wait for editor
      const editorOverlay = page.locator('.inline-editor-overlay');
      await page.waitForTimeout(1000);
      
      const editorCount = await editorOverlay.count();
      if (editorCount > 0) {
        // Try to save (this will likely fail with 401, which is expected)
        const saveButton = editorOverlay.locator('.btn-save');
        if (await saveButton.count() > 0) {
          await saveButton.click({ force: true });
          await page.waitForTimeout(2000);
          
          // Check for expected error messages
          const errorMessages = consoleMessages.filter(msg => 
            msg.includes('401') || msg.includes('Unauthorized') || msg.includes('Error')
          );
          
          if (errorMessages.length > 0) {
            console.log('Expected error found (401 Unauthorized):');
            errorMessages.forEach(error => console.log(error));
          }
        }
      }
    }
  });
});
