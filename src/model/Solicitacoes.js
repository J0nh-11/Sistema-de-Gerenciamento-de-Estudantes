"use strict";

class Solicitacoes {
    #id;
    #nome;
    #cpf;
    #email;
    #senha;
    #cargo;
    #dataNascimento;
    #celular;
    #endereco;
    #curso;
    #turma;
    #formacao;
    #especialidade;
    #salario;
    #parentesco;
    constructor(
        id,
        nome,
        cpf,
        email,
        senha,
        cargo,
        dataNascimento,
        celular,
        endereco,
        curso,
        turma,
        formacao,
        especialidade,
        salario,
        parentesco
    ) {
        this.#id = id;
        this.#nome = nome;
        this.#cpf = cpf;
        this.#email = email;
        this.#senha = senha;
        this.#cargo = cargo;
        this.#dataNascimento = dataNascimento;
        this.#celular = celular;
        this.#endereco = endereco;
        this.#curso = curso;
        this.#turma = turma;
        this.#formacao = formacao;
        this.#especialidade = especialidade;
        this.#salario = salario;
        this.#formacao = formacao;
        
    }
    getId() {
        return this.#id;
    }
    getNome() {
        return this.#nome;
    }

    getCpf() {
        return this.#cpf;
    }

    getEmail() {
        return this.#email;
    }

    getSenha() {
        return this.#senha;
    }

    getCargo() {
        return this.#cargo;
    }
    getEndereco() {
        return this.#endereco;
    }

    getCelular() {
        return this.#celular;
    }

    getDataNascimento() {
        return this.#dataNascimento;
    }
    getCurso() {
        this.#curso;
    }
    getTurma() {
        this.#turma;
    }
    getFormacao() {
        this.#formacao;
    }
    getEspecialidade() {
        this.#especialidade;
    }
    getSalario() {
        this.#salario;
    }
}

module.exports = Solicitacoes;
