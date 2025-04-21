import { test, expect } from '@playwright/test'; 

test('Search product', async ({ page }) => {

// Navigate to url 'http://automationexercise.com
await page.goto('http://automationexercise.com');

// Verify that home page is visible successfully
expect(page.getByRole('link',{name: 'Home'}));

// Click on 'Products' button
await page.locator('a[href="/products"]').click();

// Verify user is navigated to ALL PRODUCTS page successfully
expect(page.getByRole('heading', {name: "All Products"})).toBeVisible()

// Enter product name in search input and click search button
await page.getByPlaceholder('Search Product').fill('Stylish Dress');
await page.locator('.btn.btn-default.btn-lg').click();

// Verify all the products related to search are visible
await expect(page.locator('.features_items', {hasText: "Stylish Dress"})).toBeVisible();

});