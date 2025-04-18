import { test, expect } from '@playwright/test'; 

test('TestCase3 - Login User with incorrect email and password', async ({ page }) => {

// Navigate to url 'http://automationexercise.com'
await page.goto('https://automationexercise.com/');

// Verify that home page is visible successfully
expect(page.getByText('Home')).toBeVisible();

// Click on 'Signup / Login' button
await page.locator('a', {hasText: "Signup / Login"}).click();

// Verify 'Login to your account' is visible
expect(page.getByText('Login to your account')).toBeVisible();

// Enter incorrect email address and password
await page.locator('[data-qa="login-email"]').fill('Incorrectusername@gmail.com');
await page.locator('[data-qa="login-password"]').fill('Incorrectpassword');

// Click 'login' button
await page.locator('[data-qa="login-button"]').click();

// Verify error 'Your email or password is incorrect!' is visible
await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();


});