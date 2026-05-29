const express = require("express");
const router = express.Router();
const controller_pessoa = require("../controller/ControllerPessoa");
const verifyJwt = require("../middlewares/jwt-dev");
const permissao = require("../middlewares/permissao");

//Rotas de pessoa
router.post(
    "/pessoas",
    verifyJwt,
    permissao("admin", "docente"),
    controller_pessoa.create,
);
router.get("/pessoas", verifyJwt, controller_pessoa.list);
router.put("/pessoas/:matricula", verifyJwt, controller_pessoa.update);
router.delete(
    "/pessoas/:matricula",
    verifyJwt,
    permissao("admin"),
    controller_pessoa.deletar,
);

module.exports = router;
