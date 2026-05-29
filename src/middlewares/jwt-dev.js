"use strict";

const jwt = require("jsonwebtoken");

require("dotenv").config();

function verifyJwt(req, res, next) {

    const authHeader =
        req.headers.authorization;

    if (!authHeader) {

        return res.status(401).json({
            erro: "Token não enviado"
        });

    }

    const partes =
        authHeader.split(" ");

    if (
        partes.length !== 2 ||
        partes[0] !== "Bearer"
    ) {

        return res.status(401).json({
            erro: "Token mal formatado"
        });

    }

    const token = partes[1];

    try {

        const decoded =
            jwt.verify(
                token,
                process.env.SECRET_SENHA_LOGIN
            );

        req.usuario = decoded;

        next();

    } catch {

        return res.status(401).json({
            erro: "Token inválido"
        });

    }

}

module.exports = verifyJwt;