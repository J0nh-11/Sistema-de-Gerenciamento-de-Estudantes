"use strict";

const db = require("../../config/db/ConnectionFactory");

class AvisoDao {
    async criar(aviso) {
        console.log("DAO:", aviso);
        const sql = `
            INSERT INTO aviso
            (
                titulo,
                descricao,
                data_expiracao  
            )
            VALUES (?, ?, ?)
        `;

        return db
            .getConnection()
            .execute(sql, [
                aviso.titulo,
                aviso.descricao,
                aviso.data_expiracao,
            ]);
    }

    async list() {
        const sql = `
            SELECT *
            FROM aviso
            ORDER BY criado_em DESC
        `;

        const [rows] = await db.getConnection().execute(sql);

        return rows;
    }
    async delete(id) {
        const sql = `
        DELETE FROM aviso
        WHERE id = ?
    `;

        return db.getConnection().execute(sql, [id]);
    }
    async update(id, aviso) {
        const sql = `
        UPDATE aviso
        SET
            titulo = ?,
            descricao = ?,
            data_expiracao = ?
        WHERE id = ?
    `;

        return db
            .getConnection()
            .execute(sql, [
                aviso.titulo,
                aviso.descricao,
                aviso.data_expiracao,
                id,
            ]);
    }
}

module.exports = new AvisoDao();
