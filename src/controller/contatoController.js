"use strict";

const ContatoDao = require("../repository/ContatoDao");

class ContatoController {
    async listar(req, res) {
        const contatos = await ContatoDao.listarTodos();

        res.json(contatos);
    }
}

module.exports = new ContatoController();
