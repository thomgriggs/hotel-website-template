// Test utilities for Playwright tests

export async function handlePreviewPassword(page: any) {
  const passwordPrompt = page.locator('.password-prompt-overlay');
  const promptCount = await passwordPrompt.count();
  
  if (promptCount > 0) {
    console.log('Password prompt found, entering password...');
    const passwordInput = page.locator('input[type="password"]');
    await passwordInput.fill('edit2024');
    await passwordInput.press('Enter');
    await page.waitForTimeout(1000);
    return true;
  }
  return false;
}

export async function getEditableFieldsCount(page: any) {
  const editableFields = page.locator('[data-sanity-edit-field]');
  return await editableFields.count();
}

export async function testEditableField(page: any, fieldIndex: number = 0) {
  const editableFields = page.locator('[data-sanity-edit-field]');
  const fieldCount = await editableFields.count();
  
  if (fieldCount > fieldIndex) {
    const field = editableFields.nth(fieldIndex);
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
      return { success: true, fieldPath, editorOverlay };
    }
  }
  
  return { success: false, fieldPath: null, editorOverlay: null };
}

export async function closeEditor(page: any, editorOverlay: any) {
  const closeButton = editorOverlay.locator('.inline-editor-close');
  if (await closeButton.count() > 0) {
    await closeButton.click();
  } else {
    await page.keyboard.press('Escape');
  }
  await page.waitForTimeout(500);
}

export async function captureConsoleMessages(page: any) {
  const consoleMessages: string[] = [];
  page.on('console', (msg: any) => {
    consoleMessages.push(`[${msg.type()}] ${msg.text()}`);
  });
  return consoleMessages;
}

export async function waitForPageLoad(page: any) {
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
}

export const TEST_PAGES = ['/', '/rooms', '/dining', '/amenities', '/contact', '/location'];

export const NAVIGATION_LINKS = [
  { text: 'Home', href: '/' },
  { text: 'Rooms', href: '/rooms' },
  { text: 'Dining', href: '/dining' },
  { text: 'Amenities', href: '/amenities' },
  { text: 'Location', href: '/location' },
  { text: 'Contact', href: '/contact' }
];
