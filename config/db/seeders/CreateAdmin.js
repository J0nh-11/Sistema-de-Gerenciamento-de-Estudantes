"use strict";

const bcrypt = require("bcrypt");
const connectionFactory = require("../ConnectionFactory");

async function adminSeeder() {
    try {
        const connection = connectionFactory.getConnection();

        // Verifica se já existe admin
        const [rows] = await connection.execute(
            "SELECT * FROM pessoa WHERE email = ?",
            ["joaodanielmaster6475@gmail.com"],
        );

        if (rows.length > 0) {
            console.log("Admin já existe.");
            return;
        }

        //  Criptografa senha
        const senhaHash = await bcrypt.hash("@jd.dev1", 10);

        //  Cria admin
        await connection.execute(
            `INSERT INTO pessoa
            (matricula, cpf, nome, senha, email, data_nascimento, endereco, celular, cargo)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                2020228817,
                "00102200405",
                "João Daniel Pereira da Silva",
                senhaHash,
                "joaodanielmaster6475@gmail.com",
                "2008-07-19", //  formato correto de data
                "Mirante de Atalaia",
                "82993998708",
                "admin",
            ],
        );

        console.log("Admin criado com sucesso.");
    } catch (error) {
        console.error("Erro no adminSeeder:", error); //  corrigido
    }
}

module.exports = adminSeeder;
