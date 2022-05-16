;-- this table has a counterpart in .root/backend/models/person.model.ts
CREATE TABLE person(
    id int UNSIGNED NOT NULL AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE friendship(
    person1ID int UNSIGNED NOT NULL,
    person2ID int UNSIGNED NOT NULL,
    PRIMARY KEY (person1ID, person2ID)
);
