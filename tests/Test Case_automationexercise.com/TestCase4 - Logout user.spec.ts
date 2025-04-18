import { test, expect } from '@playwright/test'; 

test('Logout user', async ({ page }) => {

// Navigate to url 'http://automationexercise.com'
await page.goto('https://automationexercise.com/');

// Verify that home page is visible successfully
expect(page.getByRole('link',{name: "Home"}));

// Click on 'Signup / Login' button
await page.getByRole('link', {name: "Signup / Login"}).click();

// Verify 'Login to your account' is visible
expect(page.getByText("Login to your account")).toBeVisible();

// Enter correct email address and password
await page.locator('[data-qa="login-email"]').fill('Testing2@gmail.com');
await page.locator('[data-qa="login-password"]').fill('Testing2');

// Click 'login' button
await page.locator('[data-qa="login-button"]').click();

// Verify that 'Logged in as username' is visible
await expect(page.locator('b',{hasText: "Testing2"})).toBeVisible();

// Click 'Logout' button
await page.getByRole('link', {name: "Logout"}).click();

// Verify that user is navigated to login page
await expect(page).toHaveURL('https://automationexercise.com/login');

});