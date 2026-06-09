const formMensagem = document.getElementById("formMensagem");
const mensagemErro = document.getElementById("mensagemErro");

formMensagem.addEventListener("submit", async (e) => {
    e.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("conteudo").value;
    const data_expiracao = document.getElementById("dataExpiracao").value;

    try {
        const resposta = await fetch("/api/avisos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                titulo,
                descricao,
                data_expiracao,
            }),
        });

        const dados = await resposta.json();

        if (resposta.ok) {
            window.location.href = "/admin";
        } else {
            mensagemErro.textContent =
                dados.erro || "Erro ao publicar o aviso.";
            mensagemErro.classList.remove("hidden");
        }
    } catch (erro) {
        console.error(erro);

        mensagemErro.textContent = "Não foi possível conectar ao servidor.";
        mensagemErro.classList.remove("hidden");
    }
});
