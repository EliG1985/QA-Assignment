class ProductPage {
  constructor(page) {
    this.page = page;
    this.searchField = page.locator('#search_product');
    this.searchBtn = page.locator('#submit_search');
    this.addToCartBtn = page.locator('.add-to-cart').first();
    this.viewCartBtn = page.locator('u').filter({ hasText: 'View Cart' });
  }

  async searchProduct(name) {
    await this.searchField.fill(name);
    await this.searchBtn.click();
  }
}
module.exports = { ProductPage };