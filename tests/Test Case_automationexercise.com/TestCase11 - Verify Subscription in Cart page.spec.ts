import { test, expect } from '@playwright/test'; 

test('Verify Subscription in Cart', async ({ page }) => {

// Navigate to url 'http://automationexercise.com
await page.goto('http://automationexercise.com');

// Verify that home page is visible successfully
expect(page.getByRole('link',{name: 'Home'}));

//  Click 'Cart' button
await page.locator('a[href="/view_cart"]').first().click();
expect(page.getByText('Shopping Cart')).toBeVisible();

//  Enter email address in input and click arrow button
await page.locator('#susbscribe_email').fill('testing123@gmail.com');

// Verify success message 'You have been successfully subscribed!' is visible
await page.locator('#subscribe.btn.btn-default').click(); // combined two attributes
await expect(page.getByText('You have been successfully subscribed!')).toBeVisible();

});