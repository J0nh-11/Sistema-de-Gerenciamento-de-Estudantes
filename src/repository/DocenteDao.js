"use strict";

const connectionFactory = require("../../config/db/ConnectionFactory");

class DocenteDao {
    async listDocente() {
        const sql = `SELECT  
            pessoa.id, pessoa.matricula, pessoa.cpf, pessoa.nome, pessoa.email, pessoa.data_nascimento, pessoa.endereco, pessoa.celular, pessoa.cargo,
            docente.formacao, docente.especialidade
            FROM docente
            INNER JOIN pessoa
            ON docente.matricula = pessoa.matricula`;

        const [result] = await connectionFactory.getConnection().execute(sql);
        return result;
    }
    async createDocente(docente) {
        const sql = `
                    INSERT INTO docente(matricula, especialidade, formacao, salario)
                    VALUES(?,?,?,?)
                    `;
        const values = [
            docente.matricula,
            docente.especialidade,
            docente.formacao,
            docente.salario,
        ];
        const [result] = await connectionFactory
            .getConnection()
            .execute(sql, values);
        return result;
    }
    async update(docente) {
        const sql = `UPDATE docente set
        especialidade = ?,
        formacao = ?,
        salario = ?
        WHERE matricula = ?
        `;
        const values = [
            docente.especialidade,
            docente.formacao,
            docente.salario,
            docente.matricula,
        ];
        const [result] = await connectionFactory
            .getConnection()
            .execute(sql, values);
        return result;
    }
    async deletar(id) {
        const sql = `DELETE FROM docente WHERE id = ?`;
        const values = [id];
        const [result] = await connectionFactory
            .getConnection()
            .execute(sql, values);
        return result;
    }
    async buscarPorMatricula(matricula) {
        const sql = `
        SELECT
            pessoa.id,
            pessoa.matricula,
            pessoa.cpf,
            pessoa.nome,
            pessoa.email,
            pessoa.data_nascimento,
            pessoa.endereco,
            pessoa.celular,
            pessoa.cargo,
            docente.formacao,
            docente.especialidade
        FROM docente
        INNER JOIN pessoa
            ON docente.matricula = pessoa.matricula
        WHERE docente.matricula = ?
    `;

        const [result] = await connectionFactory
            .getConnection()
            .execute(sql, [matricula]);

        return result[0];
    }
}

module.exports = new DocenteDao();
