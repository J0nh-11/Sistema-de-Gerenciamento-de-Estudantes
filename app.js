require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

//rotas

const routerView = require("./src/routes/routerView");
const pessoaRouter = require("./src/routes/pessoaRouter");
const authRouter = require("./src/routes/routerApi");

app.use(routerView);
app.use(pessoaRouter);
app.use("/api", authRouter);
app.use((req, res) => {
    res.status(404).send("Página não encontrada");
});

module.exports = app;
