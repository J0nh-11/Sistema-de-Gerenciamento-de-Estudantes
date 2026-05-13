"use strict";

require("dotenv").config();
const mysql = require("mysql2/promise");

class ConnectionFactory {
    constructor() {
        this.pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
        });
    }

    async connect() {
        try {
            const connection = await this.pool.getConnection();
            connection.release();
            console.log("Conexão bem sucedida!");
        } catch (err) {
            console.error("Erro ao conectar ao banco de dados:", err);
            throw err;
        }
    }

    getConnection() {
        return this.pool;
    }

    async execute(sql, params = []) {
        return this.pool.execute(sql, params);
    }

    async end() {
        try {
            await this.pool.end();
            console.log("Conexão encerrada!");
        } catch (err) {
            console.error(
                "Erro ao encerrar a conexão com o banco de dados:",
                err,
            );
            throw err;
        }
    }
}

module.exports = new ConnectionFactory();
