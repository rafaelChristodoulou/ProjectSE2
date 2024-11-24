import { test, expect } from '@playwright/test';

test.describe('Navigation Component', () => {
  test('desktop navigation links work correctly', async ({ page }) => {
    // Start from the home page
    await page.goto('/');

    // Check if the logo link works
    await page.click('a:has-text("AMS")');
    await expect(page).toHaveURL('/');

    // Test main navigation links
    for (const [href, label] of [['/', 'Home'], ['/about', 'About'], ['/contact', 'Contact']]) {
      await page.click(`nav >> text=${label}`);
      await expect(page).toHaveURL(href);
    }
  });

  test('authentication links work correctly when not logged in', async ({ page }) => {
    await page.goto('/');

    // Check if login link works
    await page.click('text=Login');
    await expect(page).toHaveURL('/login');

    // Go back to home page
    await page.goto('/');

    // Check if register link works
    await page.click('text=Register');
    await expect(page).toHaveURL('/register');
  });

});



test.describe('Login Form', () => {
  test.beforeEach(async ({ page }) => {
    // Mock the login function
    await page.route('**/actions/auth', async route => {
      const request = route.request();
      if (request.method() === 'POST') {
        const body = JSON.parse(await request.postData() || '{}');
        if (body.email === 'rafaelchristodoulou0@gmail.com' && body.password === 'aaa') {
          await route.fulfill({ status: 200, body: JSON.stringify({ success: true }) });
        } else {
          await route.fulfill({ status: 400, body: JSON.stringify({ success: false, message: 'Invalid credentials' }) });
        }
      }
    });

    await page.goto('/login');
  });

  test('should render login form', async ({ page }) => {
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  test('should show error message for invalid credentials', async ({ page }) => {
    await page.getByLabel('Email').fill('wrong@example.com');
    await page.getByLabel('Password').fill('wrongpassword');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('User not found')).toBeVisible();
  });

  test('should redirect to home page on successful login', async ({ page }) => {
    await page.getByLabel('Email').fill('rafaelchristodoulou0@gmail.com');
    await page.getByLabel('Password').fill('aaa');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('./');
  });

});
