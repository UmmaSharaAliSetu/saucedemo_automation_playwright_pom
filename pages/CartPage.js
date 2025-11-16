class CartPage {
  constructor(page) {
    this.page = page;
    this.cartList = page.locator('.cart_list');
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('#checkout');
    this.continueShoppingButton = page.locator('#continue-shopping');
  }

  async waitForPageLoad() {
    await this.page.waitForURL(/.*cart.html/);
    await this.cartList.waitFor({ state: 'visible' });
  }

  getCartItem(index) {
    const item = this.cartItems.nth(index);
    return {
      container: item,
      name: item.locator('.inventory_item_name'),
      description: item.locator('.inventory_item_desc'),
      price: item.locator('.inventory_item_price'),
      quantity: item.locator('.cart_quantity'),
      removeButton: item.locator('button').filter({ hasText: /Remove/i })
    };
  }

  getFirstCartItem() {
    return this.getCartItem(0);
  }

  async getProductName(index = 0) {
    const item = this.getCartItem(index);
    return await item.name.textContent();
  }

  async getItemCount() {
    return await this.cartItems.count();
  }

  async verifyItemCount(expectedCount) {
    const actualCount = await this.getItemCount();
    if (actualCount !== expectedCount) {
      throw new Error(`Expected ${expectedCount} items in cart, but found ${actualCount}`);
    }
  }

  async verifyProductName(expectedProductName, index = 0) {
    const actualProductName = await this.getProductName(index);
    if (actualProductName !== expectedProductName) {
      throw new Error(`Expected product name "${expectedProductName}", but found "${actualProductName}"`);
    }
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }

  async clickContinueShopping() {
    await this.continueShoppingButton.click();
  }

  async goToInventory() {
    await this.page.goto('/inventory.html');
  }

  async verifyCartPage() {
    await this.waitForPageLoad();
    await this.cartList.waitFor({ state: 'visible' });
  }
}

module.exports = CartPage;
