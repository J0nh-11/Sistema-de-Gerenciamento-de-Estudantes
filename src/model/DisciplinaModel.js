"use strict";

class Disciplina {
    #id;
    #nome;
    #docente_matricula;
    constructor(id, nome, docente_matricula) {
        this.#id = id;
        this.#nome = nome;
        this.#docente_matricula = docente_matricula;
    }
    getId() {
        return this.#id;
    }
    getNome() {
        return this.#nome;
    }
    getDocenteMatricula() {
        return this.#docente_matricula;
    }
}

module.exports = Disciplina;
