import { test, expect } from '@playwright/test'; 

test('Test Case: Login, Add to Cart, Validate Item', async ({ page }) => {
// Open https://www.saucedemo.com
await page.goto('https://www.saucedemo.com/')

// Log in using standard_user / secret_sauce | with validation
await expect(page.getByPlaceholder('Username')).toBeVisible();
await page.locator('[data-test="username"]').fill('standard_user');
await page.locator('[data-test="password"]').fill('secret_sauce');
await page.locator('[data-test="login-button"]').click();
await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

// Verify that you're redirected to the products page
await expect(page.locator('.title')).toHaveText('Products');
await expect(page).toHaveURL(/inventory/);

// Validation if product and add to cart exists
const inventory = page.locator('.inventory_container', {hasText: 'Sauce Labs Backpack'});
const cart = page.locator('[data-test="shopping-cart-link"]');
await expect (cart).toBeVisible();

// Sauce Labs Backpack: Add to Cart
const item = page.locator('.inventory_item_description', {hasText: 'Sauce Labs Backpack'});
const pice = page.locator('.inventory_item_description', {hasText: '$29.99'});
const button1 = page.locator('button', {hasText: 'Add to cart'}).first().click();

// Validate - Cart badge appears and equals "1"
await expect (cart).toHaveText("1");

// Go to the cart page
await page.locator('[data-test="shopping-cart-link"]').click();

// Validate Item appears in cart with correct name
const cart_item = page.locator('.inventory_item_name', {hasText: 'Sauce Labs Backpack'});

// Validate Correct quantity
const qty = page.locator('.cart_quantity', {hasText: '1'});

});