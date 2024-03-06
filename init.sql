-- Active: 1709513197474@@127.0.0.1@3306@sesac
show tables;
SHOW DATABASES;
CREATE DATABASE sesac;
DROP DATABASE sesac;
CREATE DATABASE sesac CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

show tables;
DESC Users;
DESC posts;
DESC FOLLOWS;
DESC bookmarks;
SELECT * from posts;
SELECT * from users;
-- postId, title, content, img, category createdAt, updatedAt, id
insert into users
VALUES(null, 'allie', '1234', '앨리',NOW(),NOW());
insert into users VALUES(null, 'allie2', '1234', '앨리2',NOW(),NOW());
insert into users VALUES(null, 'allie3', '1234', '앨리3',NOW(),NOW());
insert into users VALUES(null, 'allie4', '1234', '앨리4',NOW(),NOW());
insert into users VALUES(null, 'allie5', '1234', '앨리5',NOW(),NOW());

INSERT INTO posts 
VALUES (NULL,"jisu4", "hi~~~~~",NULL,"한식",NOW(),NOW(), 4);
INSERT INTO posts 
VALUES (NULL,"hansu", "오늘의 요리는",NULL,"중식",NOW(),NOW(), 5);
INSERT INTO posts 
VALUES (NULL,"jisu4", "ㅋㅋㅋㅋㅋㅋㅋㅋ",NULL,"채식",NOW(),NOW(), 4);
