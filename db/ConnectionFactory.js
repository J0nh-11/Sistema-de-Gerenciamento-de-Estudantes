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

    connect() {
        this.connection.connect((err) => {
            if (err) {
                console.error("Erro ao conectar ao Banco de Dados: " + err);
                return;
            }
            console.log("Conexão bem sucedida!");
        });
    }

    getConnection() {
        return this.connection;
    }

    end() {
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
}

module.exports = ConnectionFactory;
