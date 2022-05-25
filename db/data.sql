INSERT INTO person(name, password, createdAt, updatedAt)
VALUES
	("Hans", "password", NOW(), NOW()),
	("Franz", "password", NOW(), NOW()),
	("Sepp", "password", NOW(), NOW()),
	("Dieter", "password", NOW(), NOW());

INSERT INTO friendship(person1ID, person2ID)
VALUES
	(1, 2),
	(1, 3),
	(1, 4);
