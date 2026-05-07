"use strict";
    
class DocenteModel {
    #matricula;
    #cpf;
    #nome;
    #senha;
    #email;
    #dataNascimento;

    constructor(matricula, nome, cpf, email, dataNascimento, senha) {
        this.#matricula = matricula;
        this.#cpf = cpf;
        this.#nome = nome;
        this.#senha = senha;
        this.#email = email;
        this.#dataNascimento = dataNascimento;
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
        // while (true) {
        //     if (this.#cpf.length != 11) console.log("Insira 11 digitos: ");
        //     else return false;
        // }
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
    getInformaçõesGereais() {
        return `\n
            Matrícula: ${this.getMatricula()},
            Nome: ${this.getNome()},
            CPF: ${this.getCpf()},
            Data de nascimento: ${this.getDataNascimento()},
            E-mail: ${this.getEmail()},
            Senha: ${this.getSenha()},\n`;
    }
}

module.exports = DocenteModel;
