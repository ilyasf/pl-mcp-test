import { test, expect } from '@playwright/test';

test.describe('Stock Dashboard Basic Structure', () => {
  test('should display correct page title and structure', async ({ page }) => {
    // Navigate to the stock dashboard
    await page.goto('http://localhost:8080/');

    // Verify page title
    await expect(page).toHaveTitle('Stock Price Dashboard');

    // Verify main heading
    const heading = page.getByRole('heading', { name: 'Popular Stocks' });
    await expect(heading).toBeVisible();

    // Verify table is present
    const table = page.getByRole('table');
    await expect(table).toBeVisible();

    // Verify table headers using row selector
    const headerRow = page.getByRole('row').first();
    await expect(headerRow).toBeVisible();
    
    // Verify all three headers are present
    const headers = headerRow.getByRole('cell');
    await expect(headers).toHaveCount(3);
    
    // Verify header content
    await expect(headers.nth(0)).toHaveText('Name');
    await expect(headers.nth(1)).toHaveText('Symbol');
    await expect(headers.nth(2)).toHaveText('Price');
  });
});
