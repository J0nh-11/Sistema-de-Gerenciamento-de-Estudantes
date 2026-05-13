"use strict";

const PessoaModel = require("./PessoaModel");

class DocenteModel extends PessoaModel {
    #matricula;
    #cpf;
    #nome;
    #senha;
    #email;
    #dataNascimento;
    #endereco;
    #materiaResponsalvel;
    #cargo;
    constructor(matricula, nome, cpf, email, dataNascimento, senha, endereco, materiaResponsavel, cargo) {
        super(matricula, nome, cpf, email, dataNascimento, senha, endereco, materiaResponsavel, cargo)
        this.#matricula = matricula;
        this.#cpf = cpf;
        this.#nome = nome;
        this.#senha = senha;
        this.#email = email;
        this.#dataNascimento = dataNascimento;
        this.#endereco = endereco;
        this.#materiaResponsalvel = materiaResponsavel;
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

    getMateriaResponsavel() {
        return this.#materiaResponsalvel;
    }

    setMateriaResponsavel(materiaResponsavel) {
        this.materiaResponsavel = materiaResponsavel;
        return this.materiaResponsavel;
    }
}

module.exports = new DocenteModel();

 // while (true) {
        //     if (this.#cpf.length != 11) console.log("Insira 11 digitos: ");
        //     else return false;
        // }
