require("dotenv").config();
const express = require("express");
const path = require("path");
const connectionFactory = require("./config/db/ConnectionFactory");
const porta = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "src", "view", "menu", "telaMenu.html"));
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "src", "view", "menu", "telaMenu.html"));
});

app.use((req, res) => {
    res.status(404).send("Página não encontrada");
});
//Conexão com o banco:
(async () => {
    try {
        await connectionFactory.connect();
        app.listen(porta, () => {
            console.log(`Servidor rodando em http://localhost:${porta}`);
        });
    } catch (error) {
        console.error("Falha ao iniciar o servidor:", error);
        process.exit(1);
    }
})();

process.on("SIGINT", async () => {
    console.log("Encerrando servidor...");
    await connectionFactory.end();
    process.exit(0);
});
