INSERT INTO person(name, password, createdAt, updatedAt)
VALUES
	("Hans", "$2b$12$ju4TuKYylh5XOemqgibGhu7OCb6O83Xstp44mFkt4d4NOTWCoFL2y", NOW(), NOW()),
	("Franz", "$2b$12$1Ilp1wAvk7Au3Fe6EGS9WuPul9JeCjEOO7W.2l4GhQ5J.mVDqTfOa", NOW(), NOW()),
	("Sepp", "$2b$12$1eYnk6lLCkPMS5WwefqSBuMSbclagz.SXjgn4ERJZTRRjLUvq.muK", NOW(), NOW()),
	("Dieter", "$2b$12$KHNR3xUWshZkZPtMJfPovuKb6qpa2A67pJKgiui3OzbhMifgvQF0G", NOW(), NOW());

INSERT INTO transaction(group_id, creditor_id, description, time, amount, createdAt, updatedAt)
VALUES
	(0, 1, "Eis essen", "2022-05-23 13:57:57", 12, NOW(), NOW()),
	(0, 4, "Burger essen", "2022-05-22 13:57:57", 42.8, NOW(), NOW()),
	(0, 3, "Kasten Bier", "2022-04-22 13:57:57", 14.3, NOW(), NOW()),
	(0, 3, "Kinoticket", "2022-05-07 13:57:57", 9, NOW(), NOW()),
	(0, 2, "Benzin", "2022-04-17 13:57:57", 120.55, NOW(), NOW());

INSERT INTO debtor(transaction_id, person_id)
VALUES
	(1, 1),
	(1, 4),
	(2, 1),
	(2, 2),
	(2, 3),
	(2, 4);

INSERT INTO usergroup(name)
VALUES	
	("Gruppe 1"),
	("Urlaub"),
	("Cocktailabend");


INSERT INTO group_user(person_id, usergroup_id)
VALUES
	(1, 2),
	(1, 1),
	(1, 3);

