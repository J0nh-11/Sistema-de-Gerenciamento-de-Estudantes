"use strict";

const PessoaModel = require("./PessoaModel");
    
class DiscenteModel extends PessoaModel {
    #matricula;
    #cpf;
    #nome;
    #senha;
    #email;
    #dataNascimento;
    #turma;
    #endereco;

    constructor(matricula, nome, cpf, email, dataNascimento, senha, turma, endereco) {
        super(matricula, nome, cpf, email, dataNascimento, senha, turma, endereco)
        this.#matricula = matricula;
        this.#cpf = cpf;
        this.#nome = nome;
        this.#senha = senha;
        this.#email = email;
        this.#dataNascimento = dataNascimento;
        this.#turma = turma;
        this.#endereco = endereco;
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
    setEndereco(novoEndereco) {
        this.#endereco = novoEndereco;
        return this.#endereco;
    }
    getTurma() {
        return this.#turma;
    }
    setTurma(novaTurma) {
        this.#turma = novaTurma;
        return this.#turma;
    }
}

module.exports = DocenteModel;
