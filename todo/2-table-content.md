# Stock Table Content Tests

## Table Structure
- [x] Verify table has correct number of rows (40 stocks)
- [x] Verify each row has exactly 3 columns

## Data Format
- [x] Verify stock data format in Name column:
- [x] Contains valid company names
- [x] Special characters are handled correctly (e.g., AT&T)

- [x] Verify stock data format in Symbol column:
- [x] All symbols are in uppercase
- [x] Symbols with dots are handled correctly (e.g., BRK.B)

- [x] Verify stock data format in Price column:
- [x] Prices show correct format (XX.XX $)
- [x] Missing prices show "-"
- [x] Large numbers (>1000) are formatted correctly
