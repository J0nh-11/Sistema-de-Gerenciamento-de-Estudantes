"use strict";

const bcrypt = require("bcrypt");
const connectionFactory = require("../../config/db/ConnectionFactory");

exports.findAll = async () => {
    const [rows] = await connectionFactory
        .getConnection()
        .execute("SELECT * FROM login");
    return rows;
};

exports.create = async ({ matricula, id, senha, email }) => {
    const [result] = await connectionFactory
        .getConnection()
        .execute(
            "INSERT INTO pessoa (matricula, id, senha, email) VALUES (?, ?, ?, ?)",
            [matricula, id, senha, email],
        );
    return result;
};

exports.update = async ({ matricula, id, senha, email }) => {
    const [result] = await connectionFactory.getConnection().execute(
        `UPDATE pessoa 
        set matricula = ?
        set id = ?
        set hashedSenhaNova = ?`,
        [matricula, id, senha, email],
    );
    return result;
};

exports.DELETE = async ({ id }) => {
    const [result] = await connectionFactory
        .getConnection()
        .execute("DELETE from pessoa where id = ?"[id]);
    return result;
};
