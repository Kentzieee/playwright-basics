import { test, expect } from '@playwright/test';

test('Register while Checkout', async ({ page }) => {
  // Navigate to url 'http://automationexercise.com'
  await page.goto('http://automationexercise.com');

  // Verify that home page is visible successfully
  expect(page.locator('a[href="/"]'));

  // Add products to cart
  await expect(page.locator('.features_items')).toBeVisible();
  await page.hover('.product-image-wrapper >> nth=0'); // hover on first product
  await page.locator('.product-overlay .overlay-content a[data-product-id="1"]').waitFor({ state: 'visible' }); // To wait for the hidden overlay to display
  await page.locator('.product-overlay .overlay-content a[data-product-id="1"]').click();

  // Click 'Continue Shopping' button
  await expect(page.locator('.modal-content')).toBeVisible();
  await page.locator('.btn.btn-success.close-modal.btn-block').click();
  
  // Hover over second product and click 'Add to cart'
  await page.hover('.product-image-wrapper >> nth=1'); // hover on second product
  await page.locator('.product-overlay .overlay-content a[data-product-id="2"]').waitFor({ state: 'visible' }); // To wait for the hidden overlay to display
  await page.locator('.product-overlay .overlay-content a[data-product-id="2"]').click();

  // Click 'View Cart' button
  await page.locator('a[href="/view_cart"]').first().click();

  // Verify that cart page is displayed
  await expect(page.locator('.cart_menu')).toBeVisible();

  // Click Proceed To Checkout
  await page.locator('text=Proceed To Checkout').click();

  // Click 'Register / Login' button
  await page.locator('text=Register / Login').nth(1).click();

  // Fill all details in Signup and create account
  await page.locator('[data-qa="signup-name"]').fill('Testcase20');
  await page.locator('[data-qa="signup-email"]').fill('TC20@gmail.com');
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

  // Verify ' Logged in as username' at top
  const username = await page.locator('b').textContent();
  expect(username).toBe('Testcase20');

  // Click 'Cart' button
  await page.locator('.fa.fa-shopping-cart').first().click();

  // Click 'Proceed To Checkout' button
  await page.locator('.btn.btn-default.check_out').click();

  // Verify Address Details and Review Your Order
  expect(page.locator('#address_delivery', {hasText: "Caloocan"}));
  expect(page.locator('#address_invoice', {hasText: "Caloocan"}));

  // Enter description in comment text area and click 'Place Order'
  await page.locator('.form-control').fill('Test only');
  await page.locator('.btn.btn-default.check_out').click();

  // Enter payment details: Name on Card, Card Number, CVC, Expiration date
  await page.locator('[data-qa="name-on-card"]').fill("Test");
  await page.locator('[data-qa="card-number"]').fill("12341234");
  await page.getByPlaceholder('ex. 311').fill('213');
  await page.getByPlaceholder('MM').fill('02');
  await page.getByPlaceholder('YYYY').fill('2020');

  // Click 'Pay and Confirm Order' button
  await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();

  // Verify success message 'Your order has been placed successfully!'
  expect(page.getByText("Your order has been placed successfully!"));
  expect(page.getByText("Congratulations! Your order has been confirmed!"));

  // Click 'Delete Account' button
  await page.locator('.fa.fa-trash-o').click();

  // Verify 'ACCOUNT DELETED!' and click 'Continue' button
  expect(page.getByText("Your account has been permanently deleted!"));
});