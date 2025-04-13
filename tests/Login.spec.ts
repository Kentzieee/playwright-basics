import { test, expect } from '@playwright/test';

test('Should successfully login with valid username and password', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="item-4-title-link"] [data-test="inventory-item-name"]')).toContainText('Sauce Labs Backpack');
  await page.screenshot({path: 'test-screenshots/login-success.png', fullPage: true
  })
});

test('Should successfully login with invalid username and password', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('invalid_user');
    await page.locator('[data-test="password"]').fill('invalid_password');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible()
    await page.screenshot({path: 'test-screenshots/login-failed.png', fullPage: true})
  });