"use strict";

const db = require("../../config/db/ConnectionFactory");

class ConversaDao {
    async create() {
        const sql = `
        INSERT INTO conversa (criado_em)
        VALUES (NOW())
        `;

        const [result] = await db.execute(sql);

        return result.insertId;
    }

    async findById(id) {
        const sql = `
            SELECT *
            FROM conversa
            WHERE id = ?
        `;

        const [rows] = await db.execute(sql, [id]);

        return rows[0];
    }

    async list() {
        const sql = `
            SELECT *
            FROM conversa
            ORDER BY criado_em DESC
        `;

        const [rows] = await db.execute(sql);

        return rows;
    }

    async delete(id) {
        const sql = `
            DELETE FROM conversa
            WHERE id = ?
        `;

        return db.execute(sql, [id]);
    }
}

module.exports = new ConversaDao();
