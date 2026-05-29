const express = require("express");

const router = express.Router();

const path = require("path");

const verifyJwt = require("../middlewares/jwt-dev");

const permissao = require("../middlewares/permissao");

// LOGIN
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/view/menu/telaMenu.html"));
});

// ADMIN
router.get(
    "/admin",

    (req, res) => {
        res.sendFile(
            path.join(__dirname, "../../public/view/admin/admin.html"),
        );
    },
);

// DOCENTE
router.get(
    "/docente",

    (req, res) => {
        res.sendFile(
            path.join(__dirname, "../../public/view/docente/telaDocente.html"),
        );
    },
);

// DISCENTE
router.get(
    "/discente",

    (req, res) => {
        res.sendFile(
            path.join(
                __dirname,
                "../../public/view/discente/telaDiscente.html",
            ),
        );
    },
);

// RESPONSÁVEL
router.get(
    "/responsavel",

    (req, res) => {
        res.sendFile(
            path.join(
                __dirname,
                "../../public/view/responsavel/responsavel.html",
            ),
        );
    },
);

//Cadastro
router.get("/cadastro", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/view/menu/cadastro.html"));
});

router.post("/cadastro/sucesso", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/view/menu/cadastro.html"));
});
//Volta menu
router.get("/telaMenu", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/view/menu/telaMenu.html"));
});

//
router.get("/admin/cadastros/:cargo", (req, res) => {
    res.sendFile(
        path.join(__dirname, "../../public/view/admin/solicitacoes.html"),
    );
});

router.get("/telaMatricula", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/view/admin/matriculas.html"));
});
module.exports = router;
