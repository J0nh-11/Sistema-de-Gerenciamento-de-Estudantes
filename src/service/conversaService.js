"use strict";

const ConversaDao = require("../repository/ConversaDao");
const MensagemDao = require("../repository/MensagemDao");

class ConversaService {
    async criarConversa() {
        const conversaId = await ConversaDao.create();

        return ConversaDao.findById(conversaId);
    }

    async listarConversas() {
        return ConversaDao.list();
    }

    async buscarConversa(id) {
        const conversa = await ConversaDao.findById(id);

        if (!conversa) {
            throw new Error("Conversa não encontrada");
        }

        return conversa;
    }

    async excluirConversa(id) {
        return ConversaDao.delete(id);
    }

    async listarMensagens(conversaId) {
        return MensagemDao.listByConversa(conversaId);
    }
}

module.exports = new ConversaService();
