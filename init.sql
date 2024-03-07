
show tables;
DESC Users;
DESC posts;
DESC FOLLOWS;
DESC bookmarks;
SELECT * from posts;
SELECT * from users;
SELECT * from bookmarks;
-- postId, title, content, img, category createdAt, updatedAt, id
insert into users
VALUES(null, 'allie', '1234', '앨리',NOW(),NOW());
insert into users VALUES(null, 'allie2', '1234', '앨리2',NOW(),NOW());
insert into users VALUES(null, 'allie3', '1234', '앨리3',NOW(),NOW());
insert into users VALUES(null, 'allie4', '1234', '앨리4',NOW(),NOW());
insert into users VALUES(null, 'allie5', '1234', '앨리5',NOW(),NOW());

INSERT INTO posts 
VALUES (NULL,"jisu4", "hi~~~~~",NULL,"한식",NOW(),NOW(), 10);
INSERT INTO posts 
VALUES (NULL,"hansu", "오늘의 요리는",NULL,"중식",NOW(),NOW(), 5);
INSERT INTO posts 
VALUES (NULL,"jisu4", "ㅋㅋㅋㅋㅋㅋㅋㅋ",NULL,"채식",NOW(),NOW(), 4);

DELETE FROM follows; 
SELECT * from bookmarks;
SELECT * from follows;
INSERT into bookmarks
VALUES(NULL, Now(),now(),10,2)

select img from `Posts` WHERE postId=23;
