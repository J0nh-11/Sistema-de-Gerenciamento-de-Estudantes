"use strict";

const bcrypt = require("bcrypt");
const connectionFactory = require("../../config/db/ConnectionFactory");

exports.findAll = async () => {
    const [rows] = await connectionFactory.getConnection().execute(
        "SELECT * FROM pessoa",
    );
    return rows;
};

exports.create = async ({ matricula, cpf, nome, senha, email, dataNascimento, endereco, cargo }) => {
    const hashedSenha = await bcrypt.hash(senha, 10);
    const [result] = await connectionFactory.getConnection().execute(
        "INSERT INTO pessoa (matricula, cpf, nome, senha, email, dataNascimento, endereco, cargo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [matricula, cpf, nome, hashedSenha, email, dataNascimento, endereco, cargo],
    );
    return result;
};