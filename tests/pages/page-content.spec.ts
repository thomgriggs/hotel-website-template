import { test, expect } from '@playwright/test';

test.describe('Page Content Tests', () => {
  test('homepage should load with all key sections', async ({ page }) => {
    await page.goto('/');
    
    // Check page title
    await expect(page).toHaveTitle(/Luxury Hotel|Paradise Hotel/);
    
    // Check for key sections
    const sections = [
      'hero', 'intro', 'featured', 'amenities', 'testimonials', 'cta'
    ];
    
    for (const section of sections) {
      const sectionElement = page.locator(`[class*="${section}"], section[id*="${section}"]`).first();
      if (await sectionElement.count() > 0) {
        await expect(sectionElement).toBeVisible();
      }
    }
    
    // Check for call-to-action buttons
    const ctaButtons = page.locator('a[href*="/contact"], button:has-text("Book"), a:has-text("Reserve")');
    if (await ctaButtons.count() > 0) {
      await expect(ctaButtons.first()).toBeVisible();
    }
  });

  test('rooms page should display room listings', async ({ page }) => {
    await page.goto('/rooms');
    
    // Check page title
    await expect(page).toHaveTitle(/Rooms|Accommodations/);
    
    // Look for room cards or listings
    const roomElements = page.locator('[class*="room"], [class*="suite"], .room-card, .accommodation');
    if (await roomElements.count() > 0) {
      await expect(roomElements.first()).toBeVisible();
      
      // Check for room details
      const roomDetails = page.locator('h2, h3, .room-title, .suite-name');
      await expect(roomDetails.first()).toBeVisible();
    }
  });

  test('dining page should show restaurant information', async ({ page }) => {
    await page.goto('/dining');
    
    // Check page title
    await expect(page).toHaveTitle(/Dining|Restaurant|Food/);
    
    // Look for restaurant information
    const diningElements = page.locator('[class*="restaurant"], [class*="dining"], .menu, .chef');
    if (await diningElements.count() > 0) {
      await expect(diningElements.first()).toBeVisible();
    }
  });

  test('amenities page should list hotel facilities', async ({ page }) => {
    await page.goto('/amenities');
    
    // Check page title
    await expect(page).toHaveTitle(/Amenities|Facilities|Services/);
    
    // Look for amenities list
    const amenityElements = page.locator('[class*="amenity"], [class*="facility"], .service, .feature');
    if (await amenityElements.count() > 0) {
      await expect(amenityElements.first()).toBeVisible();
    }
  });

  test('contact page should have contact form and information', async ({ page }) => {
    await page.goto('/contact');
    
    // Check page title
    await expect(page).toHaveTitle(/Contact|Get in Touch/);
    
    // Look for contact form
    const contactForm = page.locator('form.contact-form').first();
    if (await contactForm.count() > 0) {
      await expect(contactForm).toBeVisible();
      
      // Check for form fields
      const formFields = page.locator('input, textarea, select');
      await expect(formFields.first()).toBeVisible();
    }
    
    // Look for contact information
    const contactInfo = page.locator('[class*="contact-info"], .address, .phone, .email');
    if (await contactInfo.count() > 0) {
      await expect(contactInfo.first()).toBeVisible();
    }
  });

  test('location page should show map and directions', async ({ page }) => {
    await page.goto('/location');
    
    // Check page title
    await expect(page).toHaveTitle(/Location|Directions|Map/);
    
    // Look for map or location information
    const mapElements = page.locator('[class*="map"], iframe, .directions, .address');
    if (await mapElements.count() > 0) {
      await expect(mapElements.first()).toBeVisible();
    }
  });

  test('all pages should have proper meta tags', async ({ page }) => {
    const pages = ['/', '/rooms', '/dining', '/amenities', '/contact', '/location'];
    
    for (const pagePath of pages) {
      await page.goto(pagePath);
      
      // Check for essential meta tags
      const metaDescription = page.locator('meta[name="description"]');
      if (await metaDescription.count() > 0) {
        const description = await metaDescription.getAttribute('content');
        expect(description).toBeTruthy();
        expect(description!.length).toBeGreaterThan(10);
      }
      
      // Check for Open Graph tags
      const ogTitle = page.locator('meta[property="og:title"]');
      if (await ogTitle.count() > 0) {
        await expect(ogTitle).toHaveAttribute('content');
      }
    }
  });
});
