"use strict";

const connectionFactory = require("../../config/db/ConnectionFactory");

class ResponsavelDiscenteDao {
    async list() {
        const [rows] = await connectionFactory.getConnection().execute(`
            SELECT
            p.nome AS responsavel,
            d.nome AS aluno
            FROM responsavel_discente rd
            INNER JOIN pessoa p
            ON rd.responsavel_matricula = p.matricula
            INNER JOIN discente dc
            ON rd.discente_matricula = dc.matricula
            INNER JOIN pessoa d
            ON dc.matricula = d.matricula;
        `);

        return rows;
    }

    async create(relacao) {
        const sql = `
            INSERT INTO responsavel_discente
            (responsavel_matricula, discente_matricula)
            VALUES (?, ?)
        `;

        const values = [
            relacao.responsavel_matricula,
            relacao.discente_matricula,
        ];

        const [result] = await connectionFactory
            .getConnection()
            .execute(sql, values);

        return result;
    }

    async update(relacao) {
        const sql = `
            UPDATE responsavel_discente
            SET
                responsavel_matricula = ?,
                discente_matricula = ?
            WHERE id = ?
        `;

        const values = [
            relacao.responsavel_matricula,
            relacao.discente_matricula,
            relacao.id,
        ];

        const [result] = await connectionFactory
            .getConnection()
            .execute(sql, values);

        return result;
    }

    async deletar(id) {
        const [result] = await connectionFactory
            .getConnection()
            .execute(`DELETE FROM responsavel_discente WHERE id = ?`, [id]);

        return result;
    }
}

module.exports = new ResponsavelDiscenteDao();
