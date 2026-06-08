"use strict";

const bcrypt = require("bcrypt");
const SolicitacaoDao = require("../repository/SolicitacaoDao");
const PessoaDao = require("../repository/PessoaDao");
const geraMatricula = require("./geraMatricula");
const DiscenteDao = require("../repository/DiscenteDao");
const DocenteDao = require("../repository/DocenteDao");
const ResponsavelDao = require("../repository/ResponsavelDao");

class SolicitacaoService {
    async create(solicitacao, dadosExtras) {
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
            data_nascimento: solicitacao.getDataNascimento(),
            celular: solicitacao.getCelular(),
            endereco: solicitacao.getEndereco(),
        });
    }

    async aprovar(id) {
        const solicitacao = await SolicitacaoDao.buscarPorId(id);

        if (!solicitacao) {
            throw new Error("Solicitação não encontrada");
        }

        const pessoaExistente = await PessoaDao.buscarPorEmail(
            solicitacao.email,
        );

        if (pessoaExistente) {
            throw new Error("Já existe uma pessoa cadastrada com este e-mail");
        }

        const matricula = geraMatricula(
            solicitacao.id,
            solicitacao.data_nascimento,
        );

        const senhaHash = await bcrypt.hash(solicitacao.senha, 10);

        await PessoaDao.create({
            matricula,
            cpf: solicitacao.cpf,
            nome: solicitacao.nome,
            senha: senhaHash,
            email: solicitacao.email,
            data_nascimento: solicitacao.data_nascimento,
            endereco: solicitacao.endereco,
            celular: solicitacao.celular,
            cargo: solicitacao.cargo,
        });
        switch (solicitacao.cargo) {

    case "discente":
        await DiscenteDao.createDiscente({
            matricula,
            turma: solicitacao.turma,
            curso: solicitacao.curso
        });
        break;

    case "docente":
        await DocenteDao.createDocente({
            matricula,
            especialidade: solicitacao.especialidade,
            formacao: solicitacao.formacao,
            salario: solicitacao.salario
        });
        break;

    case "responsavel":
        await ResponsavelDao.create({
            matricula,
            parentesco: solicitacao.parentesco
        });
        break;
}
        
        await SolicitacaoDao.aprovar(id);

        return {
            mensagem: "Solicitação aprovada e usuário criado com sucesso.",
        };
    }

    async rejeitar(id) {
        await SolicitacaoDao.rejeitar(id);

        return {
            mensagem: "Solicitação rejeitada.",
        };
    }
    async deletar(id) {
        await SolicitacaoDao.deletar(id);
        return {
            mensagem: "Pessoa deletada.",
        };
    }

    async buscarPorTipo(cargo) {
        return await SolicitacaoDao.buscarPorTipo(cargo);
    }

    async buscarPorCpf(cpf) {
        return await SolicitacaoDao.buscarPorCpf(cpf);
    }

    async listarPendentes() {
        return await SolicitacaoDao.listarPendentes();
    }
}

module.exports = new SolicitacaoService();
