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

// Custom command that can be called on any page to check the copyright section is displayed and contains a link to sliide.com
Cypress.Commands.add("assertCopyrightDisplayed", (linkText, expectedHref) => {
  cy.contains("Copyright © Sliide 2022");
  cy.contains("a", "Sliide");
  cy.assertHref("Sliide", "https://sliide.com");
});

// Asserts a given link contains the expected href
Cypress.Commands.add("assertHref", (linkText, expectedHref) => {
  cy.get("a")
    .contains(linkText)
    .then(($link) => {
      expect($link.attr("href")).to.equal(expectedHref);
    });
});

// Asserts the url of the corrent page matches the one passed in
Cypress.Commands.add("assertURL", (expectedURL) => {
  cy.url().should("eq", expectedURL);
});

// Asserts if the expectedText is found somewhere on the page
Cypress.Commands.add("assertTextPresent", (experctedText) => {
  cy.contains(experctedText);
});

/* Calls the offline function to test out app in offline conditions - note there is an outstanding bug that effects chrome and Cypress
 https://stackoverflow.com/questions/70742901/moving-to-offline-mode-using-cypress-returned-a-promise-that-never-resolved */
Cypress.Commands.add("offline", (experctedText) => {
  goOffline();
});

// Function to mock an offline connection
const goOffline = () => {
  cy.log("**go offline**")
    .then(() => {
      return Cypress.automation("remote:debugger:protocol", {
        command: "Network.enable",
      });
    })
    .then(() => {
      return Cypress.automation("remote:debugger:protocol", {
        command: "Network.emulateNetworkConditions",
        params: {
          offline: true,
          latency: -1,
          downloadThroughput: -1,
          uploadThroughput: -1,
        },
      });
    });
};
