"use strict";

const connectionFactory = require("../../config/db/ConnectionFactory");

class SolicitacaoDao {
    async create(solicitacao) {
        // para acelerar farei os códigos sql em váriaveis;
        console.log("SOLICITAÇÃO:", solicitacao);

        const sql = `
INSERT INTO solicitacoes (
                    nome,
                    cpf,
                    email,
                    senha,
                    cargo,
                    data_nascimento,
                    celular,
                    endereco,
                    curso,
                    turma,
                    especialidade,
                    formacao,
                    salario,
                    parentesco
                )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?)
`;

        const valores = [
            solicitacao.nome,
            solicitacao.cpf,
            solicitacao.email,
            solicitacao.senha,
            solicitacao.cargo,
            solicitacao.data_nascimento,
            solicitacao.celular,
            solicitacao.endereco,
            solicitacao.curso,
            solicitacao.turma,
            solicitacao.especialidade,
            solicitacao.formacao,
            solicitacao.salario,
            solicitacao.parentesco,
        ];
        console.log("SOLICITAÇÃO:", solicitacao);
        console.log("VALORES:", valores);

        const [result] = await connectionFactory
            .getConnection()
            .execute(sql, valores);
        return result;
    }

    async listarPendentes() {
        const [rows] = await connectionFactory.getConnection().execute(`
                SELECT
                    id,
                    nome,
                    cpf,
                    email,
                    cargo,
                    status,
                    data_nascimento,
                    celular,
                    endereco,
                    curso,
                    turma,
                    especialidade,
                    formacao,
                    salario,
                    parentesco
                FROM solicitacoes
                WHERE status = 'pendente'
            `);

        return rows;
    }

    async aprovar(id) {
        const [result] = await connectionFactory.getConnection().execute(
            `
                UPDATE solicitacoes
                SET status = 'aprovado'
                WHERE id = ?
            `,
            [id],
        );
        return result;
    }

    async rejeitar(id) {
        const [result] = await connectionFactory.getConnection().execute(
            `
                UPDATE solicitacoes
                SET status = 'rejeitado'
                WHERE id = ?
            `,
            [id],
        );

        return result;
    }
    async buscarPorId(id) {
        const [rows] = await connectionFactory.getConnection().execute(
            `
            SELECT *
            FROM solicitacoes
            WHERE id = ?
        `,
            [id],
        );

        return rows[0];
    }
    async buscarPorTipo(cargo) {
        const [rows] = await connectionFactory.getConnection().execute(
            `
            SELECT id, nome, cpf, email, cargo, status
            FROM solicitacoes
            WHERE cargo = ?
        `,
            [cargo],
        );
        return rows;
    }
    async buscarPorCpf(cpf) {
        const [rows] = await connectionFactory.getConnection().execute(
            `
            SELECT id, nome, cpf, email, cargo, status
            FROM solicitacoes
            WHERE cpf = ?
        `,
            [cpf],
        );
        return rows[0];
    }
    async deletar(id) {
        const [rows] = await connectionFactory
            .getConnection()
            .execute(`DELETE FROM solicitacoes WHERE id = ?`, [id]);
        return rows;
    }
}

module.exports = new SolicitacaoDao();
