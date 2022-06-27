INSERT INTO person(name, password, createdAt, updatedAt)
VALUES
	("Anja", "$2b$12$ju4TuKYylh5XOemqgibGhu7OCb6O83Xstp44mFkt4d4NOTWCoFL2y", NOW(), NOW()),
	("Annika", "$2b$12$1Ilp1wAvk7Au3Fe6EGS9WuPul9JeCjEOO7W.2l4GhQ5J.mVDqTfOa", NOW(), NOW()),
	("Leo", "$2b$12$1eYnk6lLCkPMS5WwefqSBuMSbclagz.SXjgn4ERJZTRRjLUvq.muK", NOW(), NOW()),
	("Philip", "$2b$12$KHNR3xUWshZkZPtMJfPovuKb6qpa2A67pJKgiui3OzbhMifgvQF0G", NOW(), NOW()),
	("Uli", "$2b$12$KHNR3xUWshZkZPtMJfPovuKb6qpa2A67pJKgiui3OzbhMifgvQF0G", NOW(), NOW()),
	("Alex", "$2b$12$KHNR3xUWshZkZPtMJfPovuKb6qpa2A67pJKgiui3OzbhMifgvQF0G", NOW(), NOW()),
	("Ronja", "$2b$12$KHNR3xUWshZkZPtMJfPovuKb6qpa2A67pJKgiui3OzbhMifgvQF0G", NOW(), NOW());
	

INSERT INTO transaction(group_id, creditor_id, description, time, amount, createdAt, updatedAt)
VALUES
	(3, 1, "Himbeeren", "2022-05-22 12:00:00", 7, NOW(), NOW()),
	(2, 2, "Feigen", "2022-05-23 12:00:00", 2, NOW(), NOW()),
	(2, 3, "Stachelbeeren", "2022-05-21 12:00:00", 4, NOW(), NOW()),
	(2, 4, "Datteln", "2022-05-24 12:00:00", 1, NOW(), NOW()),
	(1, 1, "Parken", "2022-06-27 12:50:00", 2, NOW(), NOW()),
	(1, 1, "Bier", "2022-06-27 13:00:00", 25.70, NOW(), NOW()),
	(1, 2, "Schokoerdbeeren", "2022-06-27 13:30:00", 12, NOW(), NOW()),
	(1, 5, "Bratwurstsemmeln", "2022-06-27 13:35:00", 12, NOW(), NOW()),
	(1, 4, "Knoblauchcreme", "2022-06-27 13:40:00", 3.40, NOW(), NOW()),
	(1, 6, "Brezen", "2022-06-27 13:35:00", 5, NOW(), NOW()),
	(1, 7, "Lebkuchenherz", "2022-06-27 14:00:00", 12.50, NOW(), NOW()),
	(1, 1, "Sprit", "2022-06-27 14:00:00", 5, NOW(), NOW());

INSERT INTO debtor(transaction_id, person_id)
VALUES
	(5, 1),
	(5, 2),
	(5, 3),
	(5, 4),
	(5, 5),
	(5, 6),
	(5, 7),
	(6, 5),
	(6, 2),
	(6, 4),
	(7, 2),
	(7, 7),
	(7, 1),
	(8, 6),
	(8, 3),
	(8, 4),
	(9, 4),
	(9, 2),
	(9, 3),
	(9, 5),
	(10, 1),
	(10, 2),
	(10, 3),
	(10, 4),
	(10, 5),
	(10, 6),
	(10, 7),
	(11, 7),
	(11, 4),
	(11, 5),
	(12, 2),
	(12, 3),
	(12, 4),
	(12, 5),
	(12, 6),
	(12, 7);

INSERT INTO usergroup(name, createdAt, updatedAt)
VALUES	
	("Bergfest Amberg",NOW(), NOW()),
	("Urlaub", NOW(), NOW()),
	("Cocktailabend", NOW(), NOW());

INSERT INTO group_users(person_id, usergroup_id)
VALUES
	(1, 2),
	(1, 1),
	(2, 1),
	(3, 1),
	(4, 1),
	(5, 1),
	(6, 1),
	(7, 1),
	(1, 3),
	(2, 3),
	(4, 2),
	(3, 2);
