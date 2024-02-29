-- Active: 1707101290768@@127.0.0.1@3306@sesac
show tables;
DESC Users;
DESC posts;
DESC FOLLOWS;
DESC bookmarks;
SELECT * from posts;
SELECT * from users;
-- postId, title, content, img, category createdAt, updatedAt, id
INSERT INTO posts 
VALUES (NULL,"jisu4", "hi~~~~~",NULL,"한식",NOW(),NOW(), 4);
INSERT INTO posts 
VALUES (NULL,"hansu", "오늘의 요리는",NULL,"중식",NOW(),NOW(), 5);
INSERT INTO posts 
VALUES (NULL,"jisu4", "ㅋㅋㅋㅋㅋㅋㅋㅋ",NULL,"채식",NOW(),NOW(), 4);