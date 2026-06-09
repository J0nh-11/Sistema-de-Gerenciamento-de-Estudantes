CREATE TABLE IF NOT EXISTS pessoa (

    id INT PRIMARY KEY AUTO_INCREMENT,

    matricula VARCHAR(20) UNIQUE NOT NULL,

    cpf VARCHAR(14) UNIQUE NOT NULL,

    nome VARCHAR(250) NOT NULL,

    senha VARCHAR(255) NOT NULL,

    email VARCHAR(250) UNIQUE NOT NULL,

    data_nascimento DATE NOT NULL,

    endereco VARCHAR(250),

    celular VARCHAR(50) UNIQUE NOT NULL,

    cargo ENUM(
        'docente',
        'discente',
        'admin',
        'responsavel'
    ) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS docente (
    
    id INT PRIMARY KEY AUTO_INCREMENT,

    matricula VARCHAR(20),

    especialidade VARCHAR(250),

    formacao VARCHAR(250),

    salario DECIMAL(10,2),

    FOREIGN KEY (matricula)
        REFERENCES pessoa(matricula)
        ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS discente (

    id INT PRIMARY KEY AUTO_INCREMENT,

    matricula VARCHAR(20)   ,

    serie VARCHAR(100),

    turma VARCHAR(10),

    curso VARCHAR(100),

    FOREIGN KEY (matricula)
        REFERENCES pessoa(matricula)
        ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS responsavel (
    
    id INT PRIMARY KEY AUTO_INCREMENT,

    matricula VARCHAR(20),

    parentesco VARCHAR(100) NOT NULL,

    FOREIGN KEY (matricula)
        REFERENCES pessoa(matricula)
        ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS responsavel_discente (

    id INT PRIMARY KEY AUTO_INCREMENT,

    responsavel_matricula VARCHAR(20) NOT NULL,

    discente_matricula VARCHAR(20) NOT NULL,

    UNIQUE (
        responsavel_matricula,
        discente_matricula
    ),

    FOREIGN KEY (responsavel_matricula)
        REFERENCES responsavel(matricula)
        ON DELETE CASCADE,

    FOREIGN KEY (discente_matricula)
        REFERENCES discente(matricula)
        ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS disciplina (

    id INT PRIMARY KEY AUTO_INCREMENT,

    nome VARCHAR(250) NOT NULL,

    docente_matricula VARCHAR(20) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (nome, docente_matricula),

    FOREIGN KEY (docente_matricula)
        REFERENCES docente(matricula)
        ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS matricula_disciplina (

    id INT PRIMARY KEY AUTO_INCREMENT,

    discente_matricula VARCHAR(20) NOT NULL,

    disciplina_id INT NOT NULL,

    ano YEAR NOT NULL,

    semestre ENUM('1', '2') NOT NULL,

    status ENUM(
        'CURSANDO',
        'APROVADO',
        'REPROVADO',
        'TRANCADO'
    ) DEFAULT 'CURSANDO',

    data_matricula TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (
        discente_matricula,
        disciplina_id,
        ano,
        semestre
    ),

    FOREIGN KEY (discente_matricula)
        REFERENCES discente(matricula)
        ON DELETE CASCADE,

    FOREIGN KEY (disciplina_id)
        REFERENCES disciplina(id)
        ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS frequencia (

    id INT PRIMARY KEY AUTO_INCREMENT,

    matricula_disciplina_id INT NOT NULL,

    data_aula DATE NOT NULL,

    presente BOOLEAN NOT NULL,

    UNIQUE (
        matricula_disciplina_id,
        data_aula
    ),

    FOREIGN KEY (matricula_disciplina_id)
        REFERENCES matricula_disciplina(id)
        ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS nota (

    id INT PRIMARY KEY AUTO_INCREMENT,

    matricula_disciplina_id INT NOT NULL,

    nota DECIMAL(4,2) NOT NULL,

    bimestre ENUM(
        'primeiro',
        'segundo',
        'terceiro',
        'quarto'
    ) NOT NULL,

    UNIQUE (
        matricula_disciplina_id,
        bimestre
    ),

    FOREIGN KEY (matricula_disciplina_id)
        REFERENCES matricula_disciplina(id)
        ON DELETE CASCADE
);  
CREATE TABLE IF not EXISTS solicitacoes  (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(250) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    email VARCHAR(250) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,

    turma VARCHAR(50),
    curso VARCHAR(100),

    especialidade VARCHAR(100),
    formacao VARCHAR(100),
    salario DECIMAL(10,2),

    parentesco VARCHAR(50),

    cargo ENUM(
        'discente',
        'docente',
        'responsavel',
        'admin'
    ) NOT NULL,

    data_nascimento DATE NOT NULL,
    celular VARCHAR(50) NOT NULL,
    endereco VARCHAR(250),

    status ENUM(
        'PENDENTE',
        'APROVADO',
        'REJEITADO'
    ) DEFAULT 'PENDENTE',

    data_solicitacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE if not EXISTS conversa (
    id INT PRIMARY KEY AUTO_INCREMENT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE if not EXISTS mensagem (
    id INT PRIMARY KEY AUTO_INCREMENT,

    conversa_id INT NOT NULL,

    remetente_matricula VARCHAR(20) NOT NULL,

    texto TEXT NOT NULL,

    enviado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (conversa_id)
        REFERENCES conversa(id)
        ON DELETE CASCADE,

    FOREIGN KEY (remetente_matricula)
        REFERENCES pessoa(matricula)
        ON DELETE CASCADE
);
CREATE TABLE if not EXISTS aviso (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255),
    descricao TEXT,
    data_expiracao DATE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);