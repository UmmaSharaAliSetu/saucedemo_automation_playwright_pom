class InventoryPage {
  constructor(page) {
    this.page = page;
    this.inventoryList = page.locator('.inventory_list');
    this.inventoryItems = page.locator('.inventory_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async waitForPageLoad() {
    await this.inventoryList.waitFor({ state: 'visible' });
    await this.page.waitForURL(/.*inventory.html/);
  }

  getProduct(index) {
    const product = this.inventoryItems.nth(index);
    return {
      container: product,
      name: product.locator('.inventory_item_name'),
      description: product.locator('.inventory_item_desc'),
      price: product.locator('.inventory_item_price'),
      addToCartButton: product.locator('button').filter({ hasText: /Add to cart/i }),
      removeButton: product.locator('button').filter({ hasText: /Remove/i })
    };
  }

  getFirstProduct() {
    return this.getProduct(0);
  }

  async getProductName(index = 0) {
    const product = this.getProduct(index);
    return await product.name.textContent();
  }

  async addProductToCart(index = 0) {
    const product = this.getProduct(index);
    const productName = await product.name.textContent();
    await product.addToCartButton.click();
    return productName;
  }

  async getCartItemCount() {
    const badgeVisible = await this.cartBadge.isVisible();
    if (!badgeVisible) {
      return 0;
    }
    const countText = await this.cartBadge.textContent();
    return parseInt(countText, 10);
  }

  async clickCart() {
    await this.cartLink.click();
  }

  async openMenu() {
    await this.menuButton.click();
    await this.page.waitForSelector('#logout_sidebar_link', { state: 'visible' });
  }

  async logout() {
    await this.openMenu();
    await this.logoutLink.click();
  }

  async verifyInventoryPage() {
    await this.waitForPageLoad();
    await this.inventoryList.waitFor({ state: 'visible' });
  }

  async verifyCartItemCount(expectedCount) {
    const actualCount = await this.getCartItemCount();
    if (actualCount !== expectedCount) {
      throw new Error(`Expected cart to have ${expectedCount} item(s), but found ${actualCount}`);
    }
  }
}

module.exports = InventoryPage;
