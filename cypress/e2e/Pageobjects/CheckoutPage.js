class CheckoutPage {
    getCountryInput() {
      return cy.get("#country");
    }
  
    getPurchaseButton() {
      return cy.get("input[value='Purchase']");
    }
  
   
  
    enterCountry(country) {
      this.getCountryInput().type(country);
      cy.contains(country).click();
    }
  
    placeOrder() {
      this.getPurchaseButton().click();
    }

    
  }
  
  export default CheckoutPage;
  