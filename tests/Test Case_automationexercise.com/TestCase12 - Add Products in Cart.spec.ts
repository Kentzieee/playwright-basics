import { test, expect } from '@playwright/test';

test('Add Products in Cart', async ({ page }) => {
  // Navigate to url 'http://automationexercise.com'
  await page.goto('http://automationexercise.com');

  // Verify that home page is visible successfully
  await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();

  // Click 'Products' button
  await page.click('a[href="/products"]');

  // Hover over first product and click 'Add to cart'
  await page.hover('.product-image-wrapper >> nth=0'); // hover on first product
  await page.locator('.product-overlay .overlay-content a[data-product-id="1"]').waitFor({ state: 'visible' });
  await page.locator('.product-overlay .overlay-content a[data-product-id="1"]').click();

  // Click 'Continue Shopping' button
  await expect(page.locator('.modal-content')).toBeVisible();
  await page.locator('.btn.btn-success.close-modal.btn-block').click();

  // Hover over second product and click 'Add to cart'
  await page.hover('.product-image-wrapper >> nth=1'); // hover on second product
  await page.locator('.product-overlay .overlay-content a[data-product-id="2"]').waitFor({ state: 'visible' });
  await page.locator('.product-overlay .overlay-content a[data-product-id="2"]').click();

  // Click 'View Cart' button
  await page.locator('a[href="/view_cart"]').first().click();

  // Verify both products are added to Cart
  await expect(page.getByText('Blue Top')).toBeVisible();
  await expect(page.getByText('Men Tshirt')).toBeVisible();

  // Verify their prices, quantity and total price
  await expect(page.locator('#product-1 .cart_quantity')).toHaveText('1');
  await expect(page.locator('#product-2 .cart_quantity')).toHaveText('1');

});