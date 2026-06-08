// ==============================
// DATA ATUAL
// ==============================

document.addEventListener("DOMContentLoaded", () => {
    const data = document.getElementById("current-date");

    if (data) {
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        };

        data.innerText = new Date().toLocaleDateString("pt-BR", options);
    }
});

// ==============================
// NAVEGAÇÃO DOS BOTÕES
// ==============================

document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", () => {
        const rota = button.dataset.url;

        if (rota) {
            window.location.href = rota;
        }
    });
});

// ==============================
// SIDEBAR ACTIVE
// ==============================

const navLinks = document.querySelectorAll(".sidebar-nav a");

navLinks.forEach((link) => {
    link.addEventListener("click", function () {
        navLinks.forEach((item) => {
            item.classList.remove("active");
        });

        this.classList.add("active");
    });
});

// ==============================
// LOGOUT
// ==============================

const logoutBtn = document.querySelector(".logout-btn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        const confirmar = confirm("Deseja sair do sistema?");

        if (confirmar) {
            localStorage.removeItem("token");

            window.location.href = "/";
        }
    });
}
