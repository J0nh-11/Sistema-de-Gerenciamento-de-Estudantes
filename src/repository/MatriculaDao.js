"use strict";

const connectionFactory = require("../../config/db/ConnectionFactory");

class Matricula {
    async create(dados) {
        const sql = `
            INSERT INTO matricula (
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
    p.cpf,
    di.curso,
    di.serie,
    di.turma,
    d.nome AS disciplina,
    md.status
FROM matricula_disciplina md
INNER JOIN discente di
    ON di.matricula = md.discente_matricula
INNER JOIN pessoa p
    ON p.matricula = di.matricula
INNER JOIN disciplina d
    ON d.id = md.disciplina_id
        `;

        const [result] = await connectionFactory.getConnection().execute(sql);

        return result;
    }
    async deletar(id) {
        const sql = `
            DELETE FROM matricula WHERE id = ?
        `;
        const values = [id];
        const [result] = await connectionFactory
            .getConnection()
            .execute(sql, values);
        return result;
    }
}

module.exports = new Matricula();
