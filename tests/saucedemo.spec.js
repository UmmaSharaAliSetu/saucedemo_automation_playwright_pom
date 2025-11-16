const { test } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const CartPage = require('../pages/CartPage');

test('User login, add product to cart, verify product name, and logout', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await test.step('Navigate to login page', async () => {
    await loginPage.navigate();
    await loginPage.verifyPageTitle("Swag Labs");
  });

  await test.step('Login with valid credentials', async () => {
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.verifyInventoryPage();
  });

  let addedProductName;
  await test.step('Add one product to cart', async () => {
    addedProductName = await inventoryPage.addProductToCart(0);
    
    test.info().annotations.push({
      type: 'product-name',
      description: `Product added to cart: ${addedProductName}`
    });
    
    await inventoryPage.verifyCartItemCount(1);
  });

  await test.step('Verify product name in cart', async () => {
    await inventoryPage.clickCart();
    await cartPage.verifyCartPage();
    await cartPage.verifyItemCount(1);
    await cartPage.verifyProductName(addedProductName);
    
    const cartProductName = await cartPage.getProductName();
    console.log(`Product in cart: ${cartProductName}`);
  });

  await test.step('Logout', async () => {
    await cartPage.goToInventory();
    await inventoryPage.verifyInventoryPage();
    await inventoryPage.logout();
    await loginPage.verifyLoginPage();
    await loginPage.verifyPageUrl('/');
  });
});
