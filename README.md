# product-crawlr

A simple product crawler and wishlist

## Instructions

## Docker

If you have Docker set up in your machine, make sure you are switched to linux containers and run

```
$ docker-compose up
```

from cloned folder. It will build up Docker images and after a while, they will be run.
Once run, open a browser and point to http://localhost:3000/ Application will show.

### Postgres

Create a database and user with privileges over it. Edit `server/.env` file with user, password and database name.
Once set up, run `db.sql` script to create the necessary tables.

### Node Server

From a console, cd to `server` folder and run `npm install` after all packages finish installing, run
`npm start`

### React App

From another console, cd to `client` folder and run `npm install`, once again, after finishing install,
run `npm start`

The default browser will run the application.

First product load will take a while.
