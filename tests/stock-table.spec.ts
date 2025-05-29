import { test, expect } from '@playwright/test';

test.describe('Stock table content', () => {
  test('table structure and content', async ({ page }) => {    // Navigate to the homepage
    await page.goto('http://localhost:8080');

    // Wait for the table to be populated
    await page.waitForSelector('#stocks-table tbody tr');

    // Verify table header contains Name, Symbol, and Price columns
    const headers = await page.locator('#stocks-table thead th').allTextContents();
    expect(headers).toEqual(['Name', 'Symbol', 'Price']);

    // Verify table has content rows
    const rows = await page.locator('#stocks-table tbody tr').all();
    expect(rows.length).toBeGreaterThan(0);    // Check specific stock entries exist
    const stockSymbols = ['AAPL', 'MSFT', 'GOOGL'];
    for (const symbol of stockSymbols) {
      const symbolCell = await page.locator('#stocks-table tbody td', { hasText: symbol });
      await expect(symbolCell).toBeVisible();
    }

    // Verify price format for stocks
    const prices = await page.locator('#stocks-table tbody td:nth-child(3)').allTextContents();
    const priceRegex = /^\d+\.\d{2} \$$/;
    const validPrices = prices.filter(price => price !== '-');
    expect(validPrices.every(price => priceRegex.test(price))).toBeTruthy();
  });
});
