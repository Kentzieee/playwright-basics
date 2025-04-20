import { test, expect } from '@playwright/test'; 

test('Test Cases Page', async ({ page }) => {

// Navigate to url 'http://automationexercise.com
await page.goto('http://automationexercise.com');

// Verify that home page is visible successfully
expect(page.getByRole('link',{name: 'Home'}));

// Click on 'Test Cases' button
await page.locator('a[href="/test_cases"]').nth(0).click();

// Verify user is navigated to test cases page successfully
expect(page.locator('span', {hasText: "Below is the list of test Cases for you to practice the Automation. Click on the scenario for detailed Test Steps:"})).toBeVisible();

});