const AvisoService = require("../service/avisoService");
const avisoModel = require("../model/avisoModel");
class AvisoController {
    async criar(req, res) {
        try {
            console.log(req.body);
            let dados = {
                id: avisoModel.getId(),
                titulo: avisoModel.getTitulo(),
                descricao: avisoModel.getDescricao(),

            }
            await AvisoService.criar(req.body);

            res.status(201).json({
                mensagem: "Aviso criado com sucesso",
            });
        } catch (error) {
            res.status(400).json({
                erro: error.message,
            });
        }
    }

    async listar(req, res) {
        try {
            const avisos = await AvisoService.listar();

            res.json(avisos);
        } catch (error) {
            res.status(500).json({
                erro: error.message,
            });
        }
    }
    async excluir(req, res) {
        try {
            const { id } = req.params;

            await AvisoService.excluir(id);

            res.json({
                mensagem: "Aviso removido com sucesso",
            });
        } catch (error) {
            res.status(500).json({
                erro: error.message,
            });
        }
    }
    async atualizar(req, res) {
        try {
            const { id } = req.params;

            await AvisoService.atualizar(id, req.body);

            res.json({
                mensagem: "Aviso atualizado com sucesso",
            });
        } catch (error) {
            res.status(400).json({
                erro: error.message,
            });
        }
    }
}

module.exports = new AvisoController();
