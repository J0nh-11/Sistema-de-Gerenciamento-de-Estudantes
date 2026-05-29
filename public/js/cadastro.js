document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const cpfInput = document.getElementById("cpf");

    // ==========================================================================
    // 1. MÁSCARA DE CPF (Formata enquanto o usuário digita)
    // ==========================================================================
    cpfInput.addEventListener("input", (e) => {
        let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não é número

        if (value.length > 11) value = value.slice(0, 11); // Limita a 11 dígitos

        // Aplica a estilização de pontos e hífen
        if (value.length > 9) {
            value = value.replace(
                /^(\d{3})(\d{3})(\d{3})(\d{1,2})$/,
                "$1.$2.$3-$4",
            );
        } else if (value.length > 6) {
            value = value.replace(/^(\d{3})(\d{3})(\d{1,3})$/, "$1.$2.$3");
        } else if (value.length > 3) {
            value = value.replace(/^(\d{3})(\d{1,3})$/, "$1.$2");
        }

        e.target.value = value;
    });

    // ==========================================================================
    // 2. FUNÇÃO DE VALIDAÇÃO DO CPF (Algoritmo Oficial)
    // ==========================================================================
    function validarCPF(cpf) {
        cpf = cpf.replace(/\D/g, ""); // Remove a máscara para validar apenas os números

        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
            return false; // CPF deve ter 11 dígitos e não pode ser tudo igual
        }

        // Validação do 1º dígito verificador
        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.charAt(9))) return false;

        // Validação do 2º dígito verificador
        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.charAt(10))) return false;

        return true;
    }

    // ==========================================================================
    // 3. INTERCEPTAÇÃO E ENVIO DO FORMULÁRIO (Chamada para a API)
    // ==========================================================================
    form.addEventListener("submit", async (e) => {
        // Evita o envio padrão e o recarregamento da página
        e.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const cpf = cpfInput.value;
        const email = document.getElementById("email").value.trim();
        const senha = document.getElementById("senha").value;
        const tipoUsuario = document.getElementById("tipo_usuario").value;

        // Validação de segurança básica para campos vazios
        if (!nome || !cpf || !email || !senha || !tipoUsuario) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        // Validação do CPF
        if (!validarCPF(cpf)) {
            alert("Por favor, insira um CPF válido.");
            cpfInput.focus();
            return;
        }

        // Validação de tamanho mínimo da senha
        if (senha.length < 6) {
            alert("A senha deve conter no mínimo 6 caracteres.");
            return;
        }

        // Cria o objeto com os dados limpos para enviar para a API
        const dadosUsuario = {
            nome,
            cpf: cpf.replace(/\D/g, ""), // Opcional: envia o CPF apenas com números para o banco
            email,
            senha,
            tipo_usuario: tipoUsuario,
        };

        try {
            // Faz o envio assíncrono para a sua routerApi
            const resposta = await fetch("/api/cadastro", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dadosUsuario),
            });

            const resultado = await resposta.json();

            // Se a API responder que deu certo
            if (resultado.sucesso) {
                // Seleciona a div de notificação do seu HTML
                const msgSucesso = document.getElementById(
                    "notificacao-sucesso",
                );

                if (msgSucesso) {
                    msgSucesso.style.display = "block"; // Exibe o alerta verde na tela
                }

                form.reset(); // Limpa os campos do formulário

                // Aguarda 3 segundos para o usuário ler a mensagem e redireciona para o login
                setTimeout(() => {
                    window.location.href = resultado.redirectUrl || "/login";
                }, 3000);
            } else {
                // Caso o backend retorne algum erro (Ex: CPF ou E-mail já cadastrados)
                alert(resultado.mensagem || "Erro ao realizar o cadastro.");
            }
        } catch (erro) {
            console.error("Erro ao conectar com o servidor:", erro);
            alert("Ocorreu um erro no servidor. Tente novamente mais tarde.");
        }
    });
});
