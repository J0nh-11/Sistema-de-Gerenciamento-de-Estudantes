const express = require("express");
const path = require("path");
const app = express();
const mysql2 = require('mysql2');
const connectionFactory = require('../projetoFinal912a/config/db/ConnectionFactory');
const porta = 3000
app.use(express.json());
//Conecta a pasta public com arquivos estáticos.
app.use(express.static(path.join(__dirname, "public", 'css')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"src","view", "menu","telaMenu.html"));
});

app.use((req, res) => {
    res.status(404).send("Página não encontrada");
});

app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});

// Criando uma instância da ConnectionFactory
// Testando a conexão com o banco de dados
connectionFactory.connect();
// Simulando uma operação no banco de dados
setTimeout(function() {
// Encerrando a conexão com o banco de dados após 5 segundos
connectionFactory.end();
}, 4000);