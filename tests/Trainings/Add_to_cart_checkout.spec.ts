import { test, expect } from '@playwright/test'; 

// Login
test('Add to Cart and Checkout', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="item-4-title-link"] [data-test="inventory-item-name"]')).toContainText('Sauce Labs Backpack');
// Add to cart
    const item = page.locator('.inventory_item_description', { hasText: 'Sauce Labs Fleece Jacket'});
    await expect(item.locator('[data-test="inventory-item-price"]')).toHaveText('$49.99');
    await item.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
// Validation if its already added to cart
    await expect(item.locator('[data-test="remove-sauce-labs-fleece-jacket"]')).toBeVisible();
// Check cart
    await page.locator('[data-test="shopping-cart-badge"]').click();
// Validate cart list name and price
    const cart = page.locator('.cart_list', { hasText: 'Sauce Labs Fleece Jacket'}); 
    const price = page.locator('.cart_list', { hasText: '$49.99'}); 
// Checkout
    await page.locator('[data-test="checkout"]').click();
// Validate checkout page
    await expect(page.getByText('Checkout: Your Information')).toBeVisible();
    await expect(page.getByPlaceholder('First Name')).toBeVisible();
    await expect(page.getByPlaceholder('Last Name')).toBeVisible();
    await expect(page.getByPlaceholder('Zip/Postal Code')).toBeVisible();
// Fill checkout form
    await page.locator('[data-test="firstName"]').fill('Kentzie');
    await page.locator('[data-test="lastName"]').fill('Lim');
    await page.locator('[data-test="postalCode"]').fill('1421');
// Continue to checkout
    await page.locator('[data-test="continue"]').click();
// Validate checkout overview page
    await expect(page.getByText('Checkout: Overview')).toBeVisible();
    await expect(page.getByText('Sauce Labs Fleece Jacket')).toBeVisible(); 
// Click Finish
    await page.locator('[data-test="finish"]').click();
// Validate checkout complete page
    await expect(page.getByText('Checkout: Complete!')).toBeVisible();  
});