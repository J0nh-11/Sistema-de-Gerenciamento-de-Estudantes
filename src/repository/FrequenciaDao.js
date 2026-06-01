"use strict";

const connectionFactory = require("../../config/db/ConnectionFactory");

class Frequencia {
    async list() {
        const sql = `
            SELECT presente, data_aula 
            FROM frequencia;
       `;
        const [result] = await connectionFactory.getConnection().execute(sql);
        return result;
    }
    async create(frequencia) {
        const sql = `
        INSERT INTO frequencia
        (matricula_disciplina_id, data_aula, presente)
        VALUES (?, ?, ?)
    `;

        const values = [
            frequencia.matricula_disciplina_id,
            frequencia.data_aula,
            frequencia.presente,
        ];

        const [result] = await connectionFactory
            .getConnection()
            .execute(sql, values);

        return result;
    }
    async listarPorId(id) {
        const sql = `
        SELECT *
        FROM frequencia
        WHERE id = ?
    `;

        const [rows] = await connectionFactory
            .getConnection()
            .execute(sql, [id]);

        return rows[0];
    }
    async listarPorMatriculaDisciplina(matriculaDisciplinaId) {
        const sql = `
        SELECT *
        FROM frequencia
        WHERE matricula_disciplina_id = ?
        ORDER BY data_aula
    `;

        const [rows] = await connectionFactory
            .getConnection()
            .execute(sql, [matriculaDisciplinaId]);

        return rows;
    }
    async update(id, presente) {
        const sql = `
        UPDATE frequencia
        SET presente = ?
        WHERE id = ?
    `;

        const [result] = await connectionFactory
            .getConnection()
            .execute(sql, [presente, id]);

        return result;
    }
}

module.exports = new Frequencia();
