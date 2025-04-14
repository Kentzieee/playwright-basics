import { test, expect } from '@playwright/test';

// Positive Scenarios
// Login using standard_user
test('Login using standard_user', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="item-4-title-link"] [data-test="inventory-item-name"]')).toContainText('Sauce Labs Backpack');
  await page.screenshot({path: 'test-screenshots/login-success-standard_user.png', fullPage: true})

  // Logout
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.getByRole('link', { name: 'Logout' }).click();
  await expect(page.getByText('Swag Labs')).toBeVisible();
  await page.screenshot({path: 'test-screenshots/logout-success.png', fullPage: true})
});


// Negative Scenarios
// Login using locked_out_user
test('Login using locked_out_username', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('locked_out_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible()
    await page.screenshot({path: 'test-screenshots/login-success-locked_out_user.png', fullPage: true})
});
  // Login using invalid username and password
test('Login using invalid username and password', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('invalid_user');
    await page.locator('[data-test="password"]').fill('invalid_password');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible()
    await page.screenshot({path: 'test-screenshots/login-failed.png', fullPage: true})
  });