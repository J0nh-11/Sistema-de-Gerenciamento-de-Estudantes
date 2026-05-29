const express = require("express");

const api = express.Router();

const autController = require("../controller/ControllerLogin");

const solicitacoes = require("../controller/SolicitacaoController");

const MatriculaDisciplinaController = require("../controller/MatriculaDisciplinaController");

/*
    LOGIN
*/

api.post("/login", autController.login);

/*
    CADASTROS
*/

api.get("/cadastros/:tipo", solicitacoes.listarPorTipo);

api.post("/cadastros", solicitacoes.create);
/*
    SOLICITAÇÕES
*/

api.get("/solicitacoes/pendentes/:cargo", solicitacoes.listarPorCargo);

api.put("/solicitacoes/aprovar/:id", solicitacoes.aprovar);

api.put("/solicitacoes/rejeitar/:id", solicitacoes.rejeitar);



api.get("/matricula/cadastrar/matriculas", (req, res) =>
    MatriculaDisciplinaController.listar(req, res),
);

api.post("/matricula/cadastrar/", (req, res) =>
    MatriculaDisciplinaController.cadastrar(req, res),
);


module.exports = api;
