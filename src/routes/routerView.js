const express = require("express");

const router = express.Router();

const path = require("path");

const verifyJwt = require("../middlewares/jwt-dev");

const permissao = require("../middlewares/permissao");

// LOGIN - Público
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/view/menu/telaMenu.html"));
});

// CADASTRO - Público
router.get("/cadastro", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/view/menu/cadastro.html"));
});

router.post("/cadastro/sucesso", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/view/menu/cadastro.html"));
});

// ADMIN - Protegido
router.get("/admin", verifyJwt, permissao("admin"), (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/view/admin/admin.html"));
});

router.get(
    "/admin/cadastros/:cargo",
    verifyJwt,
    permissao("admin"),
    (req, res) => {
        res.sendFile(
            path.join(__dirname, "../../public/view/admin/solicitacoes.html"),
        );
    },
);

router.get(
    "/admin/gerenciarMatriculas.html",
    verifyJwt,
    permissao("admin"),
    (req, res) => {
        res.sendFile(
            path.join(
                __dirname,
                "../../public/view/admin/matriculas/gerenciarMatriculas.html",
            ),
        );
    },
);

// DOCENTE - Protegido
router.get("/docente", verifyJwt, permissao("docente"), (req, res) => {
    res.sendFile(
        path.join(__dirname, "../../public/view/docente/telaDocente.html"),
    );
});

// DISCENTE - Protegido
router.get("/discente", verifyJwt, permissao("discente"), (req, res) => {
    res.sendFile(
        path.join(__dirname, "../../public/view/discente/telaDiscente.html"),
    );
});

// RESPONSÁVEL - Protegido
router.get("/responsavel", verifyJwt, permissao("responsavel"), (req, res) => {
    res.sendFile(
        path.join(__dirname, "../../public/view/responsavel/responsavel.html"),
    );
});

// Menu - Protegido
router.get("/telaMenu", verifyJwt, (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/view/menu/telaMenu.html"));
});

router.post("/admin/gerenciarMatriculas.html", verifyJwt, (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "../../public/view/admin/matriculas/gerenciarMatriculas.html",
        ),
    );
});
router.get("/admin/cursos", verifyJwt, (req, res) => {
    res.sendFile(
        path.join(__dirname, "../../public/view/admin/matriculas/cursos.html"),
    );
});
router.post("/admin/cursos", verifyJwt, (req, res) => {
    res.sendFile(
        path.join(__dirname, "../../public/view/admin/matriculas/cursos.html"),
    );
});
router.get("/admin/disciplinas", verifyJwt, (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "../../public/view/admin/matriculas/disciplinas.html",
        ),
    );
});
router.post("/admin/disciplinas", verifyJwt, (req, res) => {
    res.sendFile(
        path.join(__dirname, "../../public/view/admin/disciplinas.html"),
    );
});
router.get("/admin/dashboard", verifyJwt, (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/view/admin/admin.html"));
});
router.get("/admin/notas/lancar", verifyJwt, (req, res) => {
    res.sendFile(
        path.join(__dirname, "../../public/view/admin/notas/lancarNotas.html"),
    );
});
router.get("/admin/boletins", verifyJwt, (req, res) => {
    res.sendFile(
        path.join(__dirname, "../../public/view/admin/notas/boletins.html"),
    );
});
router.get("/admin/desempenho", verifyJwt, (req, res) => {
    res.sendFile(
        path.join(__dirname, "../../public/view/admin/notas/desempenho.html"),
    );
});
router.get("/admin/notas", verifyJwt, (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "../../public/view/admin/notas/gerenciarNotas.html",
        ),
    );
});
router.get("/admin/frequencias", verifyJwt, (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "../../public/view/admin/frequencias/gerenciaFrequencia.html",
        ),
    );
});
router.get("/admin/frequencias/relatorios", verifyJwt, (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "../../public/view/admin/frequencias/relatoriodFrequencia.html",
        ),
    );
});
router.get("/admin/frequencias/historico", verifyJwt, (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "../../public/view/admin/frequencias/historicoFrequencia.html",
        ),
    );
});

router.get("/admin/mensagens", verifyJwt, (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "../../public/view/admin/comunicacao/historicoMensagens.html",
        ),
    );
});
router.get("/admin/mensagens/nova", verifyJwt, (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "../../public/view/admin/comunicacao/enviarMensagem.html",
        ),
    );
});
router.get("/admin/avisos/novo", verifyJwt, (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "../../public/view/admin/comunicacao/exportarDados.html",
        ),
    );
});
router.get("/admin/notificacoes", verifyJwt, (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "../../public/view/admin/comunicacao/notificacoes.html",
        ),
    );
});

module.exports = router;
