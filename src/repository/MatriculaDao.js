"use strict";

const connectionFactory = require("../../config/db/ConnectionFactory");

class MatriculaDisciplinaDao {
    async create(dados) {
        const sql = `
            INSERT INTO matricula_disciplina (
                discente_matricula,
                disciplina_id,
                ano,
                semestre
            )
            VALUES (?, ?, ?, ?)
        `;

        const values = [
            dados.discente_matricula,
            dados.disciplina_id,
            dados.ano,
            dados.semestre,
        ];

        const [result] = await connectionFactory
            .getConnection()
            .execute(sql, values);

        return result;
    }

    async list() {
        const sql = `
            SELECT
                md.id,

                p.nome AS aluno,

                d.nome AS disciplina,

                md.ano,

                md.semestre,

                md.status

            FROM matricula_disciplina md

            INNER JOIN discente di
                ON di.matricula =
                md.discente_matricula

            INNER JOIN pessoa p
                ON p.matricula =
                di.matricula

            INNER JOIN disciplina d
                ON d.id =
                md.disciplina_id
        `;

        const [result] = await connectionFactory.getConnection().execute(sql);

        return result;
    }
    async deletar(id) {
        const sql = `
            SELECT id FROM matricula where id = ?;
        `;
        const values = [id];
        const [result] = await connectionFactory
            .getConnection()
            .execute(sql, values);
        return result;
    }
}

module.exports = new MatriculaDisciplinaDao();
