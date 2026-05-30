"use strict";

class PessoaModel {
    #id;
    #matricula;
    #nome;
    #cpf;
    #email;
    #dataNascimento;
    #senha;
    #endereco;
    #cargo;
    #celular;

    constructor(
        id,
        matricula,
        nome,
        cpf,
        email,
        dataNascimento,
        senha,
        endereco,
        cargo,
        celular,
    ) {
        this.#id = id;
        this.#matricula = matricula;
        this.#nome = nome;
        this.#cpf = cpf;
        this.#email = email;
        this.#dataNascimento = dataNascimento;
        this.#senha = senha;
        this.#endereco = endereco;
        this.#cargo = cargo;
        this.#celular = celular;
    }
    getId() {
        return this.#id;
    }
    setId(novo) {
        this.#id = novo;
        return this.#id;
    }
    getMatricula() {
        return this.#matricula;
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

    getEndereco() {
        return this.#endereco;
    }

    getCargo() {
        return this.#cargo;
    }

    getCelular() {
        return this.#celular;
    }

    getDataNascimento() {
        return this.#dataNascimento;
    }
}

module.exports = PessoaModel;
