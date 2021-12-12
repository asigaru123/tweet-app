INSERT INTO user(email, password, username, role) VALUES('test1@xxx.com', '$2a$10$qYytojlVY1iw/Srn8zUcTuBnmHae177.cuiUIfBQIo8EiyE1u8Mxe', 'test1', 1);
INSERT INTO user(email, password, username, role) VALUES('test2@', '$2a$10$qYytojlVY1iw/Srn8zUcTuBnmHae177.cuiUIfBQIo8EiyE1u8Mxe', 'test2', 0);
INSERT INTO user(email, password, username, role) VALUES('test3@', '$2a$10$qYytojlVY1iw/Srn8zUcTuBnmHae177.cuiUIfBQIo8EiyE1u8Mxe', 'test3', 0);

INSERT INTO tweet(email, time, updatetime, tweet) VALUES('test1@', '2021-10-10 11:11:11', '2021-10-10 11:11:11', 'text1');
INSERT INTO tweet(email, time, updatetime, tweet) VALUES('test1@', '2021-10-10 11:11:11', '2021-10-10 11:11:11', 'text11');
INSERT INTO tweet(email, time, updatetime, tweet) VALUES('test1@', '2021-10-10 11:11:11', '2021-10-10 11:11:11', 'text111');

INSERT INTO tweet(email, time, updatetime, tweet) VALUES('test2@', '2021-10-10 11:11:11', '2021-10-10 11:11:11', 'text2');
INSERT INTO tweet(email, time, updatetime, tweet) VALUES('test2@', '2021-10-10 11:11:11', '2021-10-10 11:11:11', 'text22');
INSERT INTO tweet(email, time, updatetime, tweet) VALUES('test2@', '2021-10-10 11:11:11', '2021-10-10 11:11:11', 'text222');

INSERT INTO tweet(email, time, updatetime, tweet) VALUES('test3@', '2021-10-10 11:11:11', '2021-10-10 11:11:11', 'text3');
INSERT INTO tweet(email, time, updatetime, tweet) VALUES('test3@', '2021-10-10 11:11:11', '2021-10-10 11:11:11', 'text33');
INSERT INTO tweet(email, time, updatetime, tweet) VALUES('test3@', '2021-10-10 11:11:11', '2021-10-10 11:11:11', 'text333');

INSERT INTO tweetlike(email, tweetid) VALUES('test1@', 4);
INSERT INTO tweetlike(email, tweetid) VALUES('test1@', 8);
INSERT INTO tweetlike(email, tweetid) VALUES('test1@', 9);
INSERT INTO tweetlike(email, tweetid) VALUES('test2@', 1);
INSERT INTO tweetlike(email, tweetid) VALUES('test3@', 4);
INSERT INTO tweetlike(email, tweetid) VALUES('test3@', 1);

INSERT INTO tweetcomment(email, tweetid, time, comment) VALUES('test1@', 1, '2021/10/10 11:11:12', 'comment_test1');
INSERT INTO tweetcomment(email, tweetid, time, comment) VALUES('test1@', 1, '2021/10/10 11:11:13', 'comment_test2');
INSERT INTO tweetcomment(email, tweetid, time, comment) VALUES('test1@', 1, '2021/10/10 11:11:14', 'comment_test3');
INSERT INTO tweetcomment(email, tweetid, time, comment) VALUES('test1@', 4, '2021/10/10 11:11:12', 'comment_test1');
INSERT INTO tweetcomment(email, tweetid, time, comment) VALUES('test1@', 4, '2021/10/10 11:11:13', 'comment_test2');
INSERT INTO tweetcomment(email, tweetid, time, comment) VALUES('test1@', 4, '2021/10/10 11:11:14', 'comment_test3');

INSERT INTO follow(email, followemail, time) VALUES('test1@', 'test2@', '2021-10-1 11:11:12');
INSERT INTO follow(email, followemail, time) VALUES('test2@', 'test1@', '2021-10-1 11:11:12');
INSERT INTO follow(email, followemail, time) VALUES('test3@', 'test1@', '2021-10-1 11:11:12');
INSERT INTO follow(email, followemail, time) VALUES('test3@', 'test2@', '2021-10-1 11:11:12');