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

// Go to the Cart Page
await page.locator('[data-test="shopping-cart-link"]').click();

// Validate Item appears in cart with correct name
const cart_item = page.locator('.inventory_item_name', {hasText: 'Sauce Labs Backpack'});

// Validate Correct quantity
const qty = page.locator('.cart_quantity', {hasText: '1'});

// Click Checkout Button
await page.locator('[data-test="checkout"]').click();

// Validate placeholders if visible
await expect(page.getByPlaceholder('First Name')).toBeVisible();
await expect(page.getByPlaceholder('Last Name')).toBeVisible();
await expect(page.getByPlaceholder('Zip/Postal Code')).toBeVisible();

// Fill-out form
await page.locator('[data-test="firstName"]').fill('Kentzie');
await page.locator('[data-test="lastName"]').fill('Lim');
await page.locator('[data-test="postalCode"]').fill('1421');

// Click Continue
await page.locator('[data-test="continue"]').click();

// Validate Item in Cart
await expect(page.locator('.header_secondary_container')).toHaveText('Checkout: Overview');
await expect(page.locator('.cart_item')).toContainText('Sauce Labs Backpack');
const chkoutqty = page.locator('.cart_quantity', {hasText: '1'});
await expect(page.locator('[data-test="subtotal-label"]')).toContainText("$29.99");
await expect(page.locator('[data-test="tax-label"]')).toContainText("$2.40");

await page.locator('[data-test="finish"]').click();
await expect(page.locator('[data-test="secondary-header"]')).toBeVisible();
const msg = page.locator('.checkout_complete_container', {hasText: "Thank you for your order!"});
});