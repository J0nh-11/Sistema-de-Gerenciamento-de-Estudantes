
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
   -- nomeDoMeio varchar(250),
   -- ultimoNome varchar(250) not null,
    senha varchar(250) not null,
    email varchar(250) not null,
    dataNascimento data not null,
    endereco varchar(250),
    cargo varchar(250) not null
)

 -- create table if not exists Docente (
    matricula int not null primary
    cpf 
    nome
    senha
    email
    dataNascimento
    endereco
    materiaResponsalvel
    cargo
--)