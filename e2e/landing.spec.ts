import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test('Landing → Services flow', async ({ page }) => {
    await page.goto('http://localhost:3000/landing');
    await page.click('text=Services');
    await page.waitForSelector('[data-test-id=booking-card]');
    const cards = await page.$$('[data-test-id=booking-card]');
    expect(cards.length).toBeGreaterThan(0);
  });
  
  test('navigates from landing to services page and loads cards', async ({ page }) => {
    // Visit the landing page
    await page.goto('/landing');
    
    // Verify we're on the landing page
    await expect(page.locator('h1:has-text("Experience Beauty & Wellness")')).toBeVisible();
    
    // Find and click the Services navigation link
    await page.click('nav >> text=Services');
    
    // Wait for navigation to complete and URL to change
    await page.waitForURL('**/services');
    
    // Verify we're on the services page
    await expect(page.locator('h1:has-text("Our Services")')).toBeVisible();
    
    // Wait for at least one BookingCard to appear
    await expect(page.locator('[data-testid="service-card"]').first()).toBeVisible({ timeout: 5000 });
    
    // Check if there are multiple cards
    const cardCount = await page.locator('[data-testid="service-card"]').count();
    expect(cardCount).toBeGreaterThan(0);
    
    // Check that each card has key elements
    for (let i = 0; i < Math.min(cardCount, 3); i++) {
      const card = page.locator('[data-testid="service-card"]').nth(i);
      
      // Check if card has title
      await expect(card.locator('.card-title')).toBeVisible();
      
      // Check if card has price
      await expect(card.locator('.card-price')).toBeVisible();
      
      // Check if card has book button
      await expect(card.locator('button:has-text("Book Now")')).toBeVisible();
    }
  });
  
  test('has proper navigation and responsive design', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Visit the landing page
    await page.goto('/landing');
    
    // Check if mobile navigation is visible
    await expect(page.locator('nav.mobile-navigation')).toBeVisible();
    
    // Expand viewport to desktop size
    await page.setViewportSize({ width: 1280, height: 800 });
    
    // Check if desktop navigation is visible
    await expect(page.locator('nav.desktop-navigation')).toBeVisible();
    
    // Click on the About Us link
    await page.click('nav >> text=About');
    
    // Wait for navigation to complete
    await page.waitForURL('**/about');
    
    // Verify we're on the about page
    await expect(page.locator('h1:has-text("About Us")')).toBeVisible();
  });
}); 