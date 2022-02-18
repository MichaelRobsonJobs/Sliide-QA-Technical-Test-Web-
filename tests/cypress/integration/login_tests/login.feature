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

    Scenario Outline: User login failed - Username & Password incorrect
        Given I open the web site
        When I enter "<username>" for the username
        When I enter "<password>" for the password
        When I click the sign in button
        Then the username error message is displayed with text "<userError>"
        Then the password error message is displayed with text "<passwordError>"

        Examples:
            | username | password      | userError      | passwordError               |
            | mick     | short         | Wrong username | Minimum 8 characters length |
            | mick     | wrongPassword | Wrong username | Password incorrect          |

    Scenario Outline: User login failed - Username correct & Password incorrect
        Given I open the web site
        When I enter "user1" for the username
        When I enter "<password>" for the password
        When I click the sign in button
        Then the username error message is not displayed
        Then the password error message is displayed with text "<passwordError>"

        Examples:
            | password      | passwordError               |
            | short         | Minimum 8 characters length |
            | wrongPassword | Password incorrect          |

    Scenario: User login succeed (credentials provided below)
        Given I open the web site
        When I login with the test account
        Then I am taken to the news page

    Scenario: User opens web site next time (when previously logged in) - This doesn't work I would raise a bug ticket for it
        Given I open the web site
        When I login with the test account
        Then I am taken to the news page
        When I visit the login page
        Then I am taken to the news page
        When I reload the page
        Then I am taken to the news page

# DONE
# Scenario 1
#Given the user opens web site for the first time (when not logged in yet)
#Then login screen with user name and password entries and login button is displayed

# Scenario 2
#Given the user provides wrong user name and/or password
#When sign in button is clicked
#Then error markers are displayed by user name and/or password entries

#Scenario 3
#Scenario: User login succeed (credentials provided below)
#Given the user provided right user name and password
#When sign in button is clicked
#Then user is taken to the news page

#Scenario 4
#Scenario: User opens web site next time (when previously logged in) - Doesn't work this is to raise a bug ticket I guess
#Given the user opens web site next time (when previously logged in)
#Then user is taken straight to the news page