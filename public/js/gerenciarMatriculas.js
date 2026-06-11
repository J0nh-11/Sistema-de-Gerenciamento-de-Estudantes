document.addEventListener("DOMContentLoaded", async () => {
    const resposta = await fetch("/api/alunos");

    const alunos = await resposta.json();

    const tabela = document.getElementById("tabelaAlunos");

    alunos.forEach((aluno) => {
        tabela.innerHTML += `
            <tr>
                <td>${aluno.nome}</td>
                <td>${aluno.matricula}</td>
                <td>${aluno.curso}</td>
            </tr>
        `;
    });
});
