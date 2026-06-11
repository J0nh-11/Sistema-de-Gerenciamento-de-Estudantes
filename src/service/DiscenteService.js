"use strict";

const DiscenteDao = require("../repository/DiscenteDao");

class DiscenteService {
    async listarAlunos() {
        return await DiscenteDao.listDiscente();
    }
    async remover(id) {
        // 1. Validar
        if (!id) {
            throw new Error("Matrícula é obrigatória");
        }

        // 2. Executar delete
        const result = await DiscenteDao.deletar(id);

        // 3. Verificar se deletou algo
        if (result.affectedRows === 0) {
            throw new Error("Pessoa não encontrada");
        }

        return {
            message: "Pessoa deletada com sucesso",
        };
    }
    async atualizar(discente) {}
}

module.exports = new DiscenteService();
