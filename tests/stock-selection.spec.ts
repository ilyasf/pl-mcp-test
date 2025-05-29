import { test, expect } from '@playwright/test';

test.describe('Stock selection', () => {
  test('clicking a stock row highlights it and removes highlight from others', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('http://localhost:8080');

    // Wait for the table to be populated
    await page.waitForSelector('#stocks-table tbody tr');

    // First row should be selected by default
    const firstRow = await page.locator('#stocks-table tbody tr').first();
    await expect(firstRow).toHaveClass(/selected/);

    // Click the second row
    const secondRow = await page.locator('#stocks-table tbody tr').nth(1);
    await secondRow.click();
    
    // Second row should now be selected
    await expect(secondRow).toHaveClass(/selected/);
    
    // First row should no longer be selected
    await expect(firstRow).not.toHaveClass(/selected/);
  });
});
