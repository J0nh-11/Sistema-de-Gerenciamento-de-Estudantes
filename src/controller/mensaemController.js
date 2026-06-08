"use strict";

const MensagemService = require("../service/MensagemService");

class MensagemController {
    async enviar(req, res) {
        try {
            await MensagemService.enviarMensagem(req.body);

            res.status(201).json({
                message: "Mensagem enviada",
            });
        } catch (error) {
            res.status(400).json({
                erro: error.message,
            });
        }
    }

    async listar(req, res) {
        try {
            const { conversaId } = req.params;

            const mensagens = await MensagemService.listarMensagens(conversaId);

            res.json(mensagens);
        } catch (error) {
            res.status(500).json({
                erro: error.message,
            });
        }
    }

    async excluir(req, res) {
        try {
            const { id } = req.params;

            await MensagemService.excluirMensagem(id);

            res.json({
                message: "Mensagem removida",
            });
        } catch (error) {
            res.status(500).json({
                erro: error.message,
            });
        }
    }
}

module.exports = new MensagemController();
