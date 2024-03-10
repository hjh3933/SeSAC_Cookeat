-- Active: 1707112054461@@127.0.0.1@3306@sesac

show tables;
DESC Users;
DESC posts;
DESC FOLLOWS;
DESC bookmarks;
SELECT * from posts;
SELECT * from users;
SELECT * from bookmarks;
SELECT * from FOLLOWS;
-- postId, title, content, img, category createdAt, updatedAt, id
insert into users
VALUES(null, 'allie', '1234', '앨리',null, NOW(),NOW());
insert into users VALUES(null, 'allie3', '1234', '앨리3', null, NOW(),NOW());
insert into users VALUES(null, 'allie4', '1234', '앨리4', null, NOW(),NOW());
insert into users VALUES(null, 'allie5', '1234', '앨리5', null, NOW(),NOW());

INSERT INTO posts 
VALUES (NULL,"jisu4", "hi~~~~~",NULL,"한식",NOW(),NOW(), 1);
INSERT INTO posts 
VALUES (NULL,"아메리카노", "오늘의 요리는",NULL,"중식",NOW(),NOW(), 5);
INSERT INTO posts 
VALUES (NULL,"핫식스", "ㅎㅎㅎㅎㅎㅎㅎ",NULL,"일식",NOW(),NOW(), 4);
INSERT INTO posts 
VALUES (NULL,"부르게스타", "gggggggggggggg",NULL,"채식",NOW(),NOW(), 4);
INSERT INTO posts 
VALUES (NULL,"돼지목살샐러드", "ffffffffff",NULL,"채식",NOW(),NOW(), 4);
INSERT INTO posts 
VALUES (NULL,"간장치킨", "ㅇㅇㅇㅇㅇㅇㅇㅇ",NULL,"채식",NOW(),NOW(), 4);
INSERT INTO posts 
VALUES (NULL,"일이삼사오육칠팔구십십일십이십삼십사십오", "ㅋㅋㅋㅋㅋㅋㅋㅋ",NULL,"채식",NOW(),NOW(), 4);
INSERT INTO posts 
VALUES (NULL,"ddd", "일이삼사오육칠팔구십십일십이십삼십사십",NULL,"채식",NOW(),NOW(), 4);

DELETE FROM follows; 
SELECT * from bookmarks;
SELECT * from follows;
INSERT into bookmarks
VALUES(NULL, Now(),now(),10,2)

select img from `Posts` WHERE postId=1;
