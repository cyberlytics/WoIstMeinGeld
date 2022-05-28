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

;-- association person - transaction for debtor
CREATE TABLE debtor(
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL,
    `person_id` int UNSIGNED,
    `transaction_id` int UNSIGNED,
    PRIMARY KEY (`person_id`, `transaction_id`),
    FOREIGN KEY (`person_id`) REFERENCES `person` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`transaction_id`) REFERENCES `transaction` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
