"use strict";

const ConversaDao = require("../repository/ConversaDao");
const MensagemDao = require("../repository/MensagemDao");
const ConversaParticipanteDao = require("../repository/ConversaParticipanteDao");

class ConversaService {
    async criarConversa() {
        const conversaId = await ConversaDao.create();

        return await ConversaDao.findById(conversaId);
    } 
    async iniciarConversa(matriculaOrigem, matriculaDestino) {
        const conversaId = await ConversaDao.create();

        await ConversaParticipanteDao.adicionar(conversaId, matriculaOrigem);

        await ConversaParticipanteDao.adicionar(conversaId, matriculaDestino);

        return await ConversaDao.findById(conversaId);
    }

    async listarConversasUsuario(matricula) {
        return ConversaParticipanteDao.listarConversasUsuario(matricula);
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
