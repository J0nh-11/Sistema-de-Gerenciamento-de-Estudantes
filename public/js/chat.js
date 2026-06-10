let conversaAtual = null;
let usuarioLogado = null;

document.addEventListener("DOMContentLoaded", async () => {
    console.log("Chat carregado");

    try {
        await carregarUsuario();
    } catch (error) {
        console.error("Erro ao carregar usuário:", error);
    }

    await carregarConversas();

    document
        .getElementById("formMensagem")
        .addEventListener("submit", enviarMensagem);

    document
        .getElementById("btnNovaConversa")
        .addEventListener("click", carregarContatos);
});

async function carregarUsuario() {
    const response = await fetch("/api/usuario");

    if (!response.ok) {
        throw new Error("Erro ao carregar usuário");
    }

    usuarioLogado = await response.json();

    console.log("Usuário logado:", usuarioLogado);
}

async function criarConversa(destinatario) {
    try {
        const response = await fetch("/api/conversas/iniciar", {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                destinatario,
            }),
        });

        const conversa = await response.json();

        if (!response.ok) {
            throw new Error(conversa.erro);
        }

        await carregarConversas();

        conversaAtual = conversa.id;

        await carregarMensagens(conversa.id);
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

async function carregarConversas() {
    try {
        const response = await fetch("/api/conversas");

        if (!response.ok) {
            throw new Error("Erro ao carregar conversas");
        }

        const conversas = await response.json();

        console.log("Conversas:", conversas);

        const lista = document.getElementById("listaConversas");

        lista.innerHTML = "";

        conversas.forEach((conversa) => {
            const li = document.createElement("li");

            li.textContent = conversa.nome || `Conversa ${conversa.id}`;

            li.addEventListener("click", async () => {
                conversaAtual = conversa.id;

                document.getElementById("nomeContato").textContent =
                    conversa.nome || `Conversa ${conversa.id}`;

                await carregarMensagens(conversa.id);
            });

            lista.appendChild(li);
        });
    } catch (error) {
        console.error("Erro ao carregar conversas:", error);
    }
}

async function carregarMensagens(conversaId) {
    try {
        const response = await fetch(`/api/mensagens/${conversaId}`);

        if (!response.ok) {
            throw new Error("Erro ao carregar mensagens");
        }

        const mensagens = await response.json();

        const container = document.getElementById("mensagens");

        container.innerHTML = "";

        mensagens.forEach((msg) => {
            const div = document.createElement("div");

            div.classList.add("mensagem");

            div.innerHTML = `
                <strong>${msg.nome || "Usuário"}</strong><br>
                ${msg.texto}
            `;

            container.appendChild(div);
        });

        container.scrollTop = container.scrollHeight;
    } catch (error) {
        console.error("Erro ao carregar mensagens:", error);
    }
}

async function enviarMensagem(event) {
    event.preventDefault();

    const input = document.getElementById("texto");

    const texto = input.value.trim();

    if (!conversaAtual) {
        alert("Selecione uma conversa primeiro.");
        return;
    }

    if (!texto) {
        alert("Digite uma mensagem.");
        return;
    }

    try {
        console.log("Enviando mensagem...");

        const response = await fetch("/api/mensagens", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                conversa_id: conversaAtual,
                remetente_matricula: "2020228817",
                texto,
            }),
        });

        const resultado = await response.json();

        if (!response.ok) {
            throw new Error(resultado.erro || "Erro ao enviar mensagem");
        }

        input.value = "";

        await carregarMensagens(conversaAtual);

        console.log("Mensagem enviada");
    } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
        alert(error.message);
    }
}
async function carregarContatos() {
    try {
        const response = await fetch("/api/contatos");

        const contatos = await response.json();

        const lista = document.getElementById("listaContatos");

        lista.innerHTML = "";
        lista.style.display = "block";

        contatos.forEach((contato) => {
            const li = document.createElement("li");

            li.textContent = `${contato.nome} (${contato.cargo})`;

            li.addEventListener("click", () =>
                criarConversa(contato.matricula),
            );

            lista.appendChild(li);
        });
    } catch (error) {
        console.error(error);
    }
}
