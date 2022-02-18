import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

Given("I open the web site", () => {
  cy.visit("/");
});

Then("I an H1 header with text {string}", (expected_value) => {
  cy.get("H1").should("have.text", expected_value);
});

// Seen on multiple pages - made into a custom command
Given("I see the copyright section", () => {
  cy.assertCopyrightDisplayed();
});

When("I reload the page", () => {
  cy.reload();
});

Then("text {string} is present", (expected) => {
  cy.assertTextPresent(expected);
});
