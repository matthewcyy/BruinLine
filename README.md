# BruinLine

Bruinline is a web application meant to be an alternative, more personalized version of the UCLA dining hall menu system.

# Features

- Register page allows user to create a user profile

- Login page allows user to access their profile with logon information

- Profile page allows user to change their logon information, see their favorite foods, the groups they are in, and the invitations that were sent to them.

- Group page allows user to create groups and invite other users to their groups. They can also see which groups they are in and they can vote for a dining hall in each of their groups. The voting results are condensed into a graph for each group.

- Dining Hall page allows the user to see all available dining halls and how many users are 'checked in' to each. The user can 'check in' and 'check out' from a dining hall. Each dining hall's menu is accessible on the dining halls page, and in the menu dropdown, the user can favorite foods and write reviews for them.

- Reviews Page consolidates all the reviews made for each dining hall. Each review details the user that made the review, the data, the score given, the review written, and the food being reviewed. The user can also create a review on this page.

# How to Run on Local Machine

To Run this web application on your local machine:

1. git clone https://github.com/matthewcyy/BruinLine.git
2. Create two terminals/split your terminal in VS Code
3. cd BruinLine in both terminals
4. In one terminal, cd bl-client and npm install
5. in the other terminal, cd bl-server and npm install
6. npm start in bl-server
7. npm start in bl-client
8. Running the application on mac will produce better results
