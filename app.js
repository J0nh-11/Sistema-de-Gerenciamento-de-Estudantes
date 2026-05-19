require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
                       
//rotas
const routerView = require('./src/routes/routerView');
const pessoaRouter = require('./src/routes/pessoaRouter');
app.use('/', routerView);
app.use('/api', pessoaRouter);

app.use((req, res) => {
    res.status(404).send("Página não encontrada");
});
module.exports = app;