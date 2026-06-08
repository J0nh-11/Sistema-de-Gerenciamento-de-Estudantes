"use strict";

const SolicitacaoService = require("../service/SolicitacaoService");
const SolicitacaoModel = require("../model/Solicitacoes");
class SolicitacaoController {
    async create(req, res) {
        try {
            const {
                nome,
                cpf,
                email,
                senha,
                cargo,
                data_nascimento,
                celular,
                endereco,
            } = req.body;
            if (
                !nome ||
                !cpf ||
                !email ||
                !senha ||
                !cargo ||
                !data_nascimento ||
                !celular
            ) {
                return res.status(400).json({
                    erro: "Todos os campos obrigatórios devem ser preenchidos",
                });
            }
            if (!email.includes("@")) {
                return res.status(400).json({ erro: "Email inválido" });
            }
            const cargosValidos = [
                "discente",
                "docente",
                "admin",
                "responsavel",
            ];

            if (!cargosValidos.includes(cargo)) {
                return res.status(400).json({ erro: "Cargo inválido" });
            }
            const solicitacao = new SolicitacaoModel(
                null,
                nome,
                cpf,
                email,
                senha,
                cargo,
                data_nascimento,
                celular,
                endereco,
            );
            const result = await SolicitacaoService.create(solicitacao);

            res.status(201).json(result);
        } catch (erro) {
            res.status(400).json({ erro: erro.message });
        }
    }
    async aprovar(req, res) {
        try {

            const { id } = req.params;
            if (!id || isNaN(id)) {
                return res.status(400).json({ erro: "ID inválido" });
            }
            const resultado = await SolicitacaoService.aprovar(id);

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

            const resultado = await SolicitacaoService.rejeitar(id);

            res.status(200).json(resultado);

        } catch (erro) {
            console.error(erro);

            res.status(500).json({
                erro: erro.message,
            });
        }
    }
    async deletar(req, res) {
        try {
            const { id } = req.params;

            const resultado = await SolicitacaoService.deletar(id);

            res.status(200).json(resultado);
        } catch (erro) {
            console.error(erro);

            res.status(500).json({
                erro: erro.mensage,
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
