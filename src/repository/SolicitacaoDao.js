"use strict";

const connectionFactory = require("../../config/db/ConnectionFactory");

class SolicitacaoDao {
    async create(solicitacao) {
        // para acelerar farei os códigos sql em váriaveis;
        const sql = `
        INSERT INTO solicitacoes (nome, cpf, email, senha, cargo)
        VALUES (?,?,?,?,?);`;

        const valores = [
            solicitacao.nome,
            solicitacao.cpf,
            solicitacao.email,
            solicitacao.senha,
            solicitacao.cargo,
        ];

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
                    status
                FROM solicitacao
                WHERE status = 'pendente'
            `);

        return rows;
    }

    async aprovar(id) {
        const [result] = await connectionFactory.getConnection().execute(
            `
                UPDATE solicitacao
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
                UPDATE solicitacao_cadastro
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
            FROM solicitacao
            WHERE id = ?
        `,
            [id],
        );

        return rows[0];
    }
    async buscarPorTipo(cargo) {
        const sql = `
            SELECT 
            FROM solicitacao
            WHERE cargo = ?
        `;
        const values = [solicitacao.cargo];
        const result = await connectionFactory
            .getConnection()
            .execute(sql, values);
    }
}

module.exports = new SolicitacaoDao();
