// ==============================
// LOGOUT
// ==============================

const logoutBtn = document.querySelector(".logout-btn");

if (logoutBtn)
    logoutBtn.addEventListener("click", () => {
        const confirmar = confirm("Deseja voltar?");
        if (confirmar) window.location.href = "/admin";
    });
