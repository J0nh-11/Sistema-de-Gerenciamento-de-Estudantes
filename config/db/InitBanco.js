"use strict";
const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");
const adminSeeder = require("./seeders/CreateAdmin");

async function InitDatabase() {
    const connectTemporaria = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,

        multipleStatements: true,
    });
    //Cria o banco se não existir
    await connectTemporaria.query("CREATE DATABASE IF NOT EXISTS sistema;");
    console.log("Banco criado/verificado.");
    //Seleciona Banco
    await connectTemporaria.query("USE sistema;");

    //Lê o arquivo bd.sql puro
    const sqlPath = path.join(__dirname, "bd.sql");

    const sql = fs.readFileSync(sqlPath, "utf-8");

    ///Executa slqPath (arquivo com códigos puros sql);
    await connectTemporaria.query(sql);
    console.log("Tabelas verificadas/Criadas.");

    //Cria adm se não houver:

    await adminSeeder();
    console.log("Adm criado/já existe.");
    
    await connectTemporaria.end();

    console.log("Conexão temporaria encerrada!");
}

module.exports = InitDatabase;
