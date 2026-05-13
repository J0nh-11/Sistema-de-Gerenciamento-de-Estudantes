"use strict";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const connect = require("../../config/db/ConnectionFactory");

async function login(req, res) {
    try {
        const { email, matricula, senha } = req.body;
        const [rows] = await connect.execute(
            "SELECT * FROM login WHERE email = ? OR matricula = ?",
            [email, matricula],
        );
        const usuario = rows[0];

        if (!usuario)
            return res.status(401).json({ error: "Usuário não encontrado." });

        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            return res.status(401).json({ error: "Senha inválida." });
        }

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            process.env.SECRET_SENHA_LOGIN,
            { expiresIn: "1h" },
        );

        return res.json({ auth: true, token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro interno." });
    }
}

module.exports = login;
