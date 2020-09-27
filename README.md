# Max's Trofí! A Grocery List Creator
  This repository is a unique API that stores multiple grocery lists. It provides
  users rights to register and create a grocery list as they are on the go.
  This API allows the users to perform the CRUD actions to their created grocery
  list. Happy Shopping!
## Planning Story
In order to understand the scope of the project, especially the API portion, I read the proposed schedule and requirements. I decided to start with the backend because this was new territory for me. I started creating a model schema that consisted of name of food, date of purchase, quantity, and category. I also created a user schema that consisted of email, a hashed password, and a token. One of my initial concerns was to be able to complete the work in the allotted time with the amount of model schemas that I had created. I was not too concerned about the user schema because I relied on the previous tic tac toe game project experience.
Next on my list, I had to attach the routers. My routes consisted of grocery routes and user routes. Then, I created grocery curl scripts that consisted of create, read, update and destroy actions. In order to continue my work, I had to stop to understand the way in which CRUD actions work. Lastly, I worked on the server end making sure to create the right connections between files. I also made sure to have the correct middleware in app.use to match the required routes, handler, token and logger to ensure that my server was always listening to its server devport.
## Tecnologies Used
-   HTML
-   JavaScript
-   CSS
    +   Flexbox
    +   Bootstrap
-   Mongodb
    +   Express
    +   Cors
    +   Mongoose
#### Links
-   Deployed Front-End: <https://max-spec007.github.io/project2-client/>
-   Deployed Back-End: <https://max-grocery-app-1.herokuapp.com/>
-   Front-End Repository Link: <https://github.com/Max-spec007/project2-client>
-   Back-End Repository Link: <https://github.com/Max-spec007/project2-api>
## Technical Details
 #### User Account
  -Users have the ability to create brand new accounts in order to login.
  -Users have the ability to change their passwords at anytime or to be able to
    sign out as well.
  -Users have the ability to create a new grocery list.
  -Users have the ability to see all of their made grocery lists.
  -Users have the ability to edit one of their made grocery lists.
  -Users have the ability to delete one of their made grocery lists.
## Image
#### ERD Wireframe
![](https://media.git.generalassemb.ly/user/30432/files/dc933e80-f7b5-11ea-802c-e40fb23f54e3)
#### User Stories
-As a user, I want to be able to sign-up.
-As a user, I want to be able to sign-in.
-As a user, I want to be able to change my password.
-As a user, I want to be able to sign-out.
-As a user, I would like to check my past lists
-As a user, I would like to add items to the list.
-As a user, I would like to remove items from the list.
-As a user, I would like to edit items from the list.
## Unsolved Problems/Strived Goals
I would like to add more features to the grocery list creator such as having one
form that does the create, show, edit and delete functions to create a more
interactive user experience. I would like to create a user
schema where users can share a list.
