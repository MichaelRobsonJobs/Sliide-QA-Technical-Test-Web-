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

    // Check the current card contains the expected text
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
    const TOTAL_CARDS = Cypress.$(cards).length;
    cy.log("Total cards: " + TOTAL_CARDS);
    const RANDOM_CARD = Math.floor(Math.random() * TOTAL_CARDS);
    cy.log("The card to test this time is at position: " + RANDOM_CARD);

    // Get the img element at the random position and save the src
    cy.get(
      "div[class='MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-16vq84g-MuiPaper-root-MuiCard-root']"
    )
      .eq(RANDOM_CARD)
      .find("img")
      .then((image) => {
        // Save the image src
        const src = image.attr("src");

        // Now get the href at the same position
        cy.get(
          "div[class='MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-16vq84g-MuiPaper-root-MuiCard-root']"
        )
          .eq(RANDOM_CARD)
          .find("a")
          .then((link) => {
            const href = link.attr("href");
            cy.log("The Link href is " + href);
            cy.log("The image src is " + src);

            // Now we assert the links are both equal without even following the link... (different domains)
            expect(src).to.equal(href);
          });
      });
  });
});

When("I swipe an image the image updates", () => {
  cy.get("img#article_image_0").should("be.visible");

  cy.get("img#article_image_0")
    .trigger("mousedown", { which: 1, pageX: 600, pageY: 100 })
    .trigger("mousemove", { which: 1, pageX: -600, pageY: 100 })
    .trigger("mouseup");
});
