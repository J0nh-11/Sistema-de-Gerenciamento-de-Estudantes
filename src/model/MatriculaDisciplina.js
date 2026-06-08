"use strict";

class MatriculaDisciplina {
    #id;
    #discente_matricula;
    #disciplina_id;
    #ano;
    #semestre;
    #status;
    #data_matricula;

    constructor(
        id,
        discente_matricula,
        disciplina_id,
        ano,
        semestre,
        status,
        data_matricula,
    ) {
        this.#id = id;
        this.#discente_matricula = discente_matricula;
        this.#disciplina_id = disciplina_id;
        this.#ano = ano;
        this.#semestre = semestre;
        this.#status = status || "CURSANDO";
        this.#data_matricula = data_matricula;
    }

    getId() {
        return this.#id;
    }

    setId(novoId) {
        this.#id = novoId;
        return this.#id;
    }

    getDiscenteMatricula() {
        return this.#discente_matricula;
    }

    setDiscenteMatricula(novaMatricula) {
        this.#discente_matricula = novaMatricula;
        return this.#discente_matricula;
    }

    getDisciplinaId() {
        return this.#disciplina_id;
    }

    setDisciplinaId(novoId) {
        this.#disciplina_id = novoId;
        return this.#disciplina_id;
    }

    getAno() {
        return this.#ano;
    }

    setAno(novoAno) {
        this.#ano = novoAno;
        return this.#ano;
    }

    getSemestre() {
        return this.#semestre;
    }

    setSemestre(novoSemestre) {
        this.#semestre = novoSemestre;
        return this.#semestre;
    }

    getStatus() {
        return this.#status;
    }

    setStatus(novoStatus) {
        this.#status = novoStatus;
        return this.#status;
    }

    getDataMatricula() {
        return this.#data_matricula;
    }

    setDataMatricula(novaData) {
        this.#data_matricula = novaData;
        return this.#data_matricula;
    }
}

module.exports = MatriculaDisciplina;
