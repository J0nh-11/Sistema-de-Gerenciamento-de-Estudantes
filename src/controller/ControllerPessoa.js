"use strict";

const PessoaModel = require("../model/PessoaModel");
const PessoaService = require("../service/PessoaService");

class ControllerPessoa {
    async login(req, res) {
        try {
            const { email, senha } = req.body;

            const token = await PessoaService.login(email, senha);

            res.json({ token });
        } catch (err) {
            res.status(401).json({
                erro: err.message,
            });
        }
    }

    async create(req, res) {
        try {
            const { email, senha } = req.body;

            if (!email || !senha) {
                return res.status(400).json({ erro: "Campos obrigatórios" });
            }

            if (!email.includes("@")) {
                return res.status(400).json({ erro: "Email inválido" });
            }
            //const pessoa = new PessoaModel(req.body);
            const pessoa = new PessoaModel(
                null,
                req.body.matricula,
                req.body.nome,
                req.body.cpf,
                req.body.email,
                req.body.dataNascimento,
                req.body.senha,
                req.body.endereco,
                req.body.cargo,
                req.body.celular,
            );
            const result = await PessoaService.create(pessoa);

            res.status(201).json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
    async list(req, res) {
        try {
            const pessoas = await PessoaService.list();

            res.json(pessoas);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const pessoa = new PessoaModel(
                null,
                req.body.matricula,
                req.body.nome,
                req.body.cpf,
                req.body.email,
                req.body.dataNascimento,
                req.body.senha,
                req.body.endereco,
                req.body.cargo,
                req.body.celular,
            );

            const result = await PessoaService.update(pessoa);

            res.json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async deletar(req, res) {
        try {
            const { matricula } = req.params;

            const result = await PessoaService.deletar(matricula);

            res.json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}
module.exports = new ControllerPessoa();
