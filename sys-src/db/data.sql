INSERT INTO person(name, password, createdAt, updatedAt)
VALUES
	("Hans", "password", NOW(), NOW()),
	("Franz", "password", NOW(), NOW()),
	("Sepp", "password", NOW(), NOW()),
	("Dieter", "password", NOW(), NOW());


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
