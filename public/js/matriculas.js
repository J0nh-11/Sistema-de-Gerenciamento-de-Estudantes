// ===============================
// SALVAR MATRÍCULA
// ===============================

async function salvarMatricula(event) {
    event.preventDefault();

    const dados = {
        discente_matricula: document.getElementById("discente_matricula").value,

        disciplina_id: document.getElementById("disciplina_id").value,

        ano: document.getElementById("ano").value,

        semestre: document.getElementById("semestre").value,
    };

    try {
        const response = await fetch("/api/matricula/cadastrar", {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(dados),
        });

        const result = await response.json();

        if (response.ok) {
            alert("Matrícula realizada com sucesso!");

            document.getElementById("matriculaForm").reset();
        } else {
            alert(result.erro || "Erro ao realizar matrícula.");
        }
    } catch (error) {
        console.error(error);

        alert("Erro no servidor.");
    }
    document
        .getElementById("matriculaForm")
        .addEventListener("submit", salvarMatricula);

    async function salvarMatricula(event) {
        event.preventDefault();

        console.log("Funcionou");
    }
}

// ===============================
// DATA DINÂMICA
// ===============================

const liveDate = document.getElementById("live-date");

if (liveDate) {
    const options = {
        weekday: "long",

        year: "numeric",

        month: "long",

        day: "numeric",
    };

    liveDate.innerText = new Date().toLocaleDateString("pt-BR", options);
}
