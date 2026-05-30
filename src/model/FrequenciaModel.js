"use strict";

class Frequencia {
    #id;
    #matricula_disciplina_id;
    #presente;
    constructor(id, matricula_disciplina_id, presente) {
        this.#id = id;
        this.#matricula_disciplina_id = matricula_disciplina_id;
        this.#presente = presente;
    }
    getId() {
        return this.#id;
    }
    getMatricula_disciplina_id() {
       return this.#matricula_disciplina_id;
    }
    getPresente() {
        return this.#presente;
    }
}

module.exports = Frequencia;