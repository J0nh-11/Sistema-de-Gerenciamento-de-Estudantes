"use strict";

class PessoaModel {
    #matricula;
    #cpf;
    #nome;
    #senha;
    #email;
    #dataNascimento;
    #endereco;
    #cargo;
    constructor(
        matricula,
        nome,
        cpf,
        email,
        dataNascimento,
        senha,
        endereco,
        cargo,
    ) {
        this.#matricula = matricula;
        this.#cpf = cpf;
        this.#nome = nome;
        this.#senha = senha;
        this.#email = email;
        this.#dataNascimento = dataNascimento;
        this.#endereco = endereco;
        this.#cargo = cargo;
    }
    getNome() {
        return this.#nome;
    }
    setNome(nome) {
        this.#nome = nome;
        return this.#nome;
    }
    getMatricula() {
        return this.#matricula;
    }
    setMatricula(matricula) {
        this.#matricula = matricula;
        return this.#matricula;
    }
    getCpf() {
        return this.#cpf;
    }
    setCpf(cpf) {
        this.#cpf = cpf;
        return this.#cpf;
    }
    getSenha() {
        return this.#senha;
    }
    setSenha(senha) {
        this.#senha = senha;
        return this.#senha;
    }
    getEmail() {
        return this.#email;
    }
    setEmail(email) {
        this.#email = email;
        return (this.#email = email);
    }
    getDataNascimento() {
        return this.#dataNascimento;
    }
    setDataNascimento(dataNascimento) {
        this.#dataNascimento = dataNascimento;
        return this.#dataNascimento;
    }
    getEndereco() {
        return this.#endereco;
    }
    setEndereco() {
        return this.#endereco;
    }
    getCargo() {
        return this.#cargo;
    }
    setCargo(cargoNovo) {
        this.#cargo = cargoNovo;
        return this.#cargo;
    }
}

module.exports = PessoaModel;
