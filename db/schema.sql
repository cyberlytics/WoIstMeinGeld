;-- this table has a counterpart in .root/backend/models/person.model.ts
CREATE TABLE person(
    id int UNSIGNED NOT NULL AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    password varchar(64) NOT NULL,
    createdAt datetime NOT NULL,
    updatedAt datetime NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE transaction(
    id int UNSIGNED NOT NULL AUTO_INCREMENT,
    group_id int UNSIGNED NOT NULL,
    creditor_id int UNSIGNED NOT NULL,
    description varchar(100) NOT NULL,
    time datetime NOT NULL,
    amount float NOT NULL,
    createdAt datetime NOT NULL,
    updatedAt datetime NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE friendship(
    person1ID int UNSIGNED NOT NULL,
    person2ID int UNSIGNED NOT NULL,
    PRIMARY KEY (person1ID, person2ID)
);
