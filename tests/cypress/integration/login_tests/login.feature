@loginTests
Feature: As a user I want to log in to the web site

Scenario: User access the web site for first time (when not logged in yet)
Given I open the web site
Then I see the login form
Then I an H1 header with text "Sign in"
Then I see the username input field
Then I see the password input field
Then I see the sign in button
Then I see the copyright section




#Scenario: User login failed
#Given the user provides wrong user name and/or password
#When sign in button is clicked
#Then error markers are displayed by user name and/or password entries

#Scenario: User login succeed (credentials provided below)
#Given the user provided right user name and password
#When sign in button is clicked
#Then user is taken to the news page

#Scenario: User opens web site next time (when previously logged in) - Doesn't work this is to raise a bug ticket I guess
#Given the user opens web site next time (when previously logged in)
#Then user is taken straight to the news page



# DONE
# Scenario 1
#Given the user opens web site for the first time (when not logged in yet)
#Then login screen with user name and password entries and login button is displayed