const autService = require("../service/PessoaService");

class ControllerLogin {
    async login(req, res) {
        try {
            const { email, senha } = req.body;

            const token = await autService.login(email, senha);
            return res.status(200).json({
                sucesso: true,
                token,
            });
        } catch (erro) {
            return res.status(401).json({
                secesso: false,
                mensagam: erro.mensagem,
            });
        }
    }
}

module.exports = new ControllerLogin();
