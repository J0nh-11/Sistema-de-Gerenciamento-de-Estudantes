"use strict";

class Nota {
    #id;
    #matricula_disciplina_id;
    #nota;
    #bimestre;
    constructor(id, matricula_disciplina_id, nota, bimestre) {
        this.#id = id;
        this.#matricula_disciplina_id = matricula_disciplina_id;
        this.#nota = nota;
        this.#bimestre = bimestre;
    }
    getId() {
        return this.#id;
    }
    getMatricula_disciplina_id() {
        return this.#matricula_disciplina_id;
    }
    getNota() {
        return this.#nota;
    }
    getBimestre() {
        return this.#bimestre;
    }
}
