# node-final-project

This is my final node.js project.

> ### Requirements:
>
> - Node.js
> - npm (node package manager)
> - MongoDB

### Setup:

- Run command "npm install" in the terminal.

- Setup MongoDB:

  - Create 2 dbs: **users** and **subscriptions**
  - Create a collection in **users** called users, and initialize it with the admin user. Give it 2 properties: username & password.
  - **_Important!_** Change the default \_id property given by the server to "_60da3477f688cc28efe0de45_". Another safer way is to manually change the string "_60da3477f688cc28efe0de45_" all over the project to the new id you've gotten.
  - In the subscriptions db, create 3 collections: subscriptions, movies, and members.

- Uncomment the setup function at /subscriptions-ws/app.js

- Create a .env file with one line in it:
  > EXPRESS_SESSION_SECRET={ a random string}
