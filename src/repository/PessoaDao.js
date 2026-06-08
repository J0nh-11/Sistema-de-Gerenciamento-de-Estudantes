"use strict";
const connectionFactory = require("../../config/db/ConnectionFactory");

class PessoaDao {
    async list() {
        const [result] = await connectionFactory.getConnection().execute(`
                SELECT id, matricula, cpf, nome, email, data_nascimento, endereco, celular, cargo FROM pessoa
                `);
        return result;
    }

    async buscarPorEmail(email) {
        const [result] = await connectionFactory.getConnection().execute(
            `
                SELECT id, matricula, cpf, nome, senha, email, data_nascimento, endereco, celular, cargo FROM pessoa WHERE email = ?
                `,
            [email],
        );
        return result[0];
    }

    async create(pessoa) {
        const sql = `INSERT INTO pessoa (matricula, cpf, nome, senha, email, data_nascimento, endereco, celular,cargo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [
            pessoa.matricula,
            pessoa.cpf,
            pessoa.nome,
            pessoa.senha,
            pessoa.email,
            pessoa.data_nascimento,
            pessoa.endereco,
            pessoa.celular,
            pessoa.cargo,
        ];
        const [result] = await connectionFactory
            .getConnection()
            .execute(sql, values);
        return result;
    }

    async update(pessoa) {
        const sql = `UPDATE pessoa set 
         cpf = ?,
         nome = ?,
         email = ?,
         data_nascimento = ?,
         endereco = ?,
         celular = ?,
         cargo = ?
         WHERE matricula = ?    
         `;
        const values = [
            pessoa.cpf,
            pessoa.nome,
            pessoa.email,
            pessoa.data_nascimento,
            pessoa.endereco,
            pessoa.celular,
            pessoa.cargo,
            pessoa.matricula,
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
    async buscarPorMatricula(matricula) {
        const [result] = await connectionFactory
            .getConnection()
            .execute("SELECT * FROM pessoa WHERE matricula = ?", [matricula]);

        return result[0]; // retorna o primeiro resultado
    }
}

module.exports = new PessoaDao();
