INSERT INTO person(name, createdAt, updatedAt)
VALUES
	("Hans", GETDATE(), GETDATE()),
	("Franz", GETDATE(), GETDATE()),
	("Sepp", GETDATE(), GETDATE()),
	("Dieter", GETDATE(), GETDATE());

INSERT INTO friendship(person1ID, person2ID)
VALUES
	(1, 2),
	(1, 3),
	(1, 4);