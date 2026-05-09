"use strict";

require("dotenv").config();
const mysql2 = require("mysql2");

class ConnectionFactory {
    constructor() {
        this.connection = mysql2.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
        });
    }

    async connect() {
        this.connection.connect((err) => {
            if (err) {
                console.error("Erro ao conectar ao Banco de Dados: " + err);
                return;
            }
            console.log("Conexão bem sucedida!");
        });
    }

    async getConnection() {
        return this.connection;
    }

    async end() {
        this.connection.end((err) => {
            if (err) {
                console.error(
                    "Erro ao encerrar a conexão com Banco de Dados: " + err,
                );
                return;
            }
            console.log("Conexão encerrada!");
        });
    }
    async getEnd() {
        return this.end;
    }
}

module.exports = new ConnectionFactory();
