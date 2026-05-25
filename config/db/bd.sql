CREATE TABLE IF NOT EXISTS pessoa (

    id INT PRIMARY KEY AUTO_INCREMENT,

    matricula VARCHAR(20) UNIQUE NOT NULL,

    cpf VARCHAR(11) UNIQUE NOT NULL,

    nome VARCHAR(250) NOT NULL,

    senha VARCHAR(255) NOT NULL,

    email VARCHAR(250) UNIQUE NOT NULL,

    dataNascimento DATE NOT NULL,

    endereco VARCHAR(250),

    cargo ENUM(
        'docente',
        'discente',
        'admin',
        'responsavel'
    ) NOT NULL
);



CREATE TABLE IF NOT EXISTS docente (

    matricula VARCHAR(20) PRIMARY KEY,

    especialidade VARCHAR(250),

    formacao VARCHAR(250),

    salario DECIMAL(10,2),

    FOREIGN KEY (matricula)
        REFERENCES pessoa(matricula)
        ON DELETE CASCADE
);



CREATE TABLE IF NOT EXISTS discente (

    matricula VARCHAR(20) PRIMARY KEY,

    turma VARCHAR(10),

    curso VARCHAR(100),

    FOREIGN KEY (matricula)
        REFERENCES pessoa(matricula)
        ON DELETE CASCADE
);



CREATE TABLE IF NOT EXISTS responsavel (

    matricula VARCHAR(20) PRIMARY KEY,

    parentesco VARCHAR(100) NOT NULL,

    FOREIGN KEY (matricula)
        REFERENCES pessoa(matricula)
        ON DELETE CASCADE
);



CREATE TABLE IF NOT EXISTS disciplina (

    id INT PRIMARY KEY AUTO_INCREMENT,

    nome VARCHAR(250) NOT NULL,

    docente_matricula VARCHAR(20) NOT NULL,

    FOREIGN KEY (docente_matricula)
        REFERENCES docente(matricula)
        ON DELETE CASCADE
);



CREATE TABLE IF NOT EXISTS matricula_disciplina (

    id INT PRIMARY KEY AUTO_INCREMENT,

    discente_matricula VARCHAR(20) NOT NULL,

    disciplina_id INT NOT NULL,

    UNIQUE (discente_matricula, disciplina_id),

    FOREIGN KEY (discente_matricula)
        REFERENCES discente(matricula)
        ON DELETE CASCADE,

    FOREIGN KEY (disciplina_id)
        REFERENCES disciplina(id)
        ON DELETE CASCADE
);



CREATE TABLE IF NOT EXISTS frequencia (

    id INT PRIMARY KEY AUTO_INCREMENT,

    discente_matricula VARCHAR(20) NOT NULL,

    disciplina_id INT NOT NULL,

    data_aula DATE NOT NULL,

    presente ENUM('P', 'F') NOT NULL,

    UNIQUE (
        discente_matricula,
        disciplina_id,
        data_aula
    ),

    FOREIGN KEY (discente_matricula)
        REFERENCES discente(matricula)
        ON DELETE CASCADE,

    FOREIGN KEY (disciplina_id)
        REFERENCES disciplina(id)
        ON DELETE CASCADE
);



CREATE TABLE IF NOT EXISTS nota (

    id INT PRIMARY KEY AUTO_INCREMENT,

    discente_matricula VARCHAR(20) NOT NULL,

    disciplina_id INT NOT NULL,

    nota DECIMAL(4,2) NOT NULL,

    bimestre ENUM(
        'primeiro',
        'segundo',
        'terceiro',
        'quarto'
    ) NOT NULL,

    UNIQUE (
        discente_matricula,
        disciplina_id,
        bimestre
    ),

    FOREIGN KEY (discente_matricula)
        REFERENCES discente(matricula)
        ON DELETE CASCADE,

    FOREIGN KEY (disciplina_id)
        REFERENCES disciplina(id)
        ON DELETE CASCADE
);



CREATE TABLE IF NOT EXISTS solicitacoes (

    id INT PRIMARY KEY AUTO_INCREMENT,

    nome VARCHAR(100) NOT NULL,

    cpf VARCHAR(11) UNIQUE NOT NULL,

    senha VARCHAR(255) NOT NULL,

    email VARCHAR(100) UNIQUE NOT NULL,

    tipo_usuario ENUM(
        'discente',
        'docente',
        'responsavel',
        'admin'
    ) NOT NULL,

    status ENUM(
        'PENDENTE',
        'APROVADO',
        'REJEITADO'
    ) DEFAULT 'PENDENTE',

    data_solicitacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);