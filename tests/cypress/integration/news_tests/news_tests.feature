@NewsTests
Feature:  As a user I want to see my news

Scenario: News cards are loaded
Given there is internet connection
When the user successfully signs in to the app
Then news cards are displayed in rows and each card contains an image, text and a view button (cards can have one or more images scrollable horizontally)

Scenario: Failed to load news
Given there is no internet connection
When the user successfully signs in to the app
Then “failed to load news” error message and a Retry button are displayed

Scenario: News view button is clicked
Given - the news cards are successfully loaded on the screen
When - the user clicks on the view button of the card
Then - user is navigated to the image of the card