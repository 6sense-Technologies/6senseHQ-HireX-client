import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByPlaceholder('Email Address').click();
  await page.getByPlaceholder('Email Address').fill('Farhan13@gmail.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('Khanatik18!');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'List' }).click();
});