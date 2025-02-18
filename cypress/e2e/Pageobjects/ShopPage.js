class ShopPage {

    getShopTab() {
      return cy.get('a[href*="shop"]'); // Selector for the Shop tab
    }
  

    getProductCard(productName) {
      return cy.get(".card-title").contains(productName).parents(".card");
    }
  
    getCheckoutButton() {
      return cy.get("a.nav-link").contains("Checkout");
    }


    navigateToShop() {
      this.getShopTab().click();
    }
  
    addProductToCart(productName) {
      this.getProductCard(productName).find("button").click();
    }
  
    clickCheckoutButton() {
      this.getCheckoutButton().click();
    }
  }
  
  export default ShopPage;
  