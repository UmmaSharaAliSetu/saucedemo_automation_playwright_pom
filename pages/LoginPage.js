class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async navigate() {
    await this.page.goto('/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async enterUsername(username) {
    await this.usernameInput.fill(username);
  }

  async enterPassword(password) {
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  async isErrorMessageVisible() {
    return await this.errorMessage.isVisible();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }

  async verifyLoginPage() {
    await this.page.waitForSelector('#login-button');
  }

  async verifyPageTitle(expectedTitle) {
    const actualTitle = await this.page.title();
  
    if (actualTitle !== expectedTitle) {
      throw new Error(
        `Expected page title to be "${expectedTitle}", but found "${actualTitle}"`
      );
    }
  }
  
  async verifyPageUrl(expectedUrl) {
    const actualUrl = this.page.url();
    if (!actualUrl.includes(expectedUrl)) {
      throw new Error(`Expected URL to contain "${expectedUrl}", but found "${actualUrl}"`);
    }
  }
}

module.exports = LoginPage;
