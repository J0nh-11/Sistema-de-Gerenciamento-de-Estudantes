"use strict";

class MatriculaDisciplina {
    #id;
    #discente_disciplina;
    #disciplina_id;
    #ano;
    #semestre;
    #status;
    constructor(id, discente_disciplina, disciplina_id, ano, semestre, status) {
        this.#id = id;
        this.#discente_disciplina = discente_disciplina;
        this.#disciplina_id  = disciplina_id;
        this.#semestre = semestre;
        this.#status = status;
    }

    getId() {
        return this.#id;
    }
    getDiscenteDisciplina() {
        return this.#discente_disciplina;
    }
    getDisciplinaId() {
        return this.#disciplina_id;
    }
    getAno() {
        return this.#ano;
    }
    getSemestre() {
        return this.#semestre;
    }
    getStatus() {
        return this.#status;
    }
}

module.exports = MatriculaDisciplina;