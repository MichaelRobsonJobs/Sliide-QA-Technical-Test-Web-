import { Given } from "cypress-cucumber-preprocessor/steps";

Given("I open the web site", () => {
  cy.visit("/");
});
