"use strict";

const DiscenteService = require("../service/DiscenteService");

class DiscenteController {
    async listar(req, res) {
        try {
            const alunos = await DiscenteService.listarAlunos();

            return res.status(200).json(alunos);
        } catch (erro) {
            return res.status(500).json({
                erro: erro.message,
            });
        }
    }
}

module.exports = new DiscenteController();
