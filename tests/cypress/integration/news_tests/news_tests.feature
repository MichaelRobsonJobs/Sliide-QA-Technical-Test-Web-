@NewsTests
Feature:  As a user I want to see my news

    Scenario: News cards are loaded
        Given I open the web site
        When I login with the test account
        Then I am taken to the news page
        Then I an H1 header with text "Todays top news"
        Then text "Some of the latest news articles for today" is present
        Then text "You're all caught up!" is present
        Then text "Go give yourself a pat on the back." is present
        Then I see the copyright section
        Then I can see the news cards
        Then each news card contains an image, text and a view button
        When I swipe an image the image updates

    Scenario: News view button is clicked
        Given I open the web site
        When I login with the test account
        Then I am taken to the news page
        When I click a view button I am taken to the image on the card

    Scenario: News view button is clicked - Bug no retry button present
        Given I open the web site
        Given I go offline
        When I login with the test account
        Then I am taken to the news page
        Then text "Failed to load news" is present
        Then text "Failed to fetch" is present
        Then the retry button is present
