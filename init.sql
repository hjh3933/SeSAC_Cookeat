-- Active: 1707112054461@@127.0.0.1@3306@sesac
show tables;
DESC Users;
DESC posts;
DESC FOLLOWS;
DESC bookmarks;
SELECT * from posts;
SELECT * from users;
SELECT * from bookmarks;
-- postId, title, content, img, category createdAt, updatedAt, id
INSERT INTO posts 
VALUES (NULL,"jisu4", "hi~~~~~",NULL,"한식",NOW(),NOW(), 10);
INSERT INTO posts 
VALUES (NULL,"hansu", "오늘의 요리는",NULL,"중식",NOW(),NOW(), 5);
INSERT INTO posts 
VALUES (NULL,"jisu4", "ㅋㅋㅋㅋㅋㅋㅋㅋ",NULL,"채식",NOW(),NOW(), 4);


SELECT * from bookmarks;
INSERT into bookmarks
VALUES(NULL, Now(),now(),10,2)
