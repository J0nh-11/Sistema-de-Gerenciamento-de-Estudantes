"use strict";

function permissao(...cargosPermitidos) {

    return (req, res, next) => {

        const cargoUsuario = req.usuario.cargo;

        // ADMIN entra em tudo
        if (cargoUsuario === "admin") {
            return next();
        }

        // Verifica cargos permitidos
        if (!cargosPermitidos.includes(cargoUsuario)) {

            return res.status(403).json({
                erro: "Acesso negado"
            });
        }

        next();
    };
}

module.exports = permissao;