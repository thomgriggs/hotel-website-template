import { test, expect } from '@playwright/test';

test.describe('Navigation Tests', () => {
  test('should navigate through main menu links', async ({ page }) => {
    await page.goto('/');
    
    // Test main navigation links
    const navLinks = [
      { text: 'Home', href: '/' },
      { text: 'Rooms', href: '/rooms' },
      { text: 'Dining', href: '/dining' },
      { text: 'Amenities', href: '/amenities' },
      { text: 'Location', href: '/location' },
      { text: 'Contact', href: '/contact' }
    ];

    for (const link of navLinks) {
      const navElement = page.locator(`nav a[href="${link.href}"]`).first();
      await expect(navElement).toBeVisible();
      
      // Click and verify navigation
      await navElement.click();
      await expect(page).toHaveURL(`http://localhost:4321${link.href}`);
      
      // Verify page loaded correctly
      await expect(page.locator('main').first()).toBeVisible();
      
      // Go back to home for next test
      if (link.href !== '/') {
        await page.goto('/');
      }
    }
  });

  test('should navigate through footer links', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Test footer links
    const footerLinks = [
      { text: 'Privacy Policy', href: '/privacy' },
      { text: 'Terms of Service', href: '/terms' },
      { text: 'Newsletter', href: '/newsletter' }
    ];

    for (const link of footerLinks) {
      const footerElement = page.locator(`footer a[href="${link.href}"]`);
      if (await footerElement.count() > 0) {
        await expect(footerElement).toBeVisible();
        
        // Click and verify navigation
        await footerElement.click();
        await expect(page).toHaveURL(`http://localhost:4321${link.href}`);
        
        // Verify page loaded correctly
        await expect(page.locator('main')).toBeVisible();
        
        // Go back to home for next test
        await page.goto('/');
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      }
    }
  });

  test('should have working logo link', async ({ page }) => {
    await page.goto('/rooms');
    
    // Find and click logo
    const logo = page.locator('header a[href="/"], header img').first();
    await expect(logo).toBeVisible();
    await logo.click();
    
    // Should navigate back to home
    await expect(page).toHaveURL('http://localhost:4321/');
  });

  test('should have responsive mobile menu', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Look for mobile menu toggle
    const mobileToggle = page.locator('[aria-label*="menu"], .mobile-menu-toggle, .hamburger').first();
    
    if (await mobileToggle.count() > 0) {
      await expect(mobileToggle).toBeVisible();
      
      // Click mobile menu toggle
      await mobileToggle.click();
      
      // Verify mobile menu is open
      const mobileMenu = page.locator('.mobile-menu, .nav-mobile').first();
      if (await mobileMenu.count() > 0) {
        await expect(mobileMenu).toBeVisible();
      }
    }
  });
});
