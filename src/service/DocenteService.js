"use strict";

const DocenteDao = require("../repository/DocenteDao");

class DocenteService {
    async listar() {
        return await DocenteDao.listDocente();
    }

    async buscarPorMatricula(matricula) {
        if (!matricula) {
            throw new Error("Matrícula é obrigatória");
        }

        return await DocenteDao.buscarPorMatricula(matricula);
    }

    async criar(docente) {
        if (!docente.matricula) {
            throw new Error("Matrícula é obrigatória");
        }

        return await DocenteDao.createDocente(docente);
    }

    async atualizar(docente) {
        if (!docente.matricula) {
            throw new Error("Matrícula é obrigatória");
        }

        return await DocenteDao.update(docente);
    }

    async deletar(id) {
        if (!id) {
            throw new Error("ID é obrigatório");
        }

        return await DocenteDao.deletar(id);
    }
}

module.exports = new DocenteService();
