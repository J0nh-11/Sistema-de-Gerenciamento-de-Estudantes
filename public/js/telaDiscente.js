document.addEventListener("DOMContentLoaded", () => {
    // 1. Gerenciamento de Cliques nos Botões de Ação
    const actionButtons = document.querySelectorAll(".btn");

    actionButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const buttonText = e.target.innerText;
            handleAction(buttonText);
        });
    });

    // 2. Lógica para Processar cada Ação
    function handleAction(action) {
        // Aqui simulamos a abertura de telas ou funções
        switch (true) {
            case action.includes("Cadastrar Novo Aluno"):
                exibirMensagem("Abrindo formulário de registro de aluno...");
                // Aqui você poderia redirecionar: window.location.href = 'cadastro-aluno.html';
                break;

            case action.includes("Cadastrar Novo Docente"):
                exibirMensagem("Acesso restrito ao RH/Administração.");
                break;

            case action.includes("Lançar Notas"):
                exibirMensagem("Carregando pauta da turma...");
                break;

            case action.includes("Contactar Responsáveis"):
                abrirChatSimulado();
                break;

            default:
                console.log("Ação disparada: " + action);
        }
    }

    // 3. Função de Feedback Visual (Toast/Alerta)
    function exibirMensagem(texto) {
        // Criar um elemento de alerta temporário
        const toast = document.createElement("div");
        toast.className = "toast-alert";
        toast.innerText = texto;

        document.body.appendChild(toast);

        // Remover após 3 segundos
        setTimeout(() => {
            toast.classList.add("hide");
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }

    // 4. Simulação de Logout
    const logoutBtn = document.querySelector(".logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            if (confirm("Deseja realmente sair do sistema?")) {
                window.location.href = "login.html"; // Redireciona para sua tela de login
            }
        });
    }

    // 5. Navegação da Sidebar (Troca de classe Active)
    const navLinks = document.querySelectorAll(".sidebar-nav a");
    navLinks.forEach((link) => {
        link.addEventListener("click", function () {
            navLinks.forEach((l) => l.classList.remove("active"));
            this.classList.add("active");
        });
    });
});

// Função para o Chat (Comunicação)
function abrirChatSimulado() {
    const nome = prompt("Para qual aluno deseja enviar mensagem?");
    if (nome) {
        alert(`Mensagem enviada com sucesso para os responsáveis de: ${nome}`);
    }
}
// Pequeno script para mostrar a data atual (opcional)
const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
};
document.getElementById("current-date").innerText =
    new Date().toLocaleDateString("pt-PT", options);
