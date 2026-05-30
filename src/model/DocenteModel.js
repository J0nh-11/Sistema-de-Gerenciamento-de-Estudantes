"use strict";

const PessoaModel = require("./PessoaModel");

class DocenteModel extends PessoaModel {
    #especialidade;
    #formacao;
    #salario;

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
        especialidade,
        formacao,
        salario,
    ) {
        super(
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
        );

        this.#especialidade = especialidade;
        this.#formacao = formacao;
        this.#salario = salario;
    }

    getEspecialidade() {
        return this.#especialidade;
    }

    getFormacao() {
        return this.#formacao;
    }

    getSalario() {
        return this.#salario;
    }
}

module.exports = DocenteModel;
