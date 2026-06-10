"use strict";

const db = require("../../config/db/ConnectionFactory");

class ContatoDao {
    async listarTodos() {
        const sql = `
            SELECT
                matricula,
                nome,
                cargo
            FROM pessoa
            ORDER BY nome
        `;

        const [rows] = await db.execute(sql);

        return rows;
    }
}

module.exports = new ContatoDao();
