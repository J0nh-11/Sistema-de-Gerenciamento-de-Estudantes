document.addEventListener("DOMContentLoaded", async () => {
    const tabela = document.getElementById("listaAvisos");

    let ehAdmin = false;

    try {
        const usuario = await fetch("/api/usuario");

        if (usuario.ok) {
            const dadosUsuario = await usuario.json();
            ehAdmin = dadosUsuario.cargo === "admin";
        }
    } catch (erro) {
        console.error("Erro ao verificar usuário:", erro);
    }

    try {
        const resposta = await fetch("/api/avisos");

        const avisos = await resposta.json();

        tabela.innerHTML = "";

        if (!avisos.length) {
            tabela.innerHTML = `
                <tr>
                    <td colspan="4">
                        Nenhum aviso encontrado.
                    </td>
                </tr>
            `;
            return;
        }

        avisos.forEach((aviso) => {
            const data = new Date(aviso.criado_em);

            const linha = document.createElement("tr");

            linha.innerHTML = `
                <td>Aviso</td>

                <td>
                    <strong>${aviso.titulo}</strong><br>
                    ${aviso.descricao}
                </td>

                <td>
                    ${data.toLocaleDateString("pt-BR")}
                </td>

                <td>
                    ${
                        ehAdmin
                            ? `
                                <button onclick="editarAviso(${aviso.id})">
                                    Editar
                                </button>

                                <button onclick="excluirAviso(${aviso.id})">
                                    Excluir
                                </button>
                              `
                            : ""
                    }
                </td>
            `;

            tabela.appendChild(linha);
        });
    } catch (erro) {
        console.error("Erro ao carregar avisos:", erro);

        tabela.innerHTML = `
            <tr>
                <td colspan="4">
                    Erro ao carregar avisos.
                </td>
            </tr>
        `;
    }
});

async function excluirAviso(id) {
    const confirmar = confirm("Deseja realmente excluir este aviso?");

    if (!confirmar) {
        return;
    }

    try {
        const resposta = await fetch(`/api/avisos/${id}`, {
            method: "DELETE",
        });

        if (resposta.ok) {
            location.reload();
        } else {
            const erro = await resposta.json();
            alert(erro.erro || "Erro ao excluir aviso.");
        }
    } catch (erro) {
        console.error(erro);
    }
}

async function editarAviso(id) {
    try {
        const resposta = await fetch("/api/avisos");

        const avisos = await resposta.json();

        const aviso = avisos.find((a) => a.id == id);

        if (!aviso) {
            alert("Aviso não encontrado.");
            return;
        }

        const titulo = prompt("Título:", aviso.titulo);

        if (titulo === null) {
            return;
        }

        const descricao = prompt("Descrição:", aviso.descricao);

        if (descricao === null) {
            return;
        }

        const data_expiracao = prompt(
            "Data (AAAA-MM-DD):",
            aviso.data_expiracao || "",
        );

        const atualizar = await fetch(`/api/avisos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                titulo,
                descricao,
                data_expiracao,
            }),
        });

        if (atualizar.ok) {
            location.reload();
        } else {
            const erro = await atualizar.json();
            alert(erro.erro);
        }
    } catch (erro) {
        console.error(erro);
    }
}
