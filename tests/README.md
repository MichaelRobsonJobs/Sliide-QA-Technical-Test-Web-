COMMENT EVERYTHING!!!
run on mac
Merge to master and check read me look ok

# How To Run

## Through command line

1. Start the app by following the instructions in the README.md
2. From the tests folder run `npm install` to pull the dependencies
3. To run all the tests in electron `npm run allTests`
4. To run the login tests in electron `npm run loginTests`
5. To run the news tests in electron `npm run newsTests`

## Through Cypress test runner

1. Start the app by following the instructions in the README.md
2. From the tests folder run `npm install` to pull the dependencies
3. To run all the tests in electron `npm run cypress:open`
4. From the test runner pick the browser (see notes for why you should pick electron)
5. Click on the feature file you wish to run to start the tests

## Linting and prettier checks

I included scripts to run eslint and prettier on the test code. The following scripts can be run to do the checks:

- eslint check: `npm run eslint:check`
- prettier check: `npm run prettier:check`
- prettier fix: `npm run prettier:fix`
- eslint and pretier check: `npm run beforeMerge`

# Notes

- I used different selector types on purpose just to show my understanding of finding elements based on class, ID, name etc

- The code to disable the internet connection contains a bug in Chrome, see this stackoverflow thread and the related open Cypress bug ticket https://stackoverflow.com/questions/70742901/moving-to-offline-mode-using-cypress-returned-a-promise-that-never-resolved the work around is to run in electron which is why I force that browser in the scripts.

- Two sceanrios that I was asked to write failed because of bugs in the code, I still wrote the tests for them assuming the outcome when fixed.

- I added Cypress retries so if a test fails due to a slow network connection etc. it will retry the test one more time.

# Possible improvements

- Create a ticket to include data attributes in the app to make finding elements easier, the react class names can be very long and not easily readable.

- Add junit reports - can be useful to export the artefacts in CI

# Bugs To Raise

**Bug description**
The username provided on the README.md is incorrect

**Steps to reproduce**
View the Login credentials section of the apps README.md

**Expected behaviour**
The username should say user1 (found by looking in LoginForm.js)

**Actual behaviour**
The Readme gives both the username and password as pa55word

**Screenshot**

![Credntials image](bug_details\Credentials.png)

---

**Bug description**
We have a security issue, we are informing potential hackers when they have guessed a valid username. If you enter an invalid user name we display the message "Wrong username", if you enter a valid user name and invalid password we display "Password incorrect"

If a hacker tried a brute force attack with common user names like admin or root we would essentially be telling them when they have guess correctly and they can move onto the password field.

**Steps to reproduce**
From the login form enter an invalid username

**Expected behaviour**
We should never tell a user which part of the username or password is incorrect, instead we should say there was a problem and they should check their username and password

**Actual behaviour**
We tell the user when the username is incorrect.

**Screenshot**
![Invalid User Image](bug_details\InvalidUser.png)
![Invalid Password image](bug_details\InvalidPassword.png)

---

**Bug description**
The view button the news card takes you to the original image that was displayed not the image you have scrolled to.

**Steps to reproduce**
From the news page click and drag an image from one of the news cards to switch to a different image,
Click the view button to open the image.

**Expected behaviour**
The image displayed on the news card is the image we will load when clicking view.

**Actual behaviour**
The original image that was present on the card when the page loaded is always the one we display when clicking view.

**Video**

<img src="bug_details\GalleryBug.gif" width="700" height="500">

---

**Bug description**
Scenario "User opens web site next time (when previously logged in)" does not work as expected, refreshing the news page or going back to the home page displays the login form instead of keeping us signed in.

**Steps to reproduce**
Login to the app
When you are taken to the news page reload the page

Login to the app
From the news page revisit the home page

**Expected behaviour**
Refreshing the page or revisintg the login form after we have signed in should take us back to the news page and keep us logged in.

**Actual behaviour**
We aren't setting a cookie or anything in sesion storage to keep us logged in so once we reload the page or revisit the home page we need to login again.

**Video**

<img src="bug_details\LoginIssue.gif" width="700" height="500">

---

**Bug description**
You can login with any username and password as long as the string contains the actual username and password in the value.

**Steps to reproduce**
Enter any combination of prefixing of suffixing either the username and / or password with other text e.g.
set the username to thisIsWronguser1
set the password to pa55wordThisPartIsWrong
Click sign in

**Expected behaviour**
Should display the error message because the username and / or password are wrong

**Actual behaviour**
It doesn't matter what the username or password is set to, if the string contains the valid credentials you will be logged in.

**Video**

<img src="bug_details\ValidationIssue.gif" width="700" height="500">

---

**Bug description**
The site does not work in IE11, it just displays a white screen.

**Steps to reproduce**
Open the website in IE11

**Expected behaviour**
Login page displayed

**Actual behaviour**
A white screen is displayed

**Screenshot**

![IE11](bug_details\IE11.png)

---

**Bug description**
There's a few errors and warning displayed in the console on the news page

**Steps to reproduce**
Open the console in web dev tools
login
see errors and warnings displayed on the news page

**Expected behaviour**
No console errors displayed

**Actual behaviour**
Multiple console errors displayed

**Screenshot**
![Console Errors](bug_details\ConsoleErrors.png)
