import { When, Then } from "cypress-cucumber-preprocessor/steps";

Then("I can see the news cards", () => {
  cy.get(
    "div[class='MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-16vq84g-MuiPaper-root-MuiCard-root']"
  ).should("exist");
});

Then("each news card contains an image, text and a view button", () => {
  // Loop through each news card check they each contain at least one image, some text and a link
  cy.get(
    "div[class='MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-16vq84g-MuiPaper-root-MuiCard-root']"
  ).each(($card) => {
    // Wrap the current card so we can do checks on it
    cy.wrap($card).as("currentCard");

    // Check the current card contains an image with a src that is not empty
    cy.get("@currentCard")
      .find("img")
      .should("have.attr", "src")
      .should("not.be.empty");

    // Check the current card contains a h2 - all have different text so check present and not empty
    cy.get("@currentCard").find("h2").invoke("text").should("not.be.empty");

    // Check the current card contains the expected text (all have the same text so makes it easy to write a single step to check this)
    cy.get("@currentCard")
      .find("p")
      .should(
        "have.text",
        "This is a media card. You can use this section to describe the content."
      );

    // Check the current card contains a link with text "view"
    cy.get("@currentCard").find("a").should("have.text", "View");
  });
});

When("I click a view button I am taken to the image on the card", () => {
  // Make it more interessting pick a random view button each time so we aren't testing the same link each time
  cy.get(
    "div[class='MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-16vq84g-MuiPaper-root-MuiCard-root']"
  ).then((cards) => {
    const total_cards = Cypress.$(cards).length;
    cy.log("Total cards: " + total_cards);
    const random_card = Math.floor(Math.random() * total_cards);
    cy.log("The card to test this time is at position: " + random_card);

    // Get the img element at the random position and save the src
    cy.get(
      "div[class='MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-16vq84g-MuiPaper-root-MuiCard-root']"
    )
      .eq(random_card)
      .find("img")
      .then((image) => {
        // Save the image src
        const src = image.attr("src");

        // Now get the href at the same position
        cy.get(
          "div[class='MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-16vq84g-MuiPaper-root-MuiCard-root']"
        )
          .eq(random_card)
          .find("a")
          .then((link) => {
            const href = link.attr("href");
            cy.log("The Link href is " + href);
            cy.log("The image src is " + src);

            // Now we assert the links are both equal without even following the link (different domains so clicking them isn't an option as that's not allowed in Cypress)
            expect(src).to.equal(href);
          });
      });
  });
});

// We are expecting the button but a bug in the app means we don't see it so I've assumed it would have this selector and when fixed the test would pass
Then("the retry button is present", () => {
  cy.get("button#retry").should("be.visible");
});

When("I swipe an image the image updates", () => {
  cy.get("img#article_image_0").should("be.visible");

  cy.get("img#article_image_0")
    .trigger("mousedown", { which: 1, pageX: 600, pageY: 100 })
    .trigger("mousemove", { which: 1, pageX: -600, pageY: 100 })
    .trigger("mouseup");
});
