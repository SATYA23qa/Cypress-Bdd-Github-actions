import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import HomePage from "../../page-objects/HomePage";

const homePage = new HomePage();

Given("I open the Homepage", () => {
  homePage.visit();
});
                                             // expectedTitle
And("I should see the page title {string}", (title) => {
  homePage.getPageTitle().should("eq", title);

 /* homePage.getPageTitle().then((title) => {
    expect(title).to.equal(expectedTitle);
*/
});

/*
   When("I enter the following details:", (dataTable) => {
    dataTable.hashes().forEach((row) => {
        homePage.fillRegistrationForm(row.Name, row.Email, row.Password, row.Gender);
    });
});
*/

When("I enter name as {string}", (name) => {
  homePage.enterName(name);
});

When("I enter email as {string}", (email) => {
  homePage.enterEmail(email);
});

When("I enter password as {string}", (password) => {
  homePage.enterPassword(password);
});

When("I select gender as {string}", (gender) => {
  homePage.selectGender(gender);
});

When("I submit the form", () => {
  homePage.submitForm();
});

Then("I should see a success message on the form", () => {
 // homePage.getFormSuccessMessage().should("include.text", "Success");

    homePage.getFormSuccessMessage()
    .should("be.visible")
    .and("contain","Registration successful!")
});
