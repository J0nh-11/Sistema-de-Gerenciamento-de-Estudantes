document.addEventListener("DOMContentLoaded", () => {
    exibirDataAtual();
    configurarLogout();
    configurarModal();
    carregarDisciplinas();
});
function configurarAcoesTabela() {
    document.querySelectorAll(".remover").forEach((botao) => {
        botao.addEventListener("click", async () => {
            const id = botao.dataset.id;

            if (!confirm("Deseja excluir esta disciplina?")) {
                return;
            }

            const resposta = await fetch(`/api/disciplinas/${id}`, {
                method: "DELETE",
            });

            if (resposta.ok) {
                alert("Disciplina removida!");
                location.reload();
            }
        });
    });

    document.querySelectorAll(".editar").forEach((botao) => {
        botao.addEventListener("click", () => {
            const id = botao.dataset.id;

            alert(`Editar disciplina ${id}`);
        });
    });
}
function exibirDataAtual() {
    const dateElement = document.getElementById("current-date");
    if (!dateElement) return;

    const hoje = new Date();

    const opcoesFormatacao = {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
    };

    let dataFormatada = hoje.toLocaleDateString("pt-BR", opcoesFormatacao);

    dataFormatada =
        dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);

    dateElement.textContent = dataFormatada;
}

function configurarLogout() {
    const btnLogout = document.getElementById("btn-logout");

    if (!btnLogout) return;

    btnLogout.addEventListener("click", () => {
        if (confirm("Deseja realmente sair do sistema escolar?")) {
            window.location.href = "/admin";
        }
    });
}

function configurarModal() {
    const modal = document.getElementById("modalDisciplina");

    const btnNovaDisciplina = document.getElementById("btnNovaDisciplina");

    const btnFecharModal = document.getElementById("btnFecharModal");

    const btnBuscarDocente = document.getElementById("btnBuscarDocente");

    const btnSalvarDisciplina = document.getElementById("btnSalvarDisciplina");

    btnNovaDisciplina.addEventListener("click", () => {
        modal.style.display = "flex";
    });

    btnFecharModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    btnBuscarDocente.addEventListener("click", async () => {
        try {
            const matricula = document.getElementById("matriculaDocente").value;

            const resposta = await fetch(
                `/api/docentes/matricula/${matricula}`,
            );
            if (!resposta.ok) {
                throw new Error("Docente não encontrado");
            }

            const docente = await resposta.json();

            document.getElementById("dadosDocente").innerHTML = `
                <p>
                    <strong>Nome:</strong>
                    ${docente.nome}
                </p>
            `;
        } catch (erro) {
            console.error(erro);

            document.getElementById("dadosDocente").innerHTML = `
                <p>Docente não encontrado.</p>
            `;
        }
    });

    btnSalvarDisciplina.addEventListener("click", async () => {
        try {
            const nome = document.getElementById("nomeDisciplina").value;

            const matricula = document.getElementById("matriculaDocente").value;

            const resposta = await fetch("/api/disciplinas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nome,
                    docente_matricula: matricula,
                }),
            });

            if (!resposta.ok) {
                throw new Error("Erro ao cadastrar disciplina");
            }

            alert("Disciplina cadastrada com sucesso!");
            location.reload();
        } catch (erro) {
            console.error(erro);
            alert("Erro ao cadastrar disciplina.");
        }
    });
}

async function carregarDisciplinas() {
    try {
        configurarAcoesTabela();

        const resposta = await fetch("/api/disciplinas");

        const retorno = await resposta.json();

        console.log(retorno);
        console.log(retorno.dados);
        if (!Array.isArray(retorno.dados)) {
            throw new Error("A API não retornou um array.");
        }

        const tabela = document.getElementById("tabelaAlunos");

        tabela.innerHTML = "";

        retorno.dados.forEach((disciplina) => {
            console.log(disciplina);

            tabela.innerHTML += `
        <tr>
            <td>${disciplina.disciplina}</td>
            <td>${disciplina.docente}</td>
            <td>
    <div class="acoes">
        <button
            class="btn-editar editar"
            data-id="${disciplina.id}">
            ✏️ Editar
        </button>

        <button
            class="btn-excluir remover"
            data-id="${disciplina.id}">
            🗑 Excluir
        </button>
    </div>
</td>
        </tr>
    `;
        });
        configurarAcoesTabela();
    } catch (erro) {
        console.error("Erro ao carregar disciplinas:", erro);
    }
}
