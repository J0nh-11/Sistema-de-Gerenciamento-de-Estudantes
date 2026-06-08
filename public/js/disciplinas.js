document.addEventListener("DOMContentLoaded", () => {
    // 1. Atualiza a data do topo dinamicamente baseada no dia de hoje
    exibirDataAtual();

    // 2. Monitora as ações na tabela de disciplinas
    inicializarAcoesTabela();

    // 3. Monitora o botão de Logout
    const btnLogout = document.getElementById("btn-logout");
    if (btnLogout) {
        btnLogout.addEventListener("click", () => {
            if (confirm("Deseja realmente sair do sistema escolar?")) {
                window.location.href = "/logout"; // Redirecionamento simulado
            }
        });
    }
});

/**
 * Função para formatar e exibir a data local no topo da página
 */
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

    // Transforma em "segunda-feira, 04 de maio de 2026"
    let dataFormatada = hoje.toLocaleDateString("pt-BR", opcoesFormatacao);

    // Primeira letra maiúscula para caprichar na interface
    dataFormatada =
        dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);

    dateElement.textContent = dataFormatada;
}

/**
 * Gerencia os cliques nos botões de Editar, Remover e Atribuir da tabela
 */
function inicializarAcoesTabela() {
    // Captura cliques de edição
    document.querySelectorAll(".btn-edit").forEach((botao) => {
        botao.addEventListener("click", (e) => {
            const idDisciplina = e.target.getAttribute("data-id");
            console.log(`Abrindo edição da disciplina: ${idDisciplina}`);
            // Exemplo de comportamento: window.location.href = `/admin/disciplinas/editar/${idDisciplina}`;
        });
    });

    // Captura cliques de remoção
    document.querySelectorAll(".btn-delete").forEach((botao) => {
        botao.addEventListener("click", (e) => {
            const idDisciplina = e.target.getAttribute("data-id");
            if (
                confirm(
                    `Tem certeza que deseja remover a disciplina ${idDisciplina}?`,
                )
            ) {
                console.log(`Removendo disciplina: ${idDisciplina}`);
                // Aqui entraria sua chamada de API / fetch para o backend
                e.target.closest("tr").remove(); // Remove a linha visualmente
            }
        });
    });

    // Captura cliques de atribuição de professor
    document.querySelectorAll(".btn-assign").forEach((botao) => {
        botao.addEventListener("click", (e) => {
            const idDisciplina = e.target.getAttribute("data-id");
            alert(
                `Abrir tela/modal para selecionar docente para a matéria: ${idDisciplina}`,
            );
        });
    });
}
