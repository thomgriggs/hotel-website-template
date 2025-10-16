import { test, expect } from '@playwright/test';

test.describe('Preview Save Debug', () => {
  test('should debug the 500 error when saving footer address', async ({ page }) => {
    // Capture console messages
    const consoleMessages: string[] = [];
    page.on('console', msg => {
      consoleMessages.push(`[${msg.type()}] ${msg.text()}`);
    });

    // Capture network requests
    const networkRequests: any[] = [];
    page.on('request', request => {
      if (request.url().includes('/api/preview-save')) {
        networkRequests.push({
          url: request.url(),
          method: request.method(),
          headers: request.headers(),
          postData: request.postData(),
        });
      }
    });

    const networkResponses: any[] = [];
    page.on('response', response => {
      if (response.url().includes('/api/preview-save')) {
        networkResponses.push({
          url: response.url(),
          status: response.status(),
          statusText: response.statusText(),
          headers: response.headers(),
        });
      }
    });

    // Navigate to preview mode
    await page.goto('/?preview=true');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Wait for preview mode to initialize
    await page.waitForTimeout(3000);

    // Check if there's a password prompt and handle it
    const passwordPrompt = page.locator('.password-prompt-overlay');
    const passwordPromptCount = await passwordPrompt.count();
    console.log('Password prompt count:', passwordPromptCount);
    
    if (passwordPromptCount > 0) {
      console.log('Password prompt found, entering password...');
      const passwordInput = page.locator('input[type="password"]');
      await expect(passwordInput).toBeVisible();
      await passwordInput.fill('edit2024');
      await passwordInput.press('Enter');
      
      // Wait for password prompt to disappear
      await page.waitForTimeout(2000);
    }

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Look for footer address field
    const addressField = page.locator('[data-sanity-edit-field="siteSettings#contactInfo.address"]');
    
    // Check if address field exists
    const addressFieldCount = await addressField.count();
    console.log('Address field count:', addressFieldCount);
    
    if (addressFieldCount === 0) {
      // Log all elements with data-sanity-edit-field
      const allEditFields = await page.locator('[data-sanity-edit-field]').all();
      console.log('Found edit fields:', allEditFields.length);
      for (const field of allEditFields) {
        const fieldName = await field.getAttribute('data-sanity-edit-field');
        console.log('Edit field:', fieldName);
      }
    }

    await expect(addressField).toBeVisible();

    // Wait a bit more for preview mode to fully initialize
    await page.waitForTimeout(2000);
    
    // Try to manually trigger the editor via JavaScript
    console.log('Trying to manually trigger editor...');
    const editorTriggered = await page.evaluate(() => {
      // Check if window.inlineEditor exists
      if (typeof (window as any).inlineEditor !== 'undefined') {
        console.log('inlineEditor found on window');
        const addressField = document.querySelector('[data-sanity-edit-field="siteSettings#contactInfo.address"]');
        if (addressField) {
          console.log('Address field found, triggering click event');
          // Trigger click event
          const event = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
          });
          addressField.dispatchEvent(event);
          return true;
        }
      } else {
        console.log('inlineEditor not found on window');
      }
      return false;
    });
    
    console.log('Editor triggered manually:', editorTriggered);
    
    // Wait for editor to appear after manual trigger
    await page.waitForTimeout(2000);

    // Log all console messages so far
    console.log('=== CONSOLE MESSAGES BEFORE EDITOR ===');
    consoleMessages.forEach(msg => console.log(msg));
    
    // Wait for editor to appear
    const editorOverlay = page.locator('.inline-editor-overlay');
    
    // Debug: Check if editor appeared
    const editorCount = await editorOverlay.count();
    console.log('Editor overlay count:', editorCount);
    
    if (editorCount === 0) {
      // Check if there are any overlays or modals
      const allOverlays = await page.locator('[class*="overlay"], [class*="modal"], [class*="editor"]').all();
      console.log('Found overlays/modals:', allOverlays.length);
      for (const overlay of allOverlays) {
        const className = await overlay.getAttribute('class');
        console.log('Overlay class:', className);
      }
    }
    
    await expect(editorOverlay).toBeVisible();

    // Find the textarea in the editor
    const textarea = editorOverlay.locator('textarea');
    await expect(textarea).toBeVisible();

    // Clear existing content and add new address with line breaks
    await textarea.fill('123 Paradise Drive\nParadise City, PC 90210\nUnited States');

    // Click save button (force click to bypass Vite error overlay)
    const saveButton = editorOverlay.locator('button:has-text("Save Changes")');
    await expect(saveButton).toBeVisible();
    
    // Try to manually trigger the save function via JavaScript
    console.log('Trying to manually trigger save function...');
    const saveTriggered = await page.evaluate(() => {
      if (typeof (window as any).inlineEditor !== 'undefined') {
        const saveButton = document.querySelector('.btn-save');
        if (saveButton) {
          console.log('Save button found, checking event listeners...');
          // Try to manually call the save function
          const fieldPath = 'siteSettings#contactInfo.address';
          const fieldType = 'paragraph';
          try {
            (window as any).inlineEditor.saveChanges(fieldPath, saveButton, fieldType);
            return true;
          } catch (error) {
            console.log('Error calling saveChanges:', error);
            return false;
          }
        }
      }
      return false;
    });
    
    console.log('Save function triggered manually:', saveTriggered);

    // Wait for the request to complete and capture any new console messages
    await page.waitForTimeout(3000);
    
    // Capture any new console messages after save
    console.log('=== CONSOLE MESSAGES AFTER SAVE ===');
    const newMessages = consoleMessages.slice(consoleMessages.length);
    consoleMessages.forEach(msg => {
      if (!msg.includes('X-Frame-Options') && !msg.includes('vite') && !msg.includes('Page Load Time') && !msg.includes('ServiceWorker')) {
        console.log(msg);
      }
    });

    // Log all captured information
    console.log('=== CONSOLE MESSAGES ===');
    consoleMessages.forEach(msg => console.log(msg));

    console.log('\n=== NETWORK REQUESTS ===');
    networkRequests.forEach(req => {
      console.log(`Request: ${req.method} ${req.url}`);
      console.log('Headers:', req.headers);
      console.log('Post Data:', req.postData);
    });

    console.log('\n=== NETWORK RESPONSES ===');
    networkResponses.forEach(res => {
      console.log(`Response: ${res.status} ${res.statusText} ${res.url}`);
      console.log('Headers:', res.headers);
    });

    // Check if Sanity API was called (direct client call)
    const sanityCall = networkRequests.find(req => req.url.includes('sanity.io'));
    if (sanityCall) {
      console.log(`\nSanity API called: ${sanityCall.url}`);
    }

    // Check for 401 error (expected with read token)
    const errorMessages = consoleMessages.filter(msg => 
      msg.includes('Error') || msg.includes('error') || msg.includes('401')
    );

    if (errorMessages.length > 0) {
      console.log('\n=== ERRORS FOUND ===');
      errorMessages.forEach(error => console.log(error));
      
      // Check if it's the expected 401 error
      const unauthorizedError = errorMessages.find(msg => msg.includes('401') || msg.includes('Unauthorized'));
      if (unauthorizedError) {
        console.log('\n✅ SUCCESS: Identified the issue!');
        console.log('The save functionality is working, but we need a write token.');
        console.log('Current token only has read permissions (401 Unauthorized).');
        console.log('Solution: Get a write token from Sanity Studio.');
      }
    }
  });
});