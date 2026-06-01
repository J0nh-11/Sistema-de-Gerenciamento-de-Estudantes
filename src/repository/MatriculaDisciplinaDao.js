"use strict";

const connectionFactory = require("../../config/db/ConnectionFactory");

class MatriculaDisciplinaDao {
    async list() {
        const [rows] = await connectionFactory.getConnection().execute(`
                SELECT
                    id,
                    discente_matricula,
                    disciplina_id,
                    ano,
                    semestre,
                    status,
                    data_matricula
                FROM matricula_disciplina
            `);

        return rows;
    }

    async create(matricula) {
        const sql = `
            INSERT INTO matricula_disciplina (
                discente_matricula,
                disciplina_id,
                ano,
                semestre,
                status
            )
            VALUES (?, ?, ?, ?, ?)
        `;

        const values = [
            matricula.discente_matricula,
            matricula.disciplina_id,
            matricula.ano,
            matricula.semestre,
            matricula.status || "CURSANDO",
        ];

        const [result] = await connectionFactory
            .getConnection()
            .execute(sql, values);

        return result;
    }

    async update(matricula) {
        const sql = `
            UPDATE matricula_disciplina
            SET
                discente_matricula = ?,
                disciplina_id = ?,
                ano = ?,
                semestre = ?,
                status = ?
            WHERE id = ?
        `;

        const values = [
            matricula.discente_matricula,
            matricula.disciplina_id,
            matricula.ano,
            matricula.semestre,
            matricula.status,
            matricula.id,
        ];

        const [result] = await connectionFactory
            .getConnection()
            .execute(sql, values);

        return result;
    }

    async deletar(id) {
        const [result] = await connectionFactory
            .getConnection()
            .execute("DELETE FROM matricula_disciplina WHERE id = ?", [id]);

        return result;
    }
    async buscarPorId(id) {
        const [rows] = await connectionFactory.getConnection().execute(
            `
            SELECT *
            FROM matricula_disciplina
            WHERE id = ?
            `,
            [id],
        );

        return rows[0];
    }
    async buscarPorDiscente(matricula) {
        const [rows] = await connectionFactory.getConnection().execute(
            `
            SELECT *
            FROM matricula_disciplina
            WHERE discente_matricula = ?
            `,
            [matricula],
        );

        return rows;
    }
    async listCompleto() {
        const [rows] = await connectionFactory.getConnection().execute(`
            SELECT
                md.id,
                d.nome AS aluno,
                dis.nome AS disciplina,
                md.ano,
                md.semestre,
                md.status,
                md.data_matricula
            FROM matricula_disciplina md
            INNER JOIN discente dc
                ON md.discente_matricula = dc.matricula
            INNER JOIN pessoa d
                ON dc.matricula = d.matricula
            INNER JOIN disciplina dis
                ON md.disciplina_id = dis.id
        `);

        return rows;
    }
}

module.exports = MatriculaDisciplinaDao;
