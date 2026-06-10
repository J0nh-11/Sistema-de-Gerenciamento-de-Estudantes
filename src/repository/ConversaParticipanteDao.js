"use strict";

const db = require("../../config/db/ConnectionFactory");

class ConversaParticipanteDao {
    async adicionar(conversaId, matricula) {
        const sql = `
            INSERT INTO conversa_participante
            (
                conversa_id,
                matricula
            )
            VALUES (?, ?)
        `;

        return db.execute(sql, [conversaId, matricula]);
    }

    async listarConversasUsuario(matricula) {
        const sql = `
            SELECT DISTINCT
                c.*
            FROM conversa c
            INNER JOIN conversa_participante cp
                ON cp.conversa_id = c.id
            WHERE cp.matricula = ?
            ORDER BY c.criado_em DESC
        `;

        const [rows] = await db.execute(sql, [matricula]);

        return rows;
    }

    async participantesDaConversa(conversaId) {
        const sql = `
            SELECT
                p.matricula,
                p.nome,
                p.cargo
            FROM conversa_participante cp
            INNER JOIN pessoa p
                ON p.matricula = cp.matricula
            WHERE cp.conversa_id = ?
        `;

        const [rows] = await db.execute(sql, [conversaId]);

        return rows;
    }
}

module.exports = new ConversaParticipanteDao();
