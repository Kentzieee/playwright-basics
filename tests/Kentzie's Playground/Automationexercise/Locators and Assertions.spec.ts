/*
🏁 Beginner Missions (Locators + Assertions)
✅ Mission 1: Navigate to Automation Exercise and verify Home is visible.
✅ Mission 2: Click on Signup/Login button and check if Login form appears.
✅ Mission 3: Fill in random email + password and submit (negative test: wrong credentials).
✅ Mission 4: Click on Products page and verify products list is displayed.
✅ Mission 5: Capture screenshot after loading product page.
*/

import { test, expect } from '@playwright/test'; 

test.beforeAll(async () => {
    // This runs once before all tests. You can set up things that are needed for all tests.
    console.log('Starting the test suite...');
  });

test.afterAll(async () => {
    // This runs once after all tests. You can use it for cleanup or reporting.
    console.log('Test suite completed.');
  });

test('Locators and Assertions', async ({ page }) => {

// Mission 1: Navigate to Automation Exercise and verify Home is visible.
await page.goto('https://automationexercise.com/');
expect(page.getByRole('heading', {name: "Full-Fledged practice website for Automation Engineers"})).toBeVisible()

// Mission 2: Click on Signup/Login button and check if Login form appears.

await page.locator('a[href="/login"]').click();
await expect(page.getByText("Login to your account")).toBeVisible();
await expect(page.getByText("New User Signup!")).toBeVisible();
await expect(page.locator('.col-sm-4.col-sm-offset-1 .login-form input[data-qa="login-email"]')).toHaveAttribute('placeholder', 'Email Address');
await expect(page.locator('.col-sm-4.col-sm-offset-1 .login-form input[data-qa="login-password"]')).toHaveAttribute('placeholder', 'Password');
await expect(page.locator('.col-sm-4 .signup-form input[data-qa="signup-name"]')).toHaveAttribute('placeholder', 'Name');
await expect(page.locator('.col-sm-4 .signup-form input[data-qa="signup-email"]')).toHaveAttribute('placeholder', 'Email Address');

// Mission 3: Fill in random email + password and submit (negative test: wrong credentials).

await page.locator('.login-form').getByPlaceholder('Email Address').fill('Wala@gmail.com');
await page.locator('.login-form').getByPlaceholder('Password').fill('Test');
await page.locator('[data-qa="login-button"]').click();
await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();

// Mission 4: Click on Products page and verify products list is displayed.

await page.locator('a[href="/products"]').click();
await expect(page.locator('.features_items')).toBeVisible();
await expect(page.getByText('All Products')).toBeVisible();

// Mission 5: Capture screenshot after loading product page.

await page.screenshot({ path: 'test-screenshots/product-page.png' });

});