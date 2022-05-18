INSERT INTO person (name, createdAt, updatedAt) VALUES ("Hans", GETDATE(), GETDATE());
INSERT INTO person (name, createdAt, updatedAt) VALUES ("Frans", GETDATE(), GETDATE());
INSERT INTO person (name, createdAt, updatedAt) VALUES ("Sepp", GETDATE(), GETDATE());
INSERT INTO person (name, createdAt, updatedAt) VALUES ("Dieter", GETDATE(), GETDATE());

INSERT INTO friendship (person1ID, person2ID) VALUES (1, 2);
INSERT INTO friendship (person1ID, person2ID) VALUES (1, 3);
INSERT INTO friendship (person1ID, person2ID) VALUES (3, 4);
