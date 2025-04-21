import { test, expect } from '@playwright/test'; 

test('Verify All Products and product detail page', async ({ page }) => {

// Navigate to url 'http://automationexercise.com
await page.goto('http://automationexercise.com');

// Verify that home page is visible successfully
expect(page.getByRole('link',{name: 'Home'}));

// Click on 'Products' button
await page.locator('a[href="/products"]').click();

// Verify user is navigated to ALL PRODUCTS page successfully
expect(page.getByRole('heading', {name: "All Products"})).toBeVisible();

// The products list is visible
await expect(page.locator('.features_items')).toBeVisible();

// Click on 'View Product' of first product
await page.locator('a[href="/product_details/1"]').click();

//  User is landed to product detail page
await expect(page.locator('.product-details')).toBeVisible();

// Verify that detail detail is visible: product name, category, price, availability, condition, brand
await expect(page.getByRole('heading', {name:"Blue Top"})).toBeVisible();
await expect(page.locator('span', { hasText: 'Rs. 500' }).first()).toBeVisible();
});