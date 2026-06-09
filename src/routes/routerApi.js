const express = require("express");

const api = express.Router();

const autController = require("../controller/ControllerLogin");

const solicitacoes = require("../controller/SolicitacaoController");

const matriculaController = require("../controller/matriculaController");

const MatriculaDisciplinaController = require("../controller/MatriculaDisciplinaController");

const ConversaController = require("../controller/conversaController");

const MensagemController = require("../controller/mensaemController");

const permissao = require("../middlewares/permissao");

const verifyJwt = require("../middlewares/jwt-dev");

const AvisoController = require("../controller/avisoController");


/**
 * PARA AVISOS
 */
api.post("/avisos", (req, res) =>
    AvisoController.criar(req, res)
);

api.get("/avisos", (req, res) =>
    AvisoController.listar(req, res)
);
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

api.get("/solicitacoes/pendentes/:cargo", solicitacoes.listarPorTipo);
api.put(
    "/solicitacoes/aprovar/:id",
    verifyJwt,
    permissao("admin"),
    solicitacoes.aprovar,
);

api.put(
    "/solicitacoes/rejeitar/:id",
    verifyJwt,
    permissao("admin"),
    solicitacoes.rejeitar,
);
/**
 * MATRÍCULAS EM DISCIPLINAS
 *
 * Endpoints para gerenciar matrículas de alunos em disciplinas
 */

// Listar todas as matrículas
api.get("/matricula", (req, res) => matriculaController.listar(req, res));

// Listar matrículas com detalhes completos (aluno + disciplina + docente)
api.get("/matricula/completo", (req, res) =>
    matriculaController.listarCompleto(req, res),
);

// Buscar matrícula por ID
api.get("/matricula/:id", (req, res) =>
    matriculaController.buscarPorId(req, res),
);

// Buscar matrículas de um discente específico
api.get("/matricula/discente/:matricula", (req, res) =>
    matriculaController.buscarPorDiscente(req, res),
);
api.put(
    "/solicitacoes/aprovar/:id",
    verifyJwt,
    permissao("admin"),
    solicitacoes.aprovar,
);

api.put(
    "/solicitacoes/rejeitar/:id",
    verifyJwt,
    permissao("admin"),
    solicitacoes.rejeitar,
);
// Criar nova matrícula
api.post("/matricula", (req, res) => matriculaController.criar(req, res));

// Atualizar matrícula completa
api.put("/matricula/:id", (req, res) =>
    matriculaController.atualizar(req, res),
);

// Atualizar apenas o status da matrícula
api.patch("/matricula/:id/status", (req, res) =>
    matriculaController.atualizarStatus(req, res),
);

// Deletar matrícula
api.delete("/matricula/:id", (req, res) =>
    matriculaController.deletar(req, res),
);

api.post("/conversas", (req, res) => ConversaController.criar(req, res));

api.get("/conversas", (req, res) => ConversaController.listar(req, res));

api.get("/conversas/:id", (req, res) => ConversaController.buscar(req, res));

api.delete("/conversas/:id", (req, res) =>
    ConversaController.excluir(req, res),
);

api.post("/mensagens", (req, res) => MensagemController.enviar(req, res));

api.get("/mensagens/:conversaId", (req, res) =>
    MensagemController.listar(req, res),
);

api.delete("/mensagens/:id", (req, res) =>
    MensagemController.excluir(req, res),
);

/**
 * ROTAS LEGADAS - Compatibilidade com frontend antigo
 */

api.get("/matricula/cadastrar/matriculas", (req, res) =>
    MatriculaDisciplinaController.listar(req, res),
);

api.post("/matricula/cadastrar/", (req, res) =>
    MatriculaDisciplinaController.cadastrar(req, res),
);

module.exports = api;
