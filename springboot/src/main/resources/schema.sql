CREATE TABLE user(email VARCHAR(20) PRIMARY KEY, password VARCHAR(100), username VARCHAR(20), role INT, profileImage VARCHAR(5000));

CREATE TABLE tweet(
				id int AUTO_INCREMENT PRIMARY KEY,
				email VARCHAR(30),
				time DATETIME,
				updatetime DATETIME,
				tweet VARCHAR(100),
				foreign key(email) references user(email) on delete cascade on update cascade
			);

CREATE TABLE tweetlike(
				id int AUTO_INCREMENT PRIMARY KEY,
				email VARCHAR(30),
				tweetid int,
				foreign key(tweetid) references tweet(id) on delete cascade on update cascade
			);

CREATE TABLE tweetcomment(
				id int AUTO_INCREMENT PRIMARY KEY,
				email VARCHAR(30),
				tweetid int,
				comment VARCHAR(100),
				time VARCHAR(30),
				foreign key(email) references user(email) on delete cascade on update cascade,
				foreign key(tweetid) references tweet(id) on delete cascade on update cascade
			);

CREATE TABLE follow(
				id int AUTO_INCREMENT PRIMARY KEY,
				email VARCHAR(30),
				followemail VARCHAR(30),
				time DATETIME,
				foreign key(email) references user(email) on delete cascade on update cascade,
				foreign key(followemail) references user(email) on delete cascade on update cascade
			);