# Übersicht

```
.
├── _backend
│   └── dockerfile.sql
├── _db
│   ├── data.sql
│   └── schema.sql
├── _frontend
│   ├── _public
│   ├── _src
│   ├── index.html
│   └── dockerfile
├── .env
└── docker-compose.yml
```

**Wichtig:**

Die `.env` Datei muss im root Verzeichnis angelegt werden und die 3 Variablen `MYSQL_ROOT_PASSWORD`, `MYSQL_USER` und `MYSQL_PASSWORD` beinhalten.

Das Projekt kann mit

```cmd
docker-compose up --build --force-recreate
```

aus dem root directory heraus gestartet werden. Docker liest darauf die `docker-compose.yml` ein und stellt die definierten Services als Container zur Verfügung. Auf der Datenbank werden bei Start die `.sql`-Scripts `schema.sql` und `data.sql` in dieser Reihenfolge ausgeführt.

Um die Docker-Umgebung wieder zu schließen:

```cmd
docker-compose down
```

# Quellen

Zum Nachlesen hier eine Sammlung an nützlicher Links:

-   [BenzKoder React Node Express](https://www.bezkoder.com/react-node-express-mysql/)
-   [BenzKoder Rest APIs with Express & MySQL](https://www.bezkoder.com/node-js-rest-api-express-mysql/)
-   [Docker und MySQL](https://iamvickyav.medium.com/mysql-init-script-on-docker-compose-e53677102e48)
-   [Docker Fullstack](https://siddharth-lakhara.medium.com/dockerizing-a-full-stack-js-app-ceb99411996e)
-   [Setup MySQL in Docker](https://betterprogramming.pub/setting-up-mysql-database-in-a-docker-d6c69a3e9afe)
-   [Node.js with Typescript & Express](https://www.split.io/blog/node-js-typescript-express-tutorial/)
-   [Frontend-Template from UStark](https://github.com/ulrichstark/web-template)
-   [Sequelize with Typescript](https://stackoverflow.com/questions/60014874/how-to-use-typescript-with-sequelize)
-   [Sequelize with TS official](https://sequelize.org/docs/v6/other-topics/typescript/#usage-of-sequelizedefine)
-   [Sequelize, Express with Typescript (User Accounts)](https://gorrion.io/blog/node-express-js-typescript-sequelize/)
-   [Express Middleware (Official Doc)](https://expressjs.com/en/guide/using-middleware.html)
