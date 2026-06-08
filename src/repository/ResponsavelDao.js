"use strict";

const connectionFactory = require("../../config/db/ConnectionFactory");

class ResponsavelDao {
    async list() {
        const [rows] = await connectionFactory.getConnection().execute(`
           SELECT
        p.matricula,
        p.nome,
        p.email,
        p.celular,
        r.parentesco
        FROM responsavel r
        INNER JOIN pessoa p
        ON r.matricula = p.matricula;
        `);

        return rows;
    }

    async create(responsavel) {
        const sql = `
            INSERT INTO responsavel
            (matricula, parentesco)
            VALUES (?, ?)
        `;

        const values = [responsavel.matricula, responsavel.parentesco];

        const [result] = await connectionFactory
            .getConnection()
            .execute(sql, values);

        return result;
    }

    async update(responsavel) {
        const sql = `
            UPDATE responsavel
            SET parentesco = ?
            WHERE matricula = ?
        `;

        const values = [responsavel.parentesco, responsavel.matricula];

        const [result] = await connectionFactory
            .getConnection()
            .execute(sql, values);

        return result;
    }

    async deletar(matricula) {
        const [result] = await connectionFactory
            .getConnection()
            .execute(`DELETE FROM responsavel WHERE matricula = ?`, [
                matricula,
            ]);

        return result;
    }
}

module.exports = new ResponsavelDao();
