Drop Database ADI_Prac;

CREATE DATABASE ADI_Prac;
USE ADI_Prac;

create table Usuario 
(id INT(6) unsigned auto_increment primary key, 
nombre varchar(50) not null, 
contraseña varchar(50) not null,
email varchar(50) not null);
 
create table Tema
(id INT(6) unsigned auto_increment,
usuario varchar(50),
titulo varchar(100) not null,
descripcion varchar(1000) not null,
primary key(id, usuario));

create table Decision
(id INT(6) unsigned auto_increment,
tema varchar(100),
descripcion varchar(100) not null,
usuario varchar(50) not null,
primary key(id, tema));

DELIMITER $$
CREATE PROCEDURE vaciar ()
BEGIN
drop table Usuario;
drop table Tema;
drop table Decision;

create table Usuario 
(id INT(6) unsigned auto_increment primary key, 
nombre varchar(50) not null, 
contraseña varchar(50) not null,
email varchar(50) not null);
 
create table Tema
(id INT(6) unsigned auto_increment,
usuario varchar(50),
titulo varchar(100) not null,
descripcion varchar(1000) not null,
primary key(id, usuario));

create table Decision
(id INT(6) unsigned auto_increment,
tema varchar(100),
descripcion varchar(100) not null,
usuario varchar(50) not null,
primary key(id, tema));

END$$