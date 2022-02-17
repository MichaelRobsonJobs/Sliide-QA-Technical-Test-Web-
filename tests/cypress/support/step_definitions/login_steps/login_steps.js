import { Then } from "cypress-cucumber-preprocessor/steps";

Then("I see the login form", () => {
  cy.get("form[class='MuiBox-root css-164r41r']").should("exist");
});

Then("I see the username input field", () => {
  cy.get("input#username").should("exist");
});

Then("I see the password input field", () => {
  cy.get("input[name='password']").should("exist");
});

Then("I see the sign in button", () => {
  cy.get("#login_button").should("exist");
});
