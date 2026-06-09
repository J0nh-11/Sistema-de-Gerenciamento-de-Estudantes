document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const cpfInput = document.getElementById("cpf");

    // ==========================================================================
    // 1. MÁSCARA DE CPF (Formata enquanto o usuário digita)
    // ==========================================================================
    // cpfInput.addEventListener("input", (e) => {
    //     let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não é número

    //     if (value.length > 11) value = value.slice(0, 11); // Limita a 11 dígitos

    //     // Aplica a estilização de pontos e hífen
    //     if (value.length > 9) {
    //         value = value.replace(
    //             /^(\d{3})(\d{3})(\d{3})(\d{1,2})$/,
    //             "$1.$2.$3-$4",
    //         );
    //     } else if (value.length > 6) {
    //         value = value.replace(/^(\d{3})(\d{3})(\d{1,3})$/, "$1.$2.$3");
    //     } else if (value.length > 3) {
    //         value = value.replace(/^(\d{3})(\d{1,3})$/, "$1.$2");
    //     }

    //     e.target.value = value;
    // });

    // ==========================================================================
    // 2. FUNÇÃO DE VALIDAÇÃO DO CPF (Algoritmo Oficial)
    // ==========================================================================
    // function validarCPF(cpf) {
    //     cpf = cpf.replace(/\D/g, ""); // Remove a máscara para validar apenas os números

    //     if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    //         return false; // CPF deve ter 11 dígitos e não pode ser tudo igual
    //     }

    //     // Validação do 1º dígito verificador
    //     let soma = 0;
    //     for (let i = 0; i < 9; i++) {
    //         soma += parseInt(cpf.charAt(i)) * (10 - i);
    //     }
    //     let resto = (soma * 10) % 11;
    //     if (resto === 10 || resto === 11) resto = 0;
    //     if (resto !== parseInt(cpf.charAt(9))) return false;

    //     // Validação do 2º dígito verificador
    //     soma = 0;
    //     for (let i = 0; i < 10; i++) {
    //         soma += parseInt(cpf.charAt(i)) * (11 - i);
    //     }
    //     resto = (soma * 10) % 11;
    //     if (resto === 10 || resto === 11) resto = 0;
    //     if (resto !== parseInt(cpf.charAt(10))) return false;

    //     return true;
    // }

    // ==========================================================================
    // 3. INTERCEPTAÇÃO E ENVIO DO FORMULÁRIO (Chamada para a API)
    // ==========================================================================
    form.addEventListener("submit", async (e) => {
        // Evita o envio padrão e o recarregamento da página
        console.log("SUBMIT EXECUTADO");
        e.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const cpf = cpfInput.value;
        const email = document.getElementById("email").value.trim();
        const senha = document.getElementById("senha").value;
        const cargo = document.getElementById("cargo").value;

        // Validação de segurança básica para campos vazios
        if (!nome || !cpf || !email || !senha || !cargo) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        // Validação do CPF
        // if (!validarCPF(cpf)) {
        //     alert("Por favor, insira um CPF válido.");
        //     cpfInput.focus();
        //     return;
        // }

        // Validação de tamanho mínimo da senha
        if (senha.length < 6) {
            alert("A senha deve conter no mínimo 6 caracteres.");
            return;
        }

        // Cria o objeto com os dados limpos para enviar para a API
        const dadosUsuario = {
            nome,
            cpf,
            email,
            senha,
            tipo_usuario: cargo,
        };

        try {
            const cargo = document.getElementById("cargo").value;

            const dadosUsuario = {
                nome,
                cpf,
                email,
                senha,
                cargo,
                data_nascimento:
                    document.getElementById("data_nascimento").value,
                celular: document.getElementById("celular").value,
                endereco: document.getElementById("endereco").value,
            };
            if (cargo === "discente") {
                dadosUsuario.turma = document.getElementById("turma").value;
                dadosUsuario.curso = document.getElementById("curso").value;
            }

            if (cargo === "docente") {
                dadosUsuario.especialidade =
                    document.getElementById("especialidade").value;

                dadosUsuario.formacao =
                    document.getElementById("formacao").value;

                dadosUsuario.salario = document.getElementById("salario").value;
            }

            if (cargo === "responsavel") {
                dadosUsuario.parentesco =
                    document.getElementById("parentesco").value;
            }
            console.log(dadosUsuario);
            // Faz o envio assíncrono para a sua routerApi
            const resposta = await fetch("/api/cadastros", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dadosUsuario),
            });

            console.log("Status:", resposta.status);

            const resultado = await resposta.json();
            console.log(
                "Resultado completo:",
                JSON.stringify(resultado, null, 2),
            );
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
                    window.location.href = resultado.redirectUrl || "/";
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
    const cargoSelect = document.getElementById("cargo");
    const camposDinamicos = document.getElementById("campos-dinamicos");

    cargoSelect.addEventListener("change", () => {
        const cargo = cargoSelect.value;

        camposDinamicos.innerHTML = "";

        if (cargo === "discente") {
            camposDinamicos.innerHTML = `
            <div class="form-group">
                <label>Turma</label>
                <input type="text" id="turma" name="turma" required>
            </div>

            <div class="form-group">
                <label>Curso</label>
                <input type="text" id="curso" name="curso" required>
            </div>
        `;
        }

        if (cargo === "docente") {
            camposDinamicos.innerHTML = `
            <div class="form-group">
                <label>Especialidade</label>
                <input type="text" id="especialidade" name="especialidade" required>
            </div>

            <div class="form-group">
                <label>Formação</label>
                <input type="text" id="formacao" name="formacao" required>
            </div>

            <div class="form-group">
                <label>Salário</label>
                <input type="number" id="salario" name="salario" required>
            </div>
        `;
        }

        if (cargo === "responsavel") {
            camposDinamicos.innerHTML = `
            <div class="form-group">
                <label>Parentesco</label>

                <select id="parentesco" name="parentesco">
                    <option value="Pai">Pai</option>
                    <option value="Mãe">Mãe</option>
                    <option value="Avó">Avó</option>
                    <option value="Avô">Avô</option>
                    <option value="Tio">Tio</option>
                    <option value="Outro">Outro</option>
                </select>
            </div>
        `;
        }
    });
});
