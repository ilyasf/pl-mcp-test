# Playwright Test Showcase

This project demonstrates automated testing of a stock price dashboard using Playwright Test framework. It showcases various testing techniques and best practices for web application testing.

## Project Structure

```
playwright-showcase/
├── test-web-app/            # Web application being tested
│   ├── index.html          # Main HTML file
│   ├── index.js            # Application logic
│   ├── styles.css          # Styling
│   └── favicon.svg         # Website icon
├── tests/                  # Test files
│   ├── stock-page-basic.spec.ts    # Basic page structure tests
│   └── stock-table-content.spec.ts  # Table content and format tests
├── todo/                   # Test coverage documentation
│   ├── 1-basic-structure.md
│   ├── 2-table-content.md
│   ├── 3-data-validation.md
│   ├── 4-ai-suggestions.md
│   ├── 5-responsive-design.md
│   ├── 6-accessibility.md
│   ├── 7-error-handling.md
│   ├── 8-performance.md
│   └── 9-edge-cases.md
└── playwright.config.ts    # Playwright configuration
```

## Features Tested

1. Basic Page Structure
   - Page title verification
   - Main heading presence
   - Table structure verification

2. Table Content
   - Row count validation
   - Column structure
   - Data format verification
   - Special character handling

3. Stock Data Validation
   - Company name formatting
   - Stock symbol format (uppercase, special characters)
   - Price format (XX.XX $)
   - Missing price handling

4. AI Suggestions (TODO)
5. Responsive Design (TODO)
6. Accessibility (TODO)
7. Error Handling (TODO)
8. Performance (TODO)
9. Edge Cases (TODO)

## Requirements

- Node.js 16 or higher
- npm or yarn
- Playwright Test

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd playwright-showcase
```

2. Install dependencies
```bash
npm install
```

3. Install Playwright browsers
```bash
npx playwright install
```

## Running Tests

1. Start the web application (runs on http://localhost:8080)

2. Run all tests:
```bash
npx playwright test
```

3. Run specific test file:
```bash
npx playwright test tests/stock-page-basic.spec.ts
```

4. Run tests with UI mode:
```bash
npx playwright test --ui
```

## Test Reports

After running tests, you can find the HTML report in:
- `playwright-report/index.html`

## Contributing

1. Check the TODO directory for untested features
2. Create new test files following the existing patterns
3. Ensure tests are properly documented
4. Submit a pull request

## Best Practices Demonstrated

- Use of role-based selectors
- Async/await pattern
- Proper test organization
- Wait strategies for dynamic content
- Data format validation
- Edge case handling
- Comprehensive test documentation
