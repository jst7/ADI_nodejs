Drop Database ADI_Prac;

CREATE DATABASE ADI_Prac;
USE ADI_Prac;

create table Usuario 
(id INT(6) unsigned auto_increment primary key, 
nombre varchar(50) not null, 
contraseña varchar(50) not null,
email varchar(50) not null);
 
create table Problema
(id INT(6) unsigned auto_increment,
usuario varchar(50),
titulo varchar(100) not null,
descripcion varchar(1000) not null,
primary key(id, usuario));

create table Pregunta
(id INT(6) unsigned auto_increment,
Problema varchar(100),
descripcion varchar(100) not null,
usuario varchar(50) not null,
primary key(id, Problema));

create table Soluciones
(id INT(6) unsigned auto_increment,
Pregunta varchar(100),
solucion varchar(100) not null,
usuario varchar(50) not null,
votos INT(6) not null,
primary key(id, Pregunta));

DELIMITER $$
CREATE PROCEDURE vaciar ()
BEGIN
drop table Usuario;
drop table Problema;
drop table Pregunta;
drop table Soluciones;

create table Usuario 
(id INT(6) unsigned auto_increment primary key, 
nombre varchar(50) not null, 
contraseña varchar(50) not null,
email varchar(50) not null);
 
create table Problema
(id INT(6) unsigned auto_increment,
usuario varchar(50),
titulo varchar(100) not null,
descripcion varchar(1000) not null,
primary key(id, usuario));

create table Pregunta
(id INT(6) unsigned auto_increment,
Problema varchar(100),
descripcion varchar(100) not null,
usuario varchar(50) not null,
primary key(id, Problema));

create table Soluciones
(id INT(6) unsigned auto_increment,
Pregunta varchar(100),
solucion varchar(100) not null,
usuario varchar(50) not null,
votos INT(6) not null,
primary key(id, Pregunta));


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

insert into Problema (usuario,titulo,descripcion) values ('jorge','hola','hola como eres');
insert into Problema (usuario,titulo,descripcion) values ('judit','sola','hola como eres');
insert into Problema (usuario,titulo,descripcion) values ('laura','mola','hola como eres');
insert into Problema (usuario,titulo,descripcion) values ('julia','cola','hola como eres');
insert into Problema (usuario,titulo,descripcion) values ('toñi','tola','hola como eres');
insert into Problema (usuario,titulo,descripcion) values ('marga','kola','hola como eres');
insert into Problema (usuario,titulo,descripcion) values ('fran','nola','hola como eres');
insert into Problema (usuario,titulo,descripcion) values ('eloy','pola','hola como eres');
insert into Problema (usuario,titulo,descripcion) values ('hector','yola','hola como eres');
insert into Problema (usuario,titulo,descripcion) values ('Sonia','sota','hola como eres');
insert into Problema (usuario,titulo,descripcion) values ('Hector','fola','hola como eres');


insert into Pregunta (Problema,descripcion,usuario) values ('hola','holaaaa','jorge');
insert into Pregunta (Problema,descripcion,usuario) values ('hola','holaaaae','judit');
insert into Pregunta (Problema,descripcion,usuario) values ('hola','holaaaae','laura');
insert into Pregunta (Problema,descripcion,usuario) values ('hola','holaaaaw','Sonia');
insert into Pregunta (Problema,descripcion,usuario) values ('sola','holaaaaw','eloy');
insert into Pregunta (Problema,descripcion,usuario) values ('sola','holaaaae','jorge');
insert into Pregunta (Problema,descripcion,usuario) values ('sola','holaaaae','laura');
insert into Pregunta (Problema,descripcion,usuario) values ('sola','holaaaaw','jorge');
insert into Pregunta (Problema,descripcion,usuario) values ('sola','holaaaar','jorge');
insert into Pregunta (Problema,descripcion,usuario) values ('sola','holaaaat','judit');
insert into Pregunta (Problema,descripcion,usuario) values ('ser','holaaaay','laura');
insert into Pregunta (Problema,descripcion,usuario) values ('ser','holaaaau','judit');
insert into Pregunta (Problema,descripcion,usuario) values ('ser','holaaaia','jorge');

insert into Soluciones (Pregunta,solucion,usuario, votos) values ('holaaaa','tigre','jorge','0');
insert into Soluciones (Pregunta,solucion,usuario, votos) values ('holaaaa','leon','jorge','0');
insert into Soluciones (Pregunta,solucion,usuario, votos) values ('holaaaa','leon','jorge','0');
insert into Soluciones (Pregunta,solucion,usuario, votos) values ('holaaaa','leon','jorge','0');
END$$