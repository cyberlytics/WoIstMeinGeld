# Wo ist mein Geld?

Nach einem gemeinsamen Urlaub mit Freunden, bei denen man sich untereinander immer wieder Geld
ausgelegt hat, ist die Verwirrung darüber, wer wem wie viel Geld schuldet, oft vorprogrammiert.
Um dem entgegen zu wirken, bieten wir nun eine Lösung: Die Anwendung "Wo ist mein Geld?" erlaubt
den Benutzern für verschiedene Anlässe stets den Überblick über gemeinsame Ausgaben mit Freunden
oder Kollegen zu bewahren.

## Einrichtung

Installieren von Node, Yarn, Docker Desktop und VS Code + Prettier Extension.

Im Wurzelverzeichnis eine `.env` Datei mit folgenden Parametern erstellen und diese auch nach /backend kopieren.

| Parameter           | Bedeutung                   |
| ------------------- | --------------------------- |
| MYSQL_ROOT_PASSWORD | Password for root access    |
| MYSQL_DB_NAME       | Name of used database       |
| MYSQL_USER          | Username to access database |
| MYSQL_PASSWORD      | Password to access database |
| MYSQL_HOST          | Host to access database     |
| MYSQL_PORT          | Port to access database     |
| NODE_DOCKER_PORT    | Port of backend             |
| CLIENT_ORIGIN       | URL of frontend             |

## Datenbank

Datenbank kann gestartet werden, indem Docker Desktop geöffnet und folgender Befehl im Wurzelverzeichnis ausgeführt wird:

```cmd
docker-compose up --build --force-recreate
```

Um den Docker Container zu beenden, um Änderungen in `schema.sql` und `data.sql` wirksam zu machen, folgenden Befehl ausführen und die Datenbank danach wieder starten:

```cmd
docker-compose down
```

## Backend

Vor dem ersten Starten und immer nachdem sich Dependencies des Backends geändert haben, müssen mithilfe des Befehls `yarn` die neusten Dependencies installiert werden.

Gestartet werden kann das Backend mit folgendem Befehl:

```cmd
yarn serve
```

## Frontend

Vor dem ersten Starten und immer nachdem sich Dependencies des Frontends geändert haben, müssen mithilfe des Befehls `yarn` die neusten Dependencies installiert werden.

Gestartet werden kann das Frontend mit folgendem Befehl:

```cmd
yarn start
```

Tests werden mit folgendem Befehl gestartet:

```cmd
yarn test
```

... und mit grafischem Interface:

```cmd
yarn test-ui
```
