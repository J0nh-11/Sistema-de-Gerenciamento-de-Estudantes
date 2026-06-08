// Cargo selecionado
let cargoSelecionado = "discente";

// Alternância das abas
function switchTab(role) {
    cargoSelecionado = role;

    const buttons = document.querySelectorAll(".tab-btn");

    buttons.forEach((btn) => {
        btn.classList.remove("active");
    });

    const clickedButton = Array.from(buttons).find((btn) =>
        btn.getAttribute("onclick").includes(role),
    );

    if (clickedButton) {
        clickedButton.classList.add("active");
    }

    const contextText = document.getElementById("user-context");

    switch (role) {
        case "discente":
            contextText.innerHTML = "Acesso para <strong>Aluno</strong>";

            break;

        case "docente":
            contextText.innerHTML = "Acesso para <strong>Professor</strong>";

            break;

        case "responsavel":
            contextText.innerHTML = "Acesso para <strong>Responsável</strong>";

            break;

        case "admin":
            contextText.innerHTML =
                "Acesso para <strong>Administrador</strong>";

            break;

        default:
            contextText.innerHTML = "Acesso ao <strong>Portal</strong>";
    }
}

// Form login
const form = document.getElementById("loginForm");

if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        try {
            const email = document.getElementById("email").value;

            const senha = document.getElementById("senha").value;

            // Validação básica
            if (!email || !senha) {
                alert("Preencha todos os campos");

                return;
            }

            const resposta = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // ESSENCIAL
                body: JSON.stringify({
                    email,
                    senha,
                    cargo: cargoSelecionado,
                }),
            });

            const dados = await resposta.json();

            // Login OK
            if (dados.sucesso) {
                // Redirecionamentos
                switch (cargoSelecionado) {
                    case "admin":
                        window.location.href = "/admin";
                        break;

                    case "docente":
                        window.location.href = "/docente";
                        break;

                    case "discente":
                        window.location.href = "/discente";
                        break;

                    case "responsavel":
                        window.location.href = "/responsavel";
                        break;
                    case "cadastro":
                        window.location.href = "/cadastro";
                        break;
                    case "recuperacao":
                        window.location.href = "/recuperacaoDeSenha";
                        break;
                    default:
                        window.location.href = "/";
                }
            } else {
                alert(dados.erro || "Login inválido");
            }
        } catch (error) {
            console.error(error);

            alert("Erro ao conectar com servidor");
        }
    });
}
