function switchTab(type) {
    const btns = document.querySelectorAll(".tab-btn");
    const contextText = document.getElementById("user-context");

    // Remove classe ativa de todos
    btns.forEach((btn) => btn.classList.remove("active"));

    // Adiciona ao clicado e muda o texto
    if (type === "discente") {
        btns[0].classList.add("active");
        contextText.innerHTML = "Acesso para <strong>Aluno</strong>";
    } else {
        btns[1].classList.add("active");
        contextText.innerHTML = "Acesso para <strong>Professor</strong>";
    }
}

function togglePassword() {
    const passwordInput = document.getElementById("password");
    const eyeIcon = document.getElementById("eye-icon");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.textContent = "🙈"; // Muda o ícone quando visível
    } else {
        passwordInput.type = "password";
        eyeIcon.textContent = "👁️"; // Volta para o ícone original
    }
}
