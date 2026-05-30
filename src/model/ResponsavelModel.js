"use strict";

const PessoaModel = require("./PessoaModel");

class ResponsavelModel extends PessoaModel {
    #parentesco;

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
        parentesco,
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

        this.#parentesco = parentesco;
    }

    getParentesco() {
        return this.#parentesco;
    }
}

module.exports = ResponsavelModel;
