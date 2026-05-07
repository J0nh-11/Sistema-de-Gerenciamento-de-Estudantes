const express = require("express");
const path = require("path");
const app = express();
const mysql = require('mysql2');

//Conecta a pasta public com arquivos estáticos.
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"src","view", "menu","telaMenu.html"));
});

app.use((req, res) => {
    res.status(404).send("Página não encontrada");
});

app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});
