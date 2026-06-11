"use strict";

class avisoModel {
    #id;
    #titulo;
    #descricao;
    constructor(
        id,
        titulo,
        descricao,
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
        parentesco,
    ) {
        this.#id = id;
        this.#titulo = titulo;
        this.#descricao = descricao;
    }
    getId() {
        return this.#id;
    }
    getTitulo() {
        return this.#titulo;
    }

    getDescricao() {
        return this.#descricao;
    }
}

module.exports =avisoModel;
