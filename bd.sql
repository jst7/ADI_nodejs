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

insert into Usuario (nombre,contraseña,email) values ('jorge','123456','jorge@jorge.com');
insert into Usuario (nombre,contraseña,email) values ('judit','123456','jarge@jorge.com');
insert into Usuario (nombre,contraseña,email) values ('laura','123456','jerge@jorge.com');
insert into Usuario (nombre,contraseña,email) values ('julia','123456','jirge@jorge.com');
insert into Usuario (nombre,contraseña,email) values ('toñi','123456','jurge@jorge.com');
insert into Usuario (nombre,contraseña,email) values ('marga','123456','jorga@jorge.com');
insert into Usuario (nombre,contraseña,email) values ('fran','123456','jorgi@jorge.com');
insert into Usuario (nombre,contraseña,email) values ('eloy','123456','jorgo@jorge.com');
insert into Usuario (nombre,contraseña,email) values ('hector','123456','jorgu@jorge.com');
insert into Usuario (nombre,contraseña,email) values ('Sonia','123456','jorgel@jorge.com');
insert into Usuario (nombre,contraseña,email) values ('Carlos','123456','jorgex@jorge.com');

insert into Tema (usuario,titulo,descripcion) values ('jorge','hola','hola como eres');
insert into Tema (usuario,titulo,descripcion) values ('judit','sola','hola como eres');
insert into Tema (usuario,titulo,descripcion) values ('laura','mola','hola como eres');
insert into Tema (usuario,titulo,descripcion) values ('julia','cola','hola como eres');
insert into Tema (usuario,titulo,descripcion) values ('toñi','tola','hola como eres');
insert into Tema (usuario,titulo,descripcion) values ('marga','kola','hola como eres');
insert into Tema (usuario,titulo,descripcion) values ('fran','nola','hola como eres');
insert into Tema (usuario,titulo,descripcion) values ('eloy','pola','hola como eres');
insert into Tema (usuario,titulo,descripcion) values ('hector','yola','hola como eres');
insert into Tema (usuario,titulo,descripcion) values ('Sonia','sota','hola como eres');
insert into Tema (usuario,titulo,descripcion) values ('Hector','fola','hola como eres');


insert into Decision (tema,descripcion,usuario) values ('hola','holaaaa','jorge');
insert into Decision (tema,descripcion,usuario) values ('hola','holaaaae','judit');
insert into Decision (tema,descripcion,usuario) values ('hola','holaaaae','laura');
insert into Decision (tema,descripcion,usuario) values ('hola','holaaaaw','Sonia');
insert into Decision (tema,descripcion,usuario) values ('sola','holaaaaw','eloy');
insert into Decision (tema,descripcion,usuario) values ('sola','holaaaae','jorge');
insert into Decision (tema,descripcion,usuario) values ('sola','holaaaae','laura');
insert into Decision (tema,descripcion,usuario) values ('sola','holaaaaw','jorge');
insert into Decision (tema,descripcion,usuario) values ('sola','holaaaar','jorge');
insert into Decision (tema,descripcion,usuario) values ('sola','holaaaat','judit');
insert into Decision (tema,descripcion,usuario) values ('ser','holaaaay','laura');
insert into Decision (tema,descripcion,usuario) values ('ser','holaaaau','judit');
insert into Decision (tema,descripcion,usuario) values ('ser','holaaaia','jorge');

END$$