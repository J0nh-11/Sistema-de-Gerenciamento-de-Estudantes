const AvisoDao = require("../repository/avisoDao");

class AvisoService {
    async criar(dados) {
        if (!dados.titulo) {
            throw new Error("Título é obrigatório");
        }

        if (!dados.descricao) {
            throw new Error("Descrição é obrigatória");
        }
        console.log("SERVICE:", dados);

        return AvisoDao.criar(dados);
    }

    async listar() {
        return AvisoDao.list();
    }
}

module.exports = new AvisoService();
