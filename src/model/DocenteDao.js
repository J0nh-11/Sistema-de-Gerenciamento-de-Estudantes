"use strict";

const connectionFactory = require("../../config/db/ConnectionFactory");

class DocenteDao {
    async findAll() {
        const [rows] = await connectionFactory.getConnection().execute(
            "SELECT * FROM docente",
        );
        return rows;
    }
}

module.exports = new DocenteDao();