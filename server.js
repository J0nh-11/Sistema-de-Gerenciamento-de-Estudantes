const app = require('./app');
const connectionFactory = require("./config/db/ConnectionFactory");

const porta = process.env.PORT || 3000;

//Conexão com o banco:
(async () => {
    try {
        await connectionFactory.connect();
        app.listen(porta, () => {
            console.log(`Servidor rodando em http://localhost:${porta}`);
        });
    } catch (error) {
        console.error("Falha ao iniciar o servidor:", error);
        process.exit(1);
    }
})();

process.on("SIGINT", async () => {
    console.log("Encerrando servidor...");
    await connectionFactory.end();
    process.exit(0);
});