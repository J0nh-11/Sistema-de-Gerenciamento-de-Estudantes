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
    async excluir(id) {
        return AvisoDao.delete(id);
    }
    async atualizar(id, dados) {
        if (!dados.titulo) {
            throw new Error("Título é obrigatório");
        }

        if (!dados.descricao) {
            throw new Error("Descrição é obrigatória");
        }

        return AvisoDao.update(id, dados);
    }

    async excluir(id) {
        return AvisoDao.delete(id);
    }
}

module.exports = new AvisoService();
