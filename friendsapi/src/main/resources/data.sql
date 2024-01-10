INSERT INTO Friend(id,firstName,lastName,department,email,country) values(1,'naresh','K', 'CSE', 'naresh3456@gmail.com', 'usa');
INSERT INTO Friend (id,firstName,lastName,department,email,country) values(2,'suresh','M', 'MECH', 'suresh3456@gmail.com', 'India');
INSERT INTO Friend (id,firstName,lastName,department,email,country)values(3,'harish','A', 'IT', 'harish3456@gmail.com', 'China');
INSERT INTO Friend (id,firstName,lastName,department,email,country) values(4,'ram','P', 'CIVIL', 'ram3456@gmail.com', 'London');
INSERT INTO Friend (id,firstName,lastName,department,email,country) values(5,'jones','H', 'ECE', 'jones3456@gmail.com', 'Australia');
--H2
-- ALTER TABLE  friend ALTER COLUMN id RESTART WITH 6;
--MYSQL
ALTER TABLE friend AUTO_INCREMENT = 6;
