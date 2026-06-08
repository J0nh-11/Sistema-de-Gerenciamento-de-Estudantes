document.getElementById("filter-search").addEventListener("input", async () => {
    function renderizarTabela(matriculas) {
        const tbody = document.getElementById("table-body-matriculas");

        tbody.innerHTML = "";

        matriculas.forEach((matricula) => {
            const linha = document.createElement("tr");

            linha.innerHTML = `
            <td>${matricula.id}</td>
            <td>${matricula.aluno}</td>
            <td>${matricula.cpf || "-"}</td>
            <td>
                ${matricula.curso || "-"}
                /
                ${matricula.serie || "-"}
            </td>
            <td>${matricula.turma || "-"}</td>
            <td>${matricula.status}</td>
            <td>
                <button>Editar</button>
                <button>Excluir</button>
            </td>
        `;

            tbody.appendChild(linha);
        });

        document.getElementById("resultados-count").textContent =
            `Mostrando ${matriculas.length} matrículas`;
    }
    const filtro = document.getElementById("filter-search").value;
    const todasMatriculas = [];

    async function carregar() {
        const resposta = await fetch("/api/matricula");
        const resultado = await resposta.json();

        todasMatriculas.push(...resultado.dados);

        renderizarTabela(todasMatriculas);
    }

    try {
        const resposta = await fetch("/api/matricula/filtro", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                filtro,
            }),
        });

        const resultado = await resposta.json();

        console.log(resultado);

        if (resultado.sucesso) {
            renderizarTabela(resultado.dados);
        }
    } catch (erro) {
        console.error("Erro:", erro);
    }
});
