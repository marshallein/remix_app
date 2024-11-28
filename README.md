# eCommerce App with Remix and Prisma ORM

## Index:
- Tech stack of this project.
- How to setup and install this project ( ofc in full detail ).

### Techstack:
- [Remix](remix.run): a React framework use to build full stack web application.
- [Prisma](https://www.prisma.io/): a simple ORM (Object Relational Mapping) to help simplify and easy to interact with database.
- [Bootstrap](https://getbootstrap.com/): a css library...
- [PostgreSQL](https://www.postgresql.org/) Database:a open source database that use in this project!

### How to setup (Local Environment):

#### Prerequisite:
- Nodejs: using LTS (22.11.0) version is recommended ([how to install](https://nodejs.org/en/download/prebuilt-installer))
- PostgreSQL database
- Visual Studio Code (or any code editor)

#### Steps:
- [Setup](https://www.prisma.io/dataguide/postgresql/setting-up-a-local-postgresql-database) your database in PostgreSQL 
- Clone this project (or download it and simply open it in explorer)
- Open this project with Visual Studio Code
**Important! remember your configuration of PostgreSQL database (port, user, password, schema)**
- create the *'.env'* file 
![.env file](https://lh3.googleusercontent.com/pw/AP1GczMHQe7Q4Kj5tspNDyrAf1hgB1BPxsSVgUR9ufUpqibWJ0Df32_bW-lXyx2lRAtwHnyPJTkSaH5PDEQQBOlR7qHOyDdqjvnxnlGVV_4-KGIwzyKvVFw-LB7LQn3fOwNfneH4vt9fR-68-2goJikJaNQy=w376-h510-s-no-gm?authuser=0)

- Add DATABASE_URL value to *'.env'* file and edit accordingly by the configuration of the PostgreSQL database (this is not your database_url but the database_url should look like this) this is your connection string, more onto that in [here](https://pris.ly/d/connection-strings)
- 
![database_url](https://lh3.googleusercontent.com/pw/AP1GczPoOTjJVBoQdRhrCYV5zVLApfKcZiX3OAJELW5Wg8Z16IHSmf4s_oqtSpxrZSIcVRVf54JI8IsC4VLp5AjnlGOZJYj4OooJwdM5gGmLiLek2oUyw6knYH9GjB86YVMGT6ke_yqmLXjpgK0TABHv96cR=w720-h36-s-no-gm?authuser=0)

- Open the terminal of the VSC (Visual Studio Code in short):
    - check to see if nodeJs are available in your computer by simply type:
    ``node -v``
    - should appear like this when you type the command in terminal: 
    
    >  v18.17.1 

    *disclaimer: this is not the version you are currently installed, v22.11.0 is the correct one*
    - run the next command to install the dependencies in this project
    ``npm install``
    - run this command to sync the prisma to database: 
    ``npx prisma db push``
    - run the db seed to add data to the database:
    ``npx tsx prisma/seed/seed.ts``
    - Now you should have everything to start the local server
    - 
- Run this command to start the server: 
> npm run dev

