"use strict";

const PessoaModel = require("../model/PessoaModel");
const bcrypt = require("bcrypt");
const PessoaDao = require("../../src/repository/PessoaDao");

class ServicePessoa {
    async create(pessoa) {
        // regra de negócio
        const existente = await pessoaDao.buscarPorMatricula(
            pessoa.getMatricula(),
        );

        if (existente) {
            throw new Error("Matrícula já cadastrada");
        }

        if (pessoa.getSenha().length < 8) {
            throw new Error("Senha muito fraca");
        }

        let dados = {
            matricula: pessoa.getMatricula(),
            cpf: pessoa.getCpf(),
            nome: pessoa.getNome(),
            senha: await bcrypt.hash(pessoa.getSenha(), 10),
            email: pessoa.getEmail(),
            dataNascimento: pessoa.getDataNascimento(),
            endereco: pessoa.getEndereco(),
            cargo: pessoa.getCargo(),
        };

        return PessoaDao.create(dados);
    }

    async list() {
        return pessoaDao.list();
    }

    async update(pessoa) {
        if (!pessoa.getMatricula()) {
            throw new Error("Matrícula obrigatória");
        }

        let dados = {
            cpf: pessoa.getCpf(),
            nome: pessoa.getNome(),
            email: pessoa.getEmail(),
            dataNascimento: pessoa.getDataNascimento(),
            endereco: pessoa.getEndereco(),
            cargo: pessoa.getCargo(),
            matricula: pessoa.getMatricula(),
        };

        if (pessoa.getSenha()) {
            dados.senha = await bcrypt.hash(pessoa.getSenha(), 10);
        }

        return await pessoaDao.update(dados);
    }

    async deletar(matricula) {
        // 1. Validar
        if (!matricula) {
            throw new Error("Matrícula é obrigatória");
        }

        // 2. Executar delete
        const result = await pessoaDao.delete(matricula);

        // 3. Verificar se deletou algo
        if (result.affectedRows === 0) {
            throw new Error("Pessoa não encontrada");
        }

        return {
            message: "Pessoa deletada com sucesso",
        };
    }
    async login(email, senha) {
        const usuario = await pessoaDao.buscarPorEmail(email);

        if (!usuario) {
            throw new Error("Email ou senha inválidos");
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            throw new Error("Email ou senha inválidos");
        }

        return usuario;
    }
}

module.exports = new ServicePessoa();
