INSERT INTO person(name, createdAt, updatedAt)
VALUES
	("Hans", NOW(), NOW()),
	("Franz", NOW(), NOW()),
	("Sepp", NOW(), NOW()),
	("Dieter", NOW(), NOW());

INSERT INTO transaction(group_id, creditor_id, description, time, amount, createdAt, updatedAt)
VALUES
	(0, 1, "Eis essen", NOW(), 35, NOW(), NOW());

-- INSERT INTO friendship(person1ID, person2ID)
-- VALUES
-- 	(1, 2),
-- 	(1, 3),
-- 	(1, 4);