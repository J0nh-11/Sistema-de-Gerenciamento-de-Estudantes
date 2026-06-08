"use strict";

const PessoaModel = require("../model/PessoaModel");
const PessoaService = require("../service/PessoaService");

class ControllerPessoa {
    async create(req, res, next) {
        try {
            // Limpa strings
            const dados = {
                matricula: trimString(req.body.matricula),
                nome: trimString(req.body.nome),
                cpf: trimString(req.body.cpf),
                email: trimString(req.body.email),
                dataNascimento: trimString(req.body.dataNascimento),
                senha: req.body.senha, // Não trim em senha
                endereco: trimString(req.body.endereco),
                cargo: trimString(req.body.cargo),
                celular: trimString(req.body.celular),
            };

            // Validação de campos obrigatórios
            const validacao = validarCampos(dados, [
                {
                    nome: "nome",
                    label: "Nome",
                    tipo: "minLength",
                    minLength: 3,
                    obrigatorio: true,
                },
                { nome: "cpf", label: "CPF", tipo: "cpf", obrigatorio: true },
                {
                    nome: "email",
                    label: "Email",
                    tipo: "email",
                    obrigatorio: true,
                },
                {
                    nome: "dataNascimento",
                    label: "Data de Nascimento",
                    tipo: "data",
                    obrigatorio: true,
                },
                {
                    nome: "senha",
                    label: "Senha",
                    tipo: "minLength",
                    minLength: 8,
                    obrigatorio: true,
                },
                {
                    nome: "endereco",
                    label: "Endereço",
                    tipo: "minLength",
                    minLength: 5,
                    obrigatorio: false,
                },
                {
                    nome: "celular",
                    label: "Celular",
                    tipo: "minLength",
                    minLength: 10,
                    obrigatorio: false,
                },
            ]);

            if (!validacao.valido) {
                return res.status(400).json({
                    sucesso: false,
                    erros: validacao.erros,
                });
            }

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
            // Limpa strings
            const dados = {
                matricula: trimString(req.body.matricula),
                nome: trimString(req.body.nome),
                cpf: trimString(req.body.cpf),
                email: trimString(req.body.email),
                dataNascimento: trimString(req.body.dataNascimento),
                senha: req.body.senha ? trimString(req.body.senha) : null,
                endereco: trimString(req.body.endereco),
                cargo: trimString(req.body.cargo),
                celular: trimString(req.body.celular),
            };

            // Validação
            const validacao = validarCampos(dados, [
                {
                    nome: "matricula",
                    label: "Matrícula",
                    tipo: "minLength",
                    minLength: 1,
                    obrigatorio: true,
                },
                {
                    nome: "email",
                    label: "Email",
                    tipo: "email",
                    obrigatorio: true,
                },
                { nome: "cpf", label: "CPF", tipo: "cpf", obrigatorio: false },
            ]);

            if (!validacao.valido) {
                return res.status(400).json({
                    sucesso: false,
                    erros: validacao.erros,
                });
            }

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
