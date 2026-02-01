const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductPage } = require('../pages/ProductPage');

test.describe('Automation Exercise - UI Suite', () => {
  
  // 1. Happy Path: Search and Add to Cart.
  test('E2E: Search and Add Product to Cart', async ({ page }) => {
    const products = new ProductPage(page);
    await page.goto('/');
    await page.click('text=Products');
    await products.searchProduct('Blue Top');
    await products.addToCartBtn.click();
    await products.viewCartBtn.click();
    await expect(page.locator('.cart_description')).toContainText('Blue Top');
  });

  // 2. Negative Case: Login Failed.
  test('Negative: Login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/login');
    await loginPage.login('wrong@user.com', '123456');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('incorrect');
  });

  // 3. State Change: Verify Cart Updates
  test('State Change: Verify cart quantity updates', async ({ page }) => {
    await page.goto('/');
    await page.locator('.add-to-cart').first().click();
    await page.click('text=Continue Shopping');
    await page.locator('.add-to-cart').nth(1).click();
    await page.click('u:has-text("View Cart")');
    const rows = page.locator('table#cart_info_table tbody tr');
    await expect(rows).toHaveCount(2); // Cart status changed from 0 to 2.
  });

  // 4. Contact Us Form Validation
  test('Functional: Submit contact us form', async ({ page }) => {
    await page.goto('/contact_us');
    await page.fill('input[name="name"]', 'QA Tester');
    await page.fill('input[name="email"]', 'test@qa.com');
    await page.fill('textarea[name="message"]', 'Automation is fun');
    await page.click('input[name="submit"]');
    // Validate dialog is visible.
    page.on('dialog', dialog => dialog.accept());
    await expect(page.locator('.status.alert-success')).toBeVisible();
  });

  // 5. Navigation: Verify Homepage
  test('Functional: Brand Logo visibility', async ({ page }) => {
    await page.goto('/');
    const logo = page.locator('.logo img');
    await expect(logo).toBeVisible();
  });
});