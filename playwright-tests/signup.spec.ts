import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/signup');
  await page.getByPlaceholder('Full Name').click();
  await page.getByPlaceholder('Full Name').fill('imrul kayes');
  await page.getByPlaceholder('Email Address').click();
  await page.getByPlaceholder('Email Address').fill('imrulK18@gmail.com');
  await page.getByPlaceholder('Password', { exact: true }).click();
  await page.getByPlaceholder('Password', { exact: true }).fill('Imrul18@');
  await page.getByRole('button').first().click();
  await page.getByPlaceholder('Confirm Password').click();
  await page.getByPlaceholder('Confirm Password').fill('Imrul18@');
  await page
    .locator('div')
    .filter({ hasText: /^Confirm Password$/ })
    .getByRole('button')
    .click();
  await page.locator('.css-19bb58m').click();
  await page.getByRole('option', { name: 'Interviewer' }).click();
  await page.getByRole('button', { name: 'Sign Up' }).click();
});
