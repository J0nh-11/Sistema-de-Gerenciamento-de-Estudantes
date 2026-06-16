"use strict";

const connectionFactory = require("../../config/db/ConnectionFactory");

class Disciplina {
    async create(dados) {
        const sql = `
            INSERT INTO disciplina(
                nome,
                docente_matricula
            )
            VALUES (?, ?)
        `;

        const values = [dados.nome, dados.docente_matricula];

        const [result] = await connectionFactory
            .getConnection()
            .execute(sql, values);

        return result;
    }

    async list() {
        const sql = `
           SELECT
    dp.id,
    dp.nome AS disciplina,
    dp.docente_matricula,
    p.nome AS docente
FROM disciplina dp
INNER JOIN docente dc
    ON dp.docente_matricula = dc.matricula
INNER JOIN pessoa p
    ON dc.matricula = p.matricula
                    `;
        const [result] = await connectionFactory.getConnection().execute(sql);

        return result;
    }
    async deletar(id) {
        const sql = `
            DELETE FROM disciplina WHERE id = ?
        `;
        const values = [id];
        const [result] = await connectionFactory
            .getConnection()
            .execute(sql, values);
        return result;
    }
}

module.exports = new Disciplina();
