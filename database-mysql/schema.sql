DROP DATABASE IF EXISTS conversesated;
CREATE DATABASE conversesated;

USE conversesated;

CREATE TABLE users (
  userId int UNSIGNED not null auto_increment,
  name varchar(255) not null unique,
  likes int not null,
  dislikes int not null,
  primary key (userId)
);

CREATE TABLE users_link_chats (
  userId int UNSIGNED not null,
  chatId int UNSIGNED not null
);

CREATE TABLE chats (
  chatId int UNSIGNED not null auto_increment,
  chat text,
  rank int,
  primary key (chatId)
);

CREATE TABLE topics (
  topicId int UNSIGNED not null auto_increment,
  topic text,
  primary key (topicId)
);

Create TABLE user_ranks (
  fromUser int UNSIGNED not null,
  toUser int UNSIGNED not null,
  chatId int UNSIGNED not null,
  rank TINYINT not null,
  feedback text
  /* mysql -u root < server/schema.sql */
);
