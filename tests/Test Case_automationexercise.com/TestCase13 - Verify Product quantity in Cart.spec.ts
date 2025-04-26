import { test, expect } from '@playwright/test';

test('Verify Product quantity in Cart', async ({ page }) => {
  // Navigate to url 'http://automationexercise.com'
  await page.goto('http://automationexercise.com');

  // Verify that home page is visible successfully
  await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();

  // Click 'View Product' for any product on home page
  await page.locator('a[href="/products"]').click();

  // Click 'View Product' for any product on home page
  await page.locator('a[href="/product_details/1"]').click()

  // Verify product detail is opened
  await expect(page.locator('.product-information')).toBeVisible();

  // Increase quantity to 4
  await page.locator('#quantity').fill('3');
  await page.locator('.btn.btn-default.cart').click();

  //  Click 'View Cart' button
  await page.locator('.modal-content a[href="/view_cart"]').click();

  // Verify that product is displayed in cart page with exact quantity
  await expect(page.locator('.cart_quantity')).toHaveText('3');
  await expect(page.getByText('Blue Top')).toBeVisible();


});