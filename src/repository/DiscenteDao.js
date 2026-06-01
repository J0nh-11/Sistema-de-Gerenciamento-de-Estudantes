"use strict";

const connectionFactory = require("../../config/db/ConnectionFactory");

class DiscenteDao {
    async listDiscente() {
        const sql = `SELECT  
            pessoa.id, pessoa.matricula, pessoa.cpf, pessoa.nome, pessoa.email, pessoa.data_nascimento, pessoa.endereco, pessoa.celular, pessoa.cargo,
            discente.curso, discente.turma
            FROM discente
            INNER JOIN pessoa
            ON discente.matricula = matricula;
            `;

        const [result] = await connectionFactory.getConnection().execute(sql);
        return result;
    }
    async createDiscente(discente) {
        const sql = `INSERT INTO discente(matricula, turma, curso)
                      VALUES(?,?,?,?)`;
        const values = [discente.matricula, discente.turma, discente.curso];
        const [result] = await connectionFactory
            .getConnection()
            .execute(sql, values);
        return result;
    }
    async update(discente) {
        const sql = `UPDATE discente set
        turma = ?,
        curso = ?,
        matricula = ?
        WHERE matricula = ?
        `;
        const values = [discente.turma, discente.curso, discente.matricula];
    }
    async deletar(id) {
        const sql = ` SELECT discente.id FROM docente where id = ?`;
        const values = [id];
        const [result] = await connectionFactory
            .getConnection()
            .execute(sql, values);
    }
}

module.exports = new DiscenteDao();
