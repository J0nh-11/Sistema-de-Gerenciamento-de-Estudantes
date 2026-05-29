"use strict";

const MatriculaDisciplinaService = require("../service/MatriculaDisciplinaService");

class MatriculaDisciplinaController {
    // constructor() {
    //     this.service = new MatriculaDisciplinaService();
    // }

    async cadastrar(req, res) {
        try {
            const result = await MatriculaDisciplinaService.cadastrar(req.body);

            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({
                erro: error.message,
            });
        }
    }

    async listar(req, res) {
        try {
            const dados = await MatriculaDisciplinaService.listar();

            res.json(dados);
        } catch (error) {
            res.status(500).json({
                erro: error.message,
            });
        }
    }
}

module.exports = new MatriculaDisciplinaController();
