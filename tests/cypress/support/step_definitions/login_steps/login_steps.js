import { When, Then } from "cypress-cucumber-preprocessor/steps";

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

When("I enter {string} for the username", (user) => {
  cy.get("input#username").type(user);
});

When("I enter {string} for the password", (pass) => {
  cy.get("input[name='password']").type(pass);
});

Then("I click the sign in button", () => {
  cy.get("#login_button").click();
});

Then(
  "the username error message is displayed with text {string}",
  (expected) => {
    cy.get("p#username-helper-text").should("have.text", expected);
  }
);

Then(
  "the password error message is displayed with text {string}",
  (expected) => {
    cy.get("p#password-helper-text").should("have.text", expected);
  }
);

Then("the username error message is not displayed", () => {
  cy.get("p#username-helper-text").should("not.exist");
});

When("I login with the test account", () => {
  cy.fixture("account").then((account) => {
    cy.get("input#username").type(account.user);
    cy.get("input[name='password']").type(account.password);
    cy.get("#login_button").click();
  });
});

Then("I am taken to the news page", () => {
  cy.assertURL("http://localhost:3000/news");
});

When("I visit the login page", () => {
  cy.visit("/");
});

// movie this to commands
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
