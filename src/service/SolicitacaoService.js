"use strict";

const SolicitacaoDao = require("../repository/SolocitacaoDao");

class SolicitacaoService {
    async create(solicitacao) {
        const existente = await SolicitacaoDao.buscarPorCpf(
            solicitacao.getCpf(),
        );

        if (existente) {
            throw new Error("Solicitação já cadastrada");
        }

        return await SolicitacaoDao.create({
            nome: solicitacao.getNome(),
            cpf: solicitacao.getCpf(),
            email: solicitacao.getEmail(),
            senha: solicitacao.getSenha(),
            cargo: solicitacao.getCargo(),
        });
    }

    async listarPorCargo(cargo) {
        return await SolicitacaoDao.listarPorCargo(cargo);
    }

    async aprovar(id) {
        await SolicitacaoDao.aprovar(id);

        return {
            mensagem: "Solicitação aprovada.",
        };
    }

    async rejeitar(id) {
        await SolicitacaoDao.rejeitar(id);

        return {
            mensagem: "Solicitação rejeitada.",
        };
    }

    async buscarPorTipo(cargo) {
        return await SolicitacaoDao.buscarPorTipo(cargo);
    }
}

module.exports = new SolicitacaoService();
