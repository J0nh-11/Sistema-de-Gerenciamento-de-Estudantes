document
    .getElementById("recovery-form")
    .addEventListener("submit", function (event) {
        // Impede a página de recarregar
        event.preventDefault();

        // Pega o e-mail digitado pelo usuário
        const emailDigitado = document.getElementById("email").value;

        // Coloca o e-mail digitado no texto da tela de sucesso
        document.getElementById("user-email").innerText = emailDigitado;

        // Esconde a tela do formulário e mostra a de sucesso
        document.getElementById("form-step").classList.add("hidden");
        document.getElementById("success-step").classList.remove("hidden");
    });
