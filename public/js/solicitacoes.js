document.addEventListener("DOMContentLoaded", carregarSolicitacoes);

async function carregarSolicitacoes() {
    try {
        const partes = window.location.pathname.split("/");

        const cargo = partes[partes.length - 1];

        document.getElementById("tituloPagina").textContent =
            `Solicitações de ${cargo}`;

        const resposta = await fetch(`/api/cadastros/${cargo}`, {
            credentials: "include",
        });

        const solicitacoes = await resposta.json();

        const lista = document.getElementById("listaSolicitacoes");

        lista.innerHTML = "";

        if (solicitacoes.length === 0) {
            lista.innerHTML = `
                <p>Nenhuma solicitação encontrada.</p>
            `;
            return;
        }

        solicitacoes.forEach((solicitacao) => {
            const card = document.createElement("div");

            card.classList.add("card-solicitacao");

            card.innerHTML = `
                <h3>${solicitacao.nome}</h3>

                <p><strong>CPF:</strong> ${solicitacao.cpf}</p>

                <p><strong>Email:</strong> ${solicitacao.email}</p>

                <p><strong>Cargo:</strong> ${solicitacao.cargo}</p>

                <p><strong>Status:</strong> ${solicitacao.status}</p>

                <button onclick="aprovar(${solicitacao.id})">
                    Aprovar
                </button>

                <button onclick="rejeitar(${solicitacao.id})">
                    Rejeitar
                </button>
            `;

            lista.appendChild(card);
        });
    } catch (erro) {
        console.error(erro);
    }
}

async function aprovar(id) {
    const resposta = await fetch(`/api/solicitacoes/aprovar/${id}`, {
        method: "PUT",
        credentials: "include",
    });

    const resultado = await resposta.json();

    alert(resultado.mensagem);

    carregarSolicitacoes();
}

async function rejeitar(id) {
    const resposta = await fetch(`/api/solicitacoes/rejeitar${id}`, {
        method: "PUT",
        credentials: "include",
    });

    const resultado = await resposta.json();

    alert(resultado.mensagem);
    carregarSolicitacoes();


}


// ==============================
// LOGOUT
// ==============================

const logoutBtn = document.querySelector(".logout-btn");

if (logoutBtn)
    logoutBtn.addEventListener("click", () => {
        const confirmar = confirm("Deseja voltar?");
        if (confirmar) window.location.href = "/admin";
    });
