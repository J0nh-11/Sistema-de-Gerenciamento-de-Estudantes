-- Criação do banco
CREATE DATABASE IF NOT EXISTS sistema;
USE sistema;

--table main  
CREATE TABLE pessoa (
    matricula INT PRIMARY KEY,
    cpf VARCHAR(11) UNIQUE NOT NULL,
    nome VARCHAR(250) NOT NULL,
    senha VARCHAR(250) NOT NULL,
    email VARCHAR(250) UNIQUE NOT NULL,
    dataNascimento DATE NOT NULL,
    endereco VARCHAR(250),
    cargo ENUM('docente', 'discente', 'admin') NOT NULL
);

-- Tabela docente (especialização)
CREATE TABLE IF NOT EXISTS docente (
    matricula INT NOT NULL PRIMARY KEY,
    materiaResponsavel VARCHAR(250),
    FOREIGN KEY (matricula)
        REFERENCES pessoa(matricula)
);

-- Tabela discente (especialização)
CREATE TABLE IF NOT EXISTS discente (
    matricula INT NOT NULL PRIMARY KEY,
    turma VARCHAR(4),
    endereco VARCHAR(250),
    FOREIGN KEY (matricula)
        REFERENCES pessoa(matricula)
);