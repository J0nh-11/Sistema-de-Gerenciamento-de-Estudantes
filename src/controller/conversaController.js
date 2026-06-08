"use strict";

const ConversaService = require("../service/ConversaService");

class ConversaController {
    async criar(req, res) {
        try {
            const conversa = await ConversaService.criarConversa();

            res.status(201).json(conversa);
        } catch (error) {
            res.status(500).json({
                erro: error.message,
            });
        }
    }

    async listar(req, res) {
        try {
            const conversas = await ConversaService.listarConversas();

            res.json(conversas);
        } catch (error) {
            res.status(500).json({
                erro: error.message,
            });
        }
    }

    async buscar(req, res) {
        try {
            const { id } = req.params;

            const conversa = await ConversaService.buscarConversa(id);

            res.json(conversa);
        } catch (error) {
            res.status(404).json({
                erro: error.message,
            });
        }
    }

    async excluir(req, res) {
        try {
            const { id } = req.params;

            await ConversaService.excluirConversa(id);

            res.json({
                message: "Conversa removida",
            });
        } catch (error) {
            res.status(500).json({
                erro: error.message,
            });
        }
    }
}

module.exports = new ConversaController();
