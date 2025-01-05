import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByPlaceholder('Email Address').click();
  await page.getByPlaceholder('Email Address').fill('khanatik1176@gmail.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('Khanatik18!');
  await page
    .locator('div')
    .filter({ hasText: /^Password$/ })
    .getByRole('button')
    .click();
  await page
    .locator('div')
    .filter({ hasText: /^Password$/ })
    .getByRole('button')
    .click();
  await page.getByRole('button', { name: 'Login' }).click();

  // Wait for navigation to dashboard
  await page.waitForNavigation({ url: 'http://localhost:3000/dashboard' });
});
