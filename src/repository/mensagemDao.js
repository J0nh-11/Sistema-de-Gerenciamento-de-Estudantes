"use strict";

const db = require("../../config/db/ConnectionFactory");

class MensagemDao {
    async create(mensagem) {
        const sql = `
            INSERT INTO mensagem
            (
                conversa_id,
                remetente_matricula,
                texto
            )
            VALUES (?, ?, ?)
        `;

        return db.execute(sql, [
            mensagem.conversa_id,
            mensagem.remetente_matricula,
            mensagem.texto,
        ]);
    }

    async listByConversa(conversaId) {
        const sql = `
            SELECT
                m.*,
                p.nome
            FROM mensagem m
            INNER JOIN pessoa p
                ON p.matricula = m.remetente_matricula
            WHERE m.conversa_id = ?
            ORDER BY m.enviado_em ASC
        `;

        const [rows] = await db.execute(sql, [conversaId]);

        return rows;
    }

    async delete(id) {
        const sql = `
            DELETE FROM mensagem
            WHERE id = ?
        `;

        return db.execute(sql, [id]);
    }
}

module.exports = new MensagemDao();
