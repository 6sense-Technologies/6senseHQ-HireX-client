import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByPlaceholder('Email Address').click();
  await page.getByPlaceholder('Email Address').fill('khanatik1176@gmail.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('Khanatik18!');
  await page.getByRole('button', { name: 'Login' }).click();

  // Wait for navigation to complete and check if login was successful
  await page.waitForNavigation();
  await expect(page).toHaveURL('http://localhost:3000/dashboard'); // Adjust the URL to match the post-login URL

  await page.goto('http://localhost:3000/create-job');
  await page.waitForSelector('.css-19bb58m');
  await page.locator('.css-19bb58m').first().click();
  await page.getByRole('option', { name: 'Software Engineer' }).click();

  await page.waitForSelector(
    '.css-my3gbk-control > .css-hlgwow > .css-19bb58m'
  );
  const engineeringOption = page
    .locator('.css-my3gbk-control > .css-hlgwow > .css-19bb58m')
    .first();
  await engineeringOption.scrollIntoViewIfNeeded();
  await engineeringOption.waitFor({ state: 'visible' });
  await engineeringOption.click({ force: true });

  await page.getByPlaceholder('No of Vacancy').click();
  await page.getByPlaceholder('No of Vacancy').fill('1');

  // Wait for the checkboxes to be available before interacting with them
  await page.waitForSelector('text=Phone Interview');
  await page
    .getByRole('cell', { name: 'Phone Interview' })
    .getByRole('checkbox')
    .check();
  await page
    .getByRole('cell', { name: 'HR Interview' })
    .getByRole('checkbox')
    .check();

  await page.locator('span > .cursor-pointer').click();
  await page.waitForSelector('.css-1ygjvjk-control > .css-hlgwow');
  await page.locator('.css-1ygjvjk-control > .css-hlgwow').first().click();
  await page.getByText('Online').first().click();

  await page.waitForSelector(
    '.css-1ygjvjk-control > .css-hlgwow > .css-19bb58m'
  );
  const onlineOption = page
    .locator('.css-1ygjvjk-control > .css-hlgwow > .css-19bb58m')
    .first();
  await onlineOption.scrollIntoViewIfNeeded();
  await onlineOption.waitFor({ state: 'visible' });
  await onlineOption.click({ force: true });
  await page.getByText('Online').nth(2).click();

  await page.getByPlaceholder('Type Job Responsibilities').click();
  await page
    .getByPlaceholder('Type Job Responsibilities')
    .fill('asdasdasadasdasdasda');
  await page.getByRole('button', { name: 'Add' }).click();

  await page.waitForSelector('div:has-text("C++")');
  await page
    .locator('div')
    .filter({ hasText: /^C\+\+$/ })
    .getByRole('checkbox')
    .check();
  await page.waitForSelector('div:has-text("TypeScript")');
  await page
    .locator('div')
    .filter({ hasText: /^TypeScript$/ })
    .getByRole('checkbox')
    .check();

  await page.getByRole('button', { name: 'Create' }).click();
});
