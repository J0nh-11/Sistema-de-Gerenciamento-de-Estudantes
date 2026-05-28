"use strict";

const bcrypt = require("bcrypt");
const connectionFactory = require("../ConnectionFactory");

async function adminSeeder() {
    try {
        // Verifica se já existe admin
        const [rows] = await connectionFactory.execute(
            "SELECT * FROM pessoa WHERE email = ?",

            ["joaodanielmaster6475@gmail.com"],
        );

        // Se existir, não cria novamente
        if (rows.length > 0) {
            console.log("Admin já existe.");

            return;
        }

        // Criptografa senha
        const senhaHash = await bcrypt.hash("@jd.dev1", 10);

        // Cria admin
        await connectionFactory.execute(
            `INSERT INTO pessoa
            (matricula, cpf, nome, senha, email, data_nascimento, endereco, celular,cargo)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)`,

            [
                2020228817,
                "00102200405",
                "João Daniel Pereira da Silva",
                senhaHash,
                "joaodanielmaster6475@gmail.com",
                "20080719",
                "Mirante de Atalaia",
                "82993998708",
                "admin",
            ],
        );

        console.log("Admin criado.");
    } catch (error) {
        console.erro("Erro no adminSeeder:", erro);
    }
}

module.exports = adminSeeder;
