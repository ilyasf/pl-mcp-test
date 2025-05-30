# Stock Table Content Tests

## Table Structure
- [ ] Verify table has correct number of rows (40 stocks)
- [ ] Verify each row has exactly 3 columns

## Data Format
- [ ] Verify stock data format in Name column:
  - [ ] Contains valid company names
  - [ ] Special characters are handled correctly (e.g., AT&T)

- [ ] Verify stock data format in Symbol column:
  - [ ] All symbols are in uppercase
  - [ ] Symbols with dots are handled correctly (e.g., BRK.B)

- [ ] Verify stock data format in Price column:
  - [ ] Prices show correct format (XX.XX $)
  - [ ] Missing prices show "-"
  - [ ] Large numbers (>1000) are formatted correctly
