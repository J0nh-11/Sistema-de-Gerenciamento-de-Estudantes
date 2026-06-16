"use strict";

const DisciplinaDao = require("../repository/DisciplinaDao");

class DisciplinaService {
    async criar(dados) {
        try {
            if (!dados.nome) {
                throw new Error("Nome da disciplina é obrigatório");
            }

            if (!dados.docente_matricula) {
                throw new Error("Matrícula do docente é obrigatória");
            }

            return await DisciplinaDao.create(dados);
        } catch (erro) {
            throw new Error(`Erro ao criar disciplina: ${erro.message}`);
        }
    }

    async listar() {
        try {
            return await DisciplinaDao.list();
        } catch (erro) {
            throw new Error(`Erro ao listar disciplinas: ${erro.message}`);
        }
    }

    async deletar(id) {
        try {
            if (!id) {
                throw new Error("ID é obrigatório");
            }

            return await DisciplinaDao.deletar(id);
        } catch (erro) {
            throw new Error(`Erro ao deletar disciplina: ${erro.message}`);
        }
    }
}

module.exports = new DisciplinaService();
