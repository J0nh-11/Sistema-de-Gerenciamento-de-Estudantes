"use strict";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const PessoaDao = require("../repository/PessoaDao");
const geraMatricula = require("./geraMatricula");

class PessoaService {
    async login(email, senha) {
        console.log("EMAIL DIGITADO:", email);

        const usuario = await PessoaDao.buscarPorEmail(email);

        console.log("USUARIO:", usuario);

        if (!usuario) {
            throw new Error("Email ou senha inválidos");
        }
        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        console.log("SENHA VALIDA:", senhaValida);

        if (!senhaValida) {
            throw new Error("Email ou senha inválidos");
        }

        const token = jwt.sign(
            {
                id: usuario.id,
                matricula: usuario.matricula,
                email: usuario.email,
                cargo: usuario.cargo,
            },
            process.env.SECRET_SENHA_LOGIN,
            {
                expiresIn: "24h",
            },
        );
        return token;
    }
    async create(pessoa) {
        // Limpa strings
        pessoa = {
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
        const validacao = validarCampos(pessoa, [
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
                pessoa.getDataNascimento(),
            ),
            cpf: pessoa.getCpf(),
            nome: pessoa.getNome(),
            senha: await bcrypt.hash(pessoa.getSenha(), 10),
            email: pessoa.getEmail(),
            data_nascimento: pessoa.getDataNascimento(),
            endereco: pessoa.getEndereco(),
            cargo: pessoa.getCargo(),
            celular: pessoa.getCelular(),
        };

        return PessoaDao.create(dados);
    }

    async list(opcoes = {}) {
        return await PessoaDao.list(opcoes);
    }

    async update(pessoa) {
        // Limpa strings
        pessoa = {
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
        const validacao = validarCampos(pessoa, [
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

        let dados = {
            id: pessoa.getId(),
            cpf: pessoa.getCpf(),
            nome: pessoa.getNome(),
            email: pessoa.getEmail(),
            data_nascimento: pessoa.getDataNascimento(),
            endereco: pessoa.getEndereco(),
            cargo: pessoa.getCargo(),
            celular: pessoa.getCelular(),
            matricula: await geraMatricula(
                pessoa.getId(),
                pessoa.getDataNascimento(),
            ),
        };
        if (!pessoa.getMatricula()) {
            throw new Error("Matrícula obrigatória");
        }
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
}

module.exports = new PessoaService();
