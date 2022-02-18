// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("assertCopyrightDisplayed", (linkText, expectedHref) => {
  cy.contains("Copyright © Sliide 2022");
  cy.contains("a", "Sliide");
  cy.assertHref("Sliide", "https://sliide.com");
});

// Asserts a given link as the expected href
Cypress.Commands.add("assertHref", (linkText, expectedHref) => {
  cy.get("a")
    .contains(linkText)
    .then(($link) => {
      expect($link.attr("href")).to.equal(expectedHref);
    });
});

Cypress.Commands.add("assertURL", (expectedURL) => {
  cy.url().should("eq", expectedURL);
});
