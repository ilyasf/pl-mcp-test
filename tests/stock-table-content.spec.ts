import { test, expect } from '@playwright/test';

test.describe('Stock Table Content', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080/');
  });  test('should have correct table structure', async ({ page }) => {
    const table = page.getByRole('table');
    
    // Verify header structure using th elements
    const headerCells = await table.locator('th').all();
    expect(headerCells.length).toBe(3);
    await expect(headerCells[0]).toHaveText('Name');
    await expect(headerCells[1]).toHaveText('Symbol');
    await expect(headerCells[2]).toHaveText('Price');

    // Wait for at least one data row to appear to ensure data is loaded
    await page.waitForSelector('#stocks-table tbody tr');

    // Get all data rows
    const dataRows = page.locator('#stocks-table tbody tr');
    const rowCount = await dataRows.count();
    expect(rowCount).toBe(41); // 40 stocks + 1 for header

    // Check each data row has exactly 3 columns
    for (let i = 0; i < rowCount - 1; i++) {
      const cells = await dataRows.nth(i).locator('td').all();
      expect(cells.length).toBe(3);
    }
  });
  test('should have correctly formatted company names', async ({ page }) => {
    // Wait for table data to load
    await page.waitForSelector('#stocks-table tbody tr');

    // Test regular company name
    const appleName = await page.locator('#stocks-table tbody tr').filter({ hasText: 'Apple' }).locator('td').first();
    await expect(appleName).toHaveText('Apple');

    // Test company name with special characters
    const atAndTName = await page.locator('#stocks-table tbody tr').filter({ hasText: 'AT&T' }).locator('td').first();
    await expect(atAndTName).toHaveText('AT&T');
  });

  test('should have correctly formatted stock symbols', async ({ page }) => {
    // Wait for table data to load
    await page.waitForSelector('#stocks-table tbody tr');

    // Get all symbol cells
    const symbolCells = await page.locator('#stocks-table tbody tr td:nth-child(2)').all();

    // Test that all symbols are uppercase
    for (const symbolCell of symbolCells) {
      const symbolText = await symbolCell.textContent();
      expect(symbolText).toBe(symbolText?.toUpperCase());
    }

    // Test symbol with dot
    const brkbSymbol = await page.locator('#stocks-table tbody tr').filter({ hasText: 'Berkshire' }).locator('td').nth(1);
    await expect(brkbSymbol).toHaveText('BRK.B');
  });

  test('should have correctly formatted prices', async ({ page }) => {
    // Wait for table data to load
    await page.waitForSelector('#stocks-table tbody tr');

    // Get all price cells
    const priceCells = await page.locator('#stocks-table tbody tr td:nth-child(3)').all();

    // Test price format
    for (const priceCell of priceCells) {
      const priceText = await priceCell.textContent();
      if (priceText !== '-') {
        expect(priceText).toMatch(/^\d+\.\d{2} \$$/);
      }
    }

    // Test specific cases
    const costcoPrice = await page.locator('#stocks-table tbody tr').filter({ hasText: 'Costco' }).locator('td').nth(2);
    const costcoPriceText = await costcoPrice.textContent();
    if (costcoPriceText !== '-') {
      const priceValue = parseFloat(costcoPriceText.replace(' $', ''));
      expect(priceValue).toBeGreaterThan(0);
      expect(costcoPriceText).toMatch(/^\d+\.\d{2} \$$/);
    }
  });
});
