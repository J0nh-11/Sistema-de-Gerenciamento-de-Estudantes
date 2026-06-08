"use strict";

const MensagemDao = require("../repository/MensagemDao");
const ConversaDao = require("../repository/ConversaDao");

class MensagemService {
    async enviarMensagem(dados) {
        const conversa = await ConversaDao.findById(dados.conversa_id);

        if (!conversa) {
            throw new Error("Conversa não encontrada");
        }

        await MensagemDao.create(dados);

        return {
            success: true,
            message: "Mensagem enviada",
        };
    }

    async listarMensagens(conversaId) {
        return MensagemDao.listByConversa(conversaId);
    }

    async excluirMensagem(id) {
        return MensagemDao.delete(id);
    }
}

module.exports = new MensagemService();
