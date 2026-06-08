"use strict";

const jwt = require("jsonwebtoken");

function verifyJwt(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            erro: "Token não enviado",
        });
    }

    try {
        console.log("Cookies:", req.cookies);
        console.log("Token:", req.cookies.token);
        const decoded = jwt.verify(token, process.env.SECRET_SENHA_LOGIN);
        req.usuario = decoded;

        next();
    } catch (error) {
        console.error("ERRO JWT:", error);

        return res.status(401).json({
            erro: "Token inválido",
            detalhe: error.message,
        });
    }
}

module.exports = verifyJwt;
