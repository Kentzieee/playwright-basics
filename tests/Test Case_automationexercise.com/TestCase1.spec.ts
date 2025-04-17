import { test, expect } from '@playwright/test'; 

test('Register User', async ({ page }) => {
// Navigate to url 'http://automationexercise.com'
await page.goto('https://automationexercise.com/');

// Verify that home page is visible successfully
const home = page.locator('.header-middle', {hasText: 'Home'});

// Click on 'Signup / Login' button
await page.getByRole('link', {name: 'Signup / Login'}).click();

// Verify 'New User Signup!' is visible
expect(page.getByText('New User Signup!'));

// Enter name and email address
await page.getByPlaceholder('Name').fill('Kentzie');
await page.locator('[data-qa="signup-email"]').fill('automationtest7@gmail.com');

// Click 'Signup' button
await page.locator('[data-qa="signup-button"]').click();

// Verify that 'ENTER ACCOUNT INFORMATION' is visible
expect(page.getByText('Enter Account Information'));

// Fill details: Title, Name, Email, Password, Date of birth
await page.locator('#id_gender2').click();
await page.locator('#password').fill('testautomation');
await page.selectOption('#days', {value: '6'});
await page.selectOption('#months', {value: '8'});
await page.selectOption('#years', {value: '1996'});

// Select checkbox 'Sign up for our newsletter!'
await page.locator('#newsletter').click();
await page.locator('#optin').click();

//  Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
await page.locator('#first_name').fill('Kentzie');
await page.locator('#last_name').fill('Lim');
await page.locator('#company').fill('Amdocs');
await page.locator('#address1').fill('Caloocan, Philippines');
await page.selectOption('#country', {value: 'India'});
await page.locator('#state').fill('Metro Manila');
await page.locator('#city').fill('Caloocan');
await page.locator('#zipcode').fill('1421');
await page.locator('#mobile_number').fill('09123562154');

// Click 'Create Account button'
await page.locator('[data-qa="create-account"]').click();

// Verify that 'ACCOUNT CREATED!' is visible
expect(page.getByText('ACCOUNT CREATED!')).toBeVisible();

// Click 'Continue' button
await page.locator('[data-qa="continue-button"]').click();

// Verify that 'Logged in as username' is visible
const username = await page.locator('b').textContent();
expect(username).toBe('Kentzie');

// Click 'Delete Account' button
const del = await page.locator('a', {hasText: 'Delete Account'});
await del.click();

// Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
expect(page.locator('[account-deleted="ACCOUNT DELETED!"]'));
expect(page.locator('[data-qa="continue-button"]')).toBeVisible();

});