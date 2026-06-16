"use strict";

const DisciplinaService = require("../service/DisciplinaService");

class DisciplinaController {
    async criar(req, res) {
        try {
            const resultado = await DisciplinaService.criar(req.body);

            res.status(201).json({
                sucesso: true,
                mensagem: "Disciplina cadastrada com sucesso",
                dados: resultado,
            });
        } catch (erro) {
            res.status(500).json({
                sucesso: false,
                mensagem: erro.message,
            });
        }
    }

    async listar(req, res) {
        try {
            const disciplinas = await DisciplinaService.listar();

            res.status(200).json({
                sucesso: true,
                dados: disciplinas,
                total: disciplinas.length,
            });
        } catch (erro) {
            res.status(500).json({
                sucesso: false,
                mensagem: erro.message,
            });
        }
    }

    async deletar(req, res) {
        try {
            const { id } = req.params;

            const resultado = await DisciplinaService.deletar(id);

            res.status(200).json({
                sucesso: true,
                mensagem: "Disciplina removida com sucesso",
                dados: resultado,
            });
        } catch (erro) {
            res.status(500).json({
                sucesso: false,
                mensagem: erro.message,
            });
        }
    }
}

module.exports = new DisciplinaController();
