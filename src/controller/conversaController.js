"use strict";

const ConversaService = require("../service/ConversaService");

class ConversaController {
    async iniciar(req, res) {
        try {
            const destinatario = req.body?.destinatario;

            if (!destinatario) {
                return res.status(400).json({
                    erro: "Destinatário não informado",
                });
            }

            const conversa = await ConversaService.iniciarConversa(
                req.usuario.matricula,
                destinatario,
            );

            res.status(201).json(conversa);
        } catch (error) {
            res.status(500).json({
                erro: error.message,
            });
        }
    }
    async criar(req, res) {
        console.log(req.body);

        try {
            const conversa = await ConversaService.criarConversa();
            console.log("Criando conversa");
            res.status(201).json(conversa);
        } catch (error) {
            res.status(500).json({
                erro: error.message,
            });
        }
    }

    async listar(req, res) {
        try {
            const conversas = await ConversaService.listarConversasUsuario(
                req.usuario.matricula,
            );

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
