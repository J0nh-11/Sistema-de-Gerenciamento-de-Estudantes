const AvisoService = require("../service/avisoService");

class AvisoController {
    async criar(req, res) {
        try {
            console.log(req.body);

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
}

module.exports = new AvisoController();
