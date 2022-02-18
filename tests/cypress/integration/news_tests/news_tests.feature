@NewsTests
Feature:  As a user I want to see my news

   # Scenario: News cards are loaded
    #    Given I open the web site
     #   When I login with the test account
      #  Then I am taken to the news page
       # Then I an H1 header with text "Todays top news"
    #    Then text "Some of the latest news articles for today" is present
    #    Then text "You're all caught up!" is present
    #    Then text "Go give yourself a pat on the back." is present
    #    Then I see the copyright section
     #   Then I can see the news cards
      #  Then each news card contains an image, text and a view button
       # When I swipe an image the image updates
        # swipe the image and make sure it changes the value hidden changes from false to true  come back to swip!!!!


    Scenario: News view button is clicked
        Given I open the web site
        When I login with the test account
        Then I am taken to the news page
        When I click a view button I am taken to the image on the card


#Scenario: News cards are loaded
#Given there is internet connection
#When the user successfully signs in to the app
#Then news cards are displayed in rows and each card contains an image, text and a view button (cards can have one or more images scrollable horizontally)

#Scenario: Failed to load news
#Given there is no internet connection
#When the user successfully signs in to the app
#Then “failed to load news” error message and a Retry button are displayed



# Done
#Scenario: News view button is clicked
#Given - the news cards are successfully loaded on the screen
#When - the user clicks on the view button of the card
#Then - user is navigated to the image of the card