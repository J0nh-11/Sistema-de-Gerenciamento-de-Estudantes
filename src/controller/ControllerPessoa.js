"use strict";

const PessoaService = require("../service/PessoaService");

class ControllerPessoa {
    async create(req, res, next) {
        try {
            // Cria modelo
            const pessoa = new PessoaModel(
                null,
                dados.matricula,
                dados.nome,
                dados.cpf,
                dados.email,
                dados.dataNascimento,
                dados.senha,
                dados.endereco,
                dados.cargo,
                dados.celular,
            );

            const result = await PessoaService.create(pessoa);

            res.status(201).json({
                sucesso: true,
                data: result,
            });
        } catch (err) {
            next(err);
        }
    }

    async list(req, res, next) {
        try {
            const pessoas = await PessoaService.list();

            res.json({
                sucesso: true,
                data: pessoas,
            });
        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const pessoa = new PessoaModel(
                null,
                dados.matricula,
                dados.nome,
                dados.cpf,
                dados.email,
                dados.dataNascimento,
                dados.senha,
                dados.endereco,
                dados.cargo,
                dados.celular,
            );

            const result = await PessoaService.update(pessoa);

            res.json({
                sucesso: true,
                data: result,
            });
        } catch (err) {
            next(err);
        }
    }

    async deletar(req, res, next) {
        try {
            const { matricula } = req.params;

            if (!matricula) {
                return res.status(400).json({
                    sucesso: false,
                    erro: "Matrícula é obrigatória",
                });
            }

            const result = await PessoaService.deletar(matricula);

            res.json({
                sucesso: true,
                data: result,
            });
        } catch (err) {
            next(err);
        }
    }
}
module.exports = new ControllerPessoa();
