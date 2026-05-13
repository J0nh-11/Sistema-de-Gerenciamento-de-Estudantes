"use strict";

const jwt = require('jsonwebtoken');
require('dotenv-safe').config();

function verifyJwt(req, res, next) {
    const token = req.headers['valide-token'];

    if (!token) return res.status(403).json({ error: "Nenhum token fornecido." });

    jwt.verify(token, process.env.SECRET_SENHA_LOGIN, (error, decoded) => {
        if (error) return res.status(500).json({ error: 'Falha na autenticação.' });

        req.userId = decoded.id;
        next();
    });
}

module.exports = verifyJwt;