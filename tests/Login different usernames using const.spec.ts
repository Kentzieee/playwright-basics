import { test, expect } from '@playwright/test';

const usernames = ['standard_user', 'problem_user', 'performance_glitch_user'];
const password = 'secret_sauce';

test.describe('Login with different usernames but same password', () => {
    for (const username of usernames) {
        test(`Login using ${username}`, async ({ page }) => {
            await page.goto('https://www.saucedemo.com/');
            await page.locator('[data-test="username"]').fill(username);
            await page.locator('[data-test="password"]').fill(password);
            await page.locator('[data-test="login-button"]').click();
            await expect(page.locator('[data-test="item-4-title-link"] [data-test="inventory-item-name"]')).toContainText('Sauce Labs Backpack');

        }); xx
    }

});