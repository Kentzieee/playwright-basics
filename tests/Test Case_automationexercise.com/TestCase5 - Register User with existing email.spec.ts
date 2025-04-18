import { test, expect } from '@playwright/test'; 

test('Register User with existing email', async ({ page }) => {

// Navigate to url 'http://automationexercise.com
await page.goto('http://automationexercise.com');

// Verify that home page is visible successfully
expect(page.getByRole('heading', {name: "Full-Fledged practice website for Automation Engineers"})).toBeVisible()

// Click on 'Signup / Login' button
await page.locator('a', {hasText: "Signup / Login"}).click();

// Verify 'New User Signup!' is visible
expect(page.getByText("New User Signup!")).toBeVisible();

// Enter name and already registered email address -- Testing2@gmail.com
await page.locator('[data-qa="signup-name"]').fill('Testing2');
await page.locator('[data-qa="signup-email"]').fill('Testing2@gmail.com');
await expect(page.locator('input[name="name"]')).toHaveValue('Testing2');

// Click 'Signup' button
await page.locator('[data-qa="signup-button"]').click();

// Verify error 'Email Address already exist!' is visible
expect(page.locator('p', {hasText: "Email Address already exist!"})).toBeVisible();

});