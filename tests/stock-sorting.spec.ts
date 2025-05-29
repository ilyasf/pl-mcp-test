import { test, expect } from '@playwright/test';

test.describe('Stock table sorting', () => {
  test('default sorting by company name', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('http://localhost:8080');

    // Wait for the table to be populated
    await page.waitForSelector('#stocks-table tbody tr');

    // Get all company names from the table
    const companyNames = await page.locator('#stocks-table tbody td:first-child').allTextContents();

    // Create a sorted copy of the names
    const sortedNames = [...companyNames].sort((a, b) => a.localeCompare(b));

    // Verify the names are already sorted alphabetically (default sorting)
    expect(companyNames).toEqual(sortedNames);
  });
});
