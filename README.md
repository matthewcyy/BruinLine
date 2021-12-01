# BruinLine
<img src="./bl-client/src/images/logo_name.png" width="250">

Bruinline is a web application meant to be an alternative, more personalized and customisable version of the UCLA dining hall menu system.

## Pages and Features

- Register page allows the user to create an account

- Login page allows the user to access their profile with logon information

- Home page displays some information about the website with the logo

- Profile page allows the user to change their logon information, see their favorite foods, the groups they are in, and respond to the group invitations that were sent to them

- Group page allows the user to create groups and invite other users to their groups. They can also see which groups they are in and can vote for a dining hall in each of their groups. The voting results are condensed into a bar graph for each group

- Dining Hall page allows the user to see all available dining halls and how many users are 'checked in' to each. The user can 'check in' and 'check out' from a dining hall. Each dining hall's menu is accessible on the dining halls page in a menu dropdown where the user can also favorite foods and write reviews for them

- Reviews Page consolidates all the reviews made for each dining hall. Each review details the user that made the review, the food being reviewed, the date, and the score given (on a scale from 1 to 5). The user can also make a review on this page


## How to Run on Local Machine

Here is how to run BruinLine on your local maching:

1. Run the following commands in the directory you want to clone BruinLine:
  ```
  git clone https://github.com/matthewcyy/BruinLine.git
  cd BruinLine
  ```
2. Split your terminal window or create another window and make sure both are in the BruinLine directory
3. In one terminal, run `cd bl-client`. This window will be used to start the frontend
4. In the other terminal, run `cd bl-client`. This window will be used to start the backend
5. In each terminal, run:
  ```
  npm install
  npn start
  ```
6. The localhost website should be launched automatically but if it isn't, you can naviguate to http://localhost:3000/
Note: Running the application on mac might produce better results
