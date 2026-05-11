
create database if not exists Sistema;

create table if not exists login (
    matricula int not null primary key;
    email varchar(350) not null,
    senha varchar(400) not null
);

create table if not exists pessoa (
    matricula int not null primary key,
    cpf varchar(11) not null,
    nome varchar(250) not null,
    senha varchar(250) not null,
    email varchar(250) not null,
    dataNascimento data not null,
    endereco varchar(250),
    cargo varchar(250) not null
)

create table if not exists Docente (
    matricula int not null primary key,
    cpf varchar(11),
    nome varchar(250),
    senha varchar(250),
    email varchar(250),
    dataNascimento varchar(250),
    endereco varchar(250),
    materiaResponsalvel varchar(250),
    cargo varchar(250),
)

create table if not exists Discente (
    matricula int not null primary key,
    cpf varchar(11),
    nome varchar(250),
    senha varchar(250),
    email varchar(250),
    dataNascimento varchar(250),
    turma varchar(4)
    endereco varchar(250),
)
