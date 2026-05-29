"use strict";

const MatriculaDisciplinaDao = require("../repository/MatriculaDao");

class MatriculaDisciplinaService {
    // constructor() {
    //     this.dao = new MatriculaDisciplinaDao();
    // }

    async cadastrar(dados) {
        if (
            !dados.discente_matricula ||
            !dados.disciplina_id ||
            !dados.ano ||
            !dados.semestre
        ) {
            throw new Error("Todos os campos são obrigatórios");
        }

        return await MatriculaDisciplinaDao.create(dados);
    }

    async listar() {
        return await MatriculaDisciplinaDao.list();
    }
}

module.exports = new MatriculaDisciplinaService();
