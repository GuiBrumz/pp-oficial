create database db_tasks;
use db_tasks;
create table tasks(
	id INT auto_increment primary key,
    title VARCHAR(255) not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

select*from tasks;

DELETE from tasks
where id > 0;

create table users(
	id int not null auto_increment primary key,
    name varchar(255) not null,
    password varchar(255) not null,
    email varchar(255) not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);
 
select * from users;