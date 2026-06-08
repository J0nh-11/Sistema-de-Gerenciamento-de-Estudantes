const autService = require("../service/PessoaService");

class ControllerLogin {
    async login(req, res) {
        try {
            const { email, senha } = req.body;
            console.log("BODY:", req.body);
            //  PRIMEIRO gera o token
            const token = await autService.login(email, senha);

            //  DEPOIS salva no cookie
            res.cookie("token", token, {
                httpOnly: true,
                secure: false, // true em produção
                // sameSite: "lax",
                maxAge: 1000 * 60 * 60 * 2,
            });

            return res.status(200).json({
                sucesso: true,
            });
        } catch (erro) {
            return res.status(401).json({
                sucesso: false,
                mensagem: erro.message,
            });
        }
    }
}

module.exports = new ControllerLogin();
