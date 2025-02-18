class HomePage {
    visit() {
    cy.visit("/");
    }

    getPageTitle() {
    return cy.title();
    }

    getNameInput() {
      return cy.get("input[name='name']");
    }

    getEmailInput() {
      return cy.get("input[name='email']");
    }
  
    getPasswordInput() {
      return cy.get("input[type='password']");
    }
  
    getGenderDropdown() {
      return cy.get("select#exampleFormControlSelect1");
    }
  
    getSubmitButton() {
      return cy.get("input[value='Submit']");
    }
  
    getFormSuccessMessage() {
      return cy.get(".alert-success");
    }
  
  
    //action methods of above 
    enterName(name) {
      this.getNameInput().type(name);
    }
  
    enterEmail(email) {
      this.getEmailInput().type(email);
    }
  
    enterPassword(password) {
      this.getPasswordInput().type(password);
    }
  
    selectGender(gender) {
      this.getGenderDropdown().select(gender);
    }

    //we can with this
    /* fillRegistrationForm(name, email, password, gender) {
        this.getNameInput().clear().type(name);
        this.getEmailInput().clear().type(email);
        this.getPasswordInput().clear().type(password);
        this.getGenderDropdown().select(gender);
    }

    */
  
    submitForm() {
      this.getSubmitButton().click();
    }
  }
  
  export default HomePage;
  