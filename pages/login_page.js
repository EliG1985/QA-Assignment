class LoginPage {
  constructor(page) {
    this.page = page;
    this.loginEmail = page.locator('input[data-qa="login-email"]'); 
    this.loginPassword = page.locator('input[data-qa="login-password"]');
    this.loginBtn = page.locator('button[data-qa="login-button"]');
    this.errorMessage = page.locator('p[style*="color: red"]');
  }

  async login(email, password) {
    await this.loginEmail.fill('elyasaf2020@gmail.com');
    await this.loginPassword.fill('Mm123456');
    await this.loginBtn.click();
  }
}
module.exports = { LoginPage };