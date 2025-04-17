import { test, expect } from '@playwright/test'; 

test('Login User with correct email and password', async ({ page }) => {
// Navigate to url 'http://automationexercise.com'
await page.goto('http://automationexercise.com');

// Verify that home page is visible successfully
expect(page.getByRole('link', {name: "Home"}));

// Click on 'Signup / Login' button
await page.getByRole('link', {name: " Signup / Login"}).click();

// Verify 'Login to your account' is visible
expect(page.getByText('Login to your account')).toBeVisible();;

// Enter correct email address and password
await page.locator('[data-qa="login-email"]').fill('automationtest8@gmail.com');
await page.locator('[data-qa="login-password"]').fill('Testing1');

// Click 'login' button
await page.locator('[data-qa="login-button"]').click();

// Verify that 'Logged in as username' is visible
await expect(page.locator('b')).toHaveText('Testing1');

// Click 'Delete Account' button
await page.getByRole('link', {name: "Delete Account"}).click();

// Verify that 'ACCOUNT DELETED!' is visible
expect(page.getByText('Account Deleted!')).toBeVisible();

});