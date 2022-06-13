INSERT INTO person(name, password, createdAt, updatedAt)
VALUES
	("Hans", "$2b$12$ju4TuKYylh5XOemqgibGhu7OCb6O83Xstp44mFkt4d4NOTWCoFL2y", NOW(), NOW()),
	("Franz", "$2b$12$1Ilp1wAvk7Au3Fe6EGS9WuPul9JeCjEOO7W.2l4GhQ5J.mVDqTfOa", NOW(), NOW()),
	("Sepp", "$2b$12$1eYnk6lLCkPMS5WwefqSBuMSbclagz.SXjgn4ERJZTRRjLUvq.muK", NOW(), NOW()),
	("Dieter", "$2b$12$KHNR3xUWshZkZPtMJfPovuKb6qpa2A67pJKgiui3OzbhMifgvQF0G", NOW(), NOW());

INSERT INTO transaction(group_id, creditor_id, description, time, amount, createdAt, updatedAt)
VALUES
	(3, 1, "Himbeeren", "2022-05-22 12:00:00", 3, NOW(), NOW()),
	(1, 2, "Feigen", "2022-05-23 12:00:00", 2, NOW(), NOW()),
	(2, 3, "Stachelbeeren", "2022-05-21 12:00:00", 4, NOW(), NOW()),
	(2, 4, "Datteln", "2022-05-24 12:00:00", 1, NOW(), NOW());

INSERT INTO debtor(transaction_id, person_id)
VALUES
	(1, 2),
	(1, 3),
	(1, 4),
	(2, 1),
	(2, 3),
	(2, 4),
	(3, 1),
	(3, 2),
	(3, 4),
	(4, 1),
	(4, 2),
	(4, 3);

INSERT INTO usergroup(name, createdAt, updatedAt)
VALUES	
	("Gruppe 1",NOW(), NOW()),
	("Urlaub", NOW(), NOW()),
	("Cocktailabend", NOW(), NOW());

INSERT INTO group_users(person_id, usergroup_id)
VALUES
	(1, 2),
	(1, 1),
	(1, 3),
	(2, 3),
	(3, 2);
