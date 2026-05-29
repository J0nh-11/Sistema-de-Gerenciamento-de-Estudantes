"use strict";

const SolicitacaoService = require("../service/SolicitacaoService");

class SolicitacaoController {

    async create() {
        
    }
    async listarPorCargo(req, res) {
        try {
            const { cargo } = req.params;

            const resultado = await SolicitacaoService.listarPorCargo(cargo);

            res.status(200).json(resultado);
        } catch (error) {
            console.error(error);

            res.status(500).json({
                erro: error.message,
            });
        }
    }

    async aprovar(req, res) {
        try {
            const { id } = req.params;

            const resultado = await this.service.aprovar(id);

            res.status(200).json(resultado);
        } catch (error) {
            console.error(error);

            res.status(500).json({
                erro: error.message,
            });
        }
    }

    async rejeitar(req, res) {
        try {
            const { id } = req.params;

            const resultado = await this.service.rejeitar(id);

            res.status(200).json(resultado);
        } catch (error) {
            console.error(error);

            res.status(500).json({
                erro: error.message,
            });
        }
    }

    async listarPorTipo(req, res) {
        try {
            const tipo = req.params.tipo;

            const tiposValidos = [
                "discente",
                "docente",
                "admin",
                "responsavel",
            ];

            if (!tiposValidos.includes(tipo)) {
                return res.status(400).json({
                    erro: "Tipo inválido",
                });
            }

            const solicitacoes = await SolicitacaoService.buscarPorTipo(tipo);

            res.status(200).json(solicitacoes);
        } catch (error) {
            res.status(500).json({
                erro: error.message,
            });
        }
    }
}

module.exports = new SolicitacaoController();
