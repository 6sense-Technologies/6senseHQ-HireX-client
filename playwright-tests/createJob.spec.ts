import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByPlaceholder('Email Address').click();
  await page.getByPlaceholder('Email Address').fill('Farhan13@gmail.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('Khanatik18!');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Create' }).click();
  await page.locator('.job-dropdown__control').first().click();
  await page.getByRole('option', { name: 'Jr Backend Engineer' }).click();
  await page.locator('div:nth-child(2) > div > div > .relative > .w-full > .job-dropdown__control').click();
  await page.getByRole('option', { name: 'Development' }).click();
  await page.getByPlaceholder('No of Vacancy').click();
  await page.getByPlaceholder('No of Vacancy').fill('1');
  await page.getByPlaceholder('Type Job Responsibilities').click();
  await page.getByPlaceholder('Type Job Responsibilities').fill('dasdadasdasda');
  await page.getByRole('button', { name: 'Add' }).click();
  await page.locator('div').filter({ hasText: /^C\+\+$/ }).getByRole('checkbox').check();
  await page.locator('div').filter({ hasText: /^TypeScript$/ }).getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByPlaceholder('Type Name...').click();
  await page.getByPlaceholder('Type Name...').fill('asdasd');
  await page.getByRole('row', { name: 'asdasd' }).getByRole('img').click();
});