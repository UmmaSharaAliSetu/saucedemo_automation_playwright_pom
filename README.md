Automated test scenario for https://www.saucedemo.com/:

**Test Scenario**: A user logs in with valid credentials, adds one product to the cart, verifies the product name in the cart, and logs out.

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

```bash
npm install
```

### Running the Tests

```bash
# Run tests in headless mode
npm test

# Run tests in headed mode (see browser)
npm run test:headed

# Run tests in debug mode
npm run test:debug

# Run tests with UI mode
npm run test:ui
```

### Test Details

The test performs the following steps:

1. **Navigate to login page**: Opens https://www.saucedemo.com/
2. **Login**: Uses standard credentials (`standard_user` / `secret_sauce`)
3. **Add product**: Adds the first product from the inventory to the cart
4. **Verify cart**: Navigates to cart page and verifies:
   - Exactly one item is in the cart
   - Product name is displayed correctly
5. **Logout**: Logs out and verifies return to login page

### Test Credentials

The SauceDemo site uses standard test credentials:
- Username: `standard_user`
- Password: `secret_sauce`

### Configuration

Playwright configuration is in `playwright.config.js`. The test uses:
- Chromium browser
- Base URL: https://www.saucedemo.com
- Screenshots on failure
- HTML reporter

### Page Object Model (POM) Architecture

The test uses the **Page Object Model** pattern for better maintainability and reusability:

- **LoginPage.js**: Handles all login page interactions
- **InventoryPage.js**: Handles product listing and cart interactions
- **CartPage.js**: Handles shopping cart page interactions

## Project Structure

```
Project/
├── pages/
│   ├── LoginPage.js          # Login page object
│   ├── InventoryPage.js      # Inventory page object
│   └── CartPage.js           # Cart page object
├── tests/
│   └── saucedemo.spec.js     # Playwright test script
├── playwright.config.js      # Playwright configuration
├── package.json              # Node.js dependencies
└── README.md                 
```
