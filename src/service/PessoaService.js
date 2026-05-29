"use strict";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const PessoaDao = require("../repository/PessoaDao");
const geraMatricula = require("./geraMatricula");
class PessoaService {
    async create(pessoa) {
        // regra de negócio
        const existente = await PessoaDao.buscarPorMatricula(
            pessoa.getMatricula(),
        );

        if (existente) {
            throw new Error("Matrícula já cadastrada");
        }

        if (pessoa.getSenha().length < 8) {
            throw new Error("Senha muito fraca");
        }

        let dados = {
            id: pessoa.getId(),
            matricula: await geraMatricula(
                pessoa.getId(),
                pessoa.data_nascimento(),
            ),
            cpf: pessoa.getCpf(),
            nome: pessoa.getNome(),
            senha: await bcrypt.hash(pessoa.getSenha(), 10),
            email: pessoa.getEmail(),
            data_nascimento: pessoa.getData_ascimento(),
            endereco: pessoa.getEndereco(),
            cargo: pessoa.getCargo(),
            celular: pessoa.getCelular(),
        };

        return PessoaDao.create(dados);
    }

    async list() {
        return PessoaDao.list();
    }

    async update(pessoa) {
        if (!pessoa.getMatricula()) {
            throw new Error("Matrícula obrigatória");
        }

        let dados = {
            id: pessoa.getId(),
            cpf: pessoa.getCpf(),
            nome: pessoa.getNome(),
            email: pessoa.getEmail(),
            data_nascimento: pessoa.getData_nascimento(),
            endereco: pessoa.getEndereco(),
            cargo: pessoa.getCargo(),
            celular: pessoa.getCelular(),
            matricula: pessoa.getMatricula(),
        };

        if (pessoa.getSenha()) {
            dados.senha = await bcrypt.hash(pessoa.getSenha(), 10);
        }

        return await PessoaDao.update(dados);
    }

    async deletar(matricula) {
        // 1. Validar
        if (!matricula) {
            throw new Error("Matrícula é obrigatória");
        }

        // 2. Executar delete
        const result = await PessoaDao.deletar(matricula);

        // 3. Verificar se deletou algo
        if (result.affectedRows === 0) {
            throw new Error("Pessoa não encontrada");
        }

        return {
            message: "Pessoa deletada com sucesso",
        };
    }
    async login(email, senha) {
        const usuario = await PessoaDao.buscarPorEmail(email);

        if (!usuario) {
            throw new Error("Email ou senha inválidos");
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            throw new Error("Email ou senha inválidos");
        }
        // GERA TOKEN

        const token = jwt.sign(
            {
                id: usuario.id,
                matricula: usuario.matricula,
                email: usuario.email,
                cargo: usuario.cargo,
            },
            process.env.SECRET_SENHA_LOGIN,

            {
                expiresIn: "1d",
            },
        );
        return token;
    }
}

module.exports = new PessoaService();
