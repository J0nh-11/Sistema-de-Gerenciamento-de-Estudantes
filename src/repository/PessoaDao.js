"use strict";
const connectionFactory = require("../../config/db/ConnectionFactory");
const PessoaModel = require("../model/PessoaModel");
const pessoa = new PessoaModel();

class PessoaDao {
    async list() {
        const [rows] = await connectionFactory
            .getConnection()
            .execute("SELECT * FROM pessoa");
        return rows;
    }

    async create(pessoa) {
        const [result] = await connectionFactory
            .getConnection()
            .execute(
                "INSERT INTO pessoa (matricula, cpf, nome, senha, email, dataNascimento, endereco, cargo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                [
                    pessoa.matricula,
                    pessoa.cpf,
                    pessoa.nome,
                    pessoa.senha,
                    pessoa.email,
                    pessoa.dataNascimento,
                    pessoa.endereco,
                    pessoa.cargo,
                ],
            );
        return result;
    }

    async update(pessoa) {
        const [result] = await connectionFactory.getConnection().execute(
            `UPDATE pessoa set 
         cpf = ?,
         nome = ?,
         senha = ?,
         email = ?,
         dataNascimento = ?,
         endereco = ?,
         cargo = ?
         WHERE matricula = ?    
         `,
            [
                pessoa.cpf,
                pessoa.nome,
                pessoa.senha,
                pessoa.email,
                pessoa.dataNascimento,
                pessoa.endereco,
                pessoa.cargo,
                pessoa.matricula,
            ],
        );
        return result;
    }

    async delete(matricula) {
        const [result] = await connectionFactory
            .getConnection()
            .execute("DELETE from pessoa where matricula = ?", [matricula]);
        return result;
    }
    async buscarPorEmail(email) {
        const [rows] = await connectionFactory
            .getConnection()
            .execute("SELECT * FROM pessoa WHERE email = ?", [email]);

        return rows[0]; // retorna o primeiro resultado
    }
}

module.exports = new PessoaDao();
