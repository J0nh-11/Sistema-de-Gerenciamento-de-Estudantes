"use strict";

const MatriculaDisciplinaService = require("../service/MatriculaDisciplinaService");
const MatriculaModel = require("../model/DisciplinaModel");
class MatriculaDisciplinaController {
    async cadastrar(req, res) {
        try {
            // const result = await MatriculaDisciplinaService.cadastrar(req.body);
            const matricula = new MatriculaModel(
                null,
                req.body.matricula_discente,
                req.body.disciplina_id,
                req.body.semestre,
                req.body.status,
            );
            const result =
                await MatriculaDisciplinaService.cadastrar(matricula);
            res.status(201).json(result);
        } catch (erro) {
            res.status(400).json({
                erro: erro.message,
            });
        }
    }
    async update(req, res) {
        try {
            const matricula = new MatriculaModel(
                null,
                req.body.matricula_discente,
                req.body.disciplina_id,
                req.body.semestre,
                req.body.status,
            );
            const result = await MatriculaDisciplinaService.update(matricula);

            res.status(201).json(result);
        } catch (erro) {
            res.status(400).json({
                erro: erro.message,
            });
        }
    }
    async listar(req, res) {
        try {
            const dados = await MatriculaDisciplinaService.listar();

            res.json(dados);
        } catch (erro) {
            res.status(500).json({
                erro: erro.message,
            });
        }
    }
}

module.exports = new MatriculaDisciplinaController();
