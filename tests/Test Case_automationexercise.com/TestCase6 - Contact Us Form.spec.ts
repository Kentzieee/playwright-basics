import { test, expect } from '@playwright/test'; 

test('Contact us form', async ({ page }) => {

// Navigate to url 'http://automationexercise.com
await page.goto('http://automationexercise.com');

// Verify that home page is visible successfully
expect(page.getByRole('link',{name: "Home"}));

// Click on 'Contact Us' button
await page.locator('a', {hasText: "Contact us"}).click();

// Verify 'GET IN TOUCH' is visible
expect(page.getByRole('heading', {name: "Get In Touch"})).toBeVisible();

// Enter name, email, subject and message
await page.locator('[data-qa="name"]').fill('Kentzie');
await page.locator('[data-qa="email"]').fill('Kentzietest@gmail.com');
await page.locator('[data-qa="subject"]').fill('Testing purpose only');
await page.locator('[data-qa="message"]').fill('Testing purpose only message');

// Upload file
const fileInput = page.locator('.form-control[name="upload_file"]');
await fileInput.setInputFiles('tests/Files/login-success-standard_user.png');


// Handles pop-up - Should be stated first before triggering the pop-up
page.once('dialog', async dialog => {
    console.log('Popup says:', dialog.message()); // 👈 See message in terminal
    await dialog.accept(); // Press OK
  });

// Click 'Submit' button
await page.locator('[data-qa="submit-button"]').click();

// Verify success message 'Success! Your details have been submitted successfully.' is visible
await expect(page.locator('.status.alert.alert-success')).toBeVisible();

// Click 'Home' button and verify that landed to home page successfully
await page.locator('.btn.btn-success', { hasText: 'Home' }).click();
await expect(page.getByRole('heading', {name: "Full-Fledged practice website for Automation Engineers"})).toBeVisible()
});