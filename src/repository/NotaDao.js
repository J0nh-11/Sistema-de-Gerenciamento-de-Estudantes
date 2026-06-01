"use strict";

const connectionFactory = require("../../config/db/ConnectionFactory");

class Nota {
    async list() {
        const sql = `
            SELECT id, matricula_disciplina_id, nota, bimestre 
            FROM nota;
        `;
        const [result] = await connectionFactory.getConnection().execute(sql);
        return result;
    }
    async create(dados) {
        const sql = `INSERT INTO nota( matricula_disciplina_id, nota, bimestre ) VALUES(?,?,?);`;
        const values = [dados.nota, dados.bimestre];
        const [result] = await connectionFactory
            .getConnection()
            .execute(sql, values);
        return result;
    }
    async update(dados) {
        const sql = `UPDATE nota set
                     matricula_disciplina_id = ?,
                     nota = ?,
                     bimestre = ?
                     where id = ?`;
        const values = [
            dados.nota,
            dados.bimestre,
            dados.matricula_disciplina_id,
            nota.id,
        ];
        const [result] = await connectionFactory
            .getConnection()
            .execute(sql, values);
        return result;
    }
    async deletar(id) {
        const [result] = await connectionFactory
            .getConnection()
            .execute("DELETE from pessoa where id = ?", [id]);
        return result;
    }
    async buscarPorMatriculaDisciplina(matriculaDisciplinaId) {
        const [rows] = await connectionFactory.getConnection().execute(
            `
            SELECT
                id,
                matricula_disciplina_id,
                nota,
                bimestre
            FROM nota
            WHERE matricula_disciplina_id = ?
            ORDER BY FIELD(
                bimestre,
                'primeiro',
                'segundo',
                'terceiro',
                'quarto'
            )
            `,
            [matriculaDisciplinaId],
        );

        return rows;
    }
}

module.exports = new Nota();