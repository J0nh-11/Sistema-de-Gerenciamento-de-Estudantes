
--Esquema

create database if not exists sistema;

USE sistema
create table if not exists pessoa (
    matricula int not null primary key,
    cpf varchar(11) not null,
    nome varchar(250) not null,
    senha varchar(250) not null,
    email varchar(250) not null,
    dataNascimento date not null,
    endereco varchar(250),
    cargo varchar(250) not null
);

create table if not exists login (
    id int AUTO_INCREMENT primary key,
    matricula int not null,
    email varchar(20) not null,
    senha varchar(400) not null,
    foreign key (matricula)
    references
    pessoa(matricula)
    
);

//**create table if not exists Docente (
    matricula int not null primary key,
    cpf varchar(11),
    nome varchar(250),
    senha varchar(250),
    email varchar(250),
    dataNascimento varchar(250),
    endereco varchar(250),
    materiaResponsalvel varchar(250),
    cargo varchar(250),
    foreign key (matricula)
    references
    Docente(matricula),
) **//

//**
create table if not exists Discente (
    matricula int not null primary key,
    cpf varchar(11),
    nome varchar(250),
    senha varchar(250),
    email varchar(250),
    dataNascimento varchar(250),
    turma varchar(4)
    endereco varchar(250),
    foreign key (matricula),
    references
    Discente(matricula)
)
**//
