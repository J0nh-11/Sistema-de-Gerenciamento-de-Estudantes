document.addEventListener("DOMContentLoaded", () => {
    // 1. Banco de dados local de cursos cadastrados
    const cursos = [
        {
            id: "CRS-F1",
            nome: "Ensino Fundamental I",
            segmento: "fundamental-1",
            segmentoRotulo: "Fundamental I",
            duracao: "5 Anos",
            seriesCount: 5,
            vagasTotais: 120,
            vagasPreenchidas: 102,
            disciplinas: [
                "Língua Portuguesa",
                "Matemática",
                "Ciências",
                "História",
                "Geografia",
                "Arte",
                "Educação Física",
            ],
        },
        {
            id: "CRS-F2",
            nome: "Ensino Fundamental II",
            segmento: "fundamental-2",
            segmentoRotulo: "Fundamental II",
            duracao: "4 Anos",
            seriesCount: 4,
            vagasTotais: 150,
            vagasPreenchidas: 112,
            disciplinas: [
                "Língua Portuguesa",
                "Matemática",
                "Ciências Naturais",
                "História Geral",
                "Geografia Física",
                "Língua Inglesa",
                "Arte",
                "Educação Física",
            ],
        },
        {
            id: "CRS-MED",
            nome: "Ensino Médio Tradicional",
            segmento: "medio",
            segmentoRotulo: "Ensino Médio",
            duracao: "3 Anos",
            seriesCount: 3,
            vagasTotais: 90,
            vagasPreenchidas: 85,
            disciplinas: [
                "Gramática e Literatura",
                "Matemática Aplicada",
                "Física",
                "Química",
                "Biologia",
                "História do Brasil",
                "Sociologia",
                "Filosofia",
                "Língua Inglesa",
            ],
        },
    ];

    // Elementos da DOM
    const coursesContainer = document.getElementById("courses-container");
    const searchInput = document.getElementById("search-curso");
    const filterSegmento = document.getElementById("filter-segmento");

    // Elementos do Modal
    const modal = document.getElementById("modal-disciplinas");
    const modalTitle = document.getElementById("modal-course-title");
    const modalList = document.getElementById("modal-subjects-list");
    const btnCloseModal = document.getElementById("btn-close-modal");

    // 2. Renderização Dinâmica dos Cards de Cursos
    function renderizarCursos(listaCursos) {
        coursesContainer.innerHTML = "";

        if (listaCursos.length === 0) {
            coursesContainer.innerHTML = `
                            <div class="no-results">
                                <h3>Nenhum curso encontrado</h3>
                                <p>Tente ajustar a sua busca ou trocar o segmento selecionado.</p>
                            </div>
                        `;
            return;
        }

        listaCursos.forEach((curso) => {
            // Calcula a porcentagem de ocupação de vagas
            const ocupacaoPercentual = Math.round(
                (curso.vagasPreenchidas / curso.vagasTotais) * 100,
            );

            // Decide a cor da barra de progresso baseada na ocupação
            let corBarra = "var(--primary-color)";
            if (ocupacaoPercentual >= 90) {
                corBarra = "var(--danger-color)"; // Próximo do limite
            } else if (ocupacaoPercentual >= 70) {
                corBarra = "var(--warning-color)"; // Alerta moderado
            } else {
                corBarra = "var(--success-color)"; // Muitas vagas
            }

            const card = document.createElement("div");
            card.className = "course-card";
            card.innerHTML = `
                            <div>
                                <span class="course-segment segment-${curso.segmento}">${curso.segmentoRotulo}</span>
                                <h2>${curso.nome}</h2>
                                <div class="course-code">Código: ${curso.id}</div>
                                
                                <div class="course-details">
                                    <div class="detail-item">
                                        <span>Duração Estimada:</span>
                                        <strong>${curso.duracao}</strong>
                                    </div>
                                    <div class="detail-item">
                                        <span>Séries / Anos:</span>
                                        <strong>${curso.seriesCount} séries acadêmicas</strong>
                                    </div>
                                    <div class="detail-item">
                                        <span>Grade Curricular:</span>
                                        <strong>${curso.disciplinas.length} disciplinas</strong>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div class="vacancy-container">
                                    <div class="vacancy-header">
                                        <span>Taxa de Ocupação</span>
                                        <span>${curso.vagasPreenchidas}/${curso.vagasTotais} (${ocupacaoPercentual}%)</span>
                                    </div>
                                    <div class="progress-bar-bg">
                                        <div class="progress-bar-fill" style="width: ${ocupacaoPercentual}%; background-color: ${corBarra};"></div>
                                    </div>
                                </div>

                                <div class="course-actions">
                                    <button class="btn btn-view-subjects" data-id="${curso.id}">
                                        Grade Curricular
                                    </button>
                                    <button class="btn btn-edit-course" data-id="${curso.id}">
                                        Gerenciar Turmas
                                    </button>
                                </div>
                            </div>
                        `;
            coursesContainer.appendChild(card);
        });
    }

    // 3. Sistema de Filtro
    function filtrarCursos() {
        const termoBusca = searchInput.value.toLowerCase().trim();
        const segmentoSelecionado = filterSegmento.value;

        const resultado = cursos.filter((curso) => {
            const bateTexto =
                curso.nome.toLowerCase().includes(termoBusca) ||
                curso.id.toLowerCase().includes(termoBusca);

            const bateSegmento =
                segmentoSelecionado === "todos" ||
                curso.segmento === segmentoSelecionado;

            return bateTexto && bateSegmento;
        });

        renderizarCursos(resultado);
    }

    // Ouvintes de evento de filtro
    searchInput.addEventListener("input", filtrarCursos);
    filterSegmento.addEventListener("change", filtrarCursos);

    // 4. Lógica de Interação com o Modal
    coursesContainer.addEventListener("click", (e) => {
        const botao = e.target.closest("button");
        if (!botao) return;

        const cursoId = botao.getAttribute("data-id");
        const curso = cursos.find((c) => c.id === cursoId);

        if (botao.classList.contains("btn-view-subjects")) {
            // Configura e abre o modal de disciplinas
            modalTitle.textContent = `Grade Curricular - ${curso.nome}`;
            modalList.innerHTML = "";

            curso.disciplinas.forEach((disc) => {
                const li = document.createElement("li");
                li.textContent = disc;
                modalList.appendChild(li);
            });

            modal.style.display = "flex";
        } else if (botao.classList.contains("btn-edit-course")) {
            // Demonstração de ação para gerenciar as turmas
            alert(
                `Redirecionando para o gerenciamento de turmas do curso: ${curso.nome}`,
            );
        }
    });

    // Fechar Modal
    btnCloseModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Fecha ao clicar fora da caixa do modal
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // Criar Novo Curso (Simulado)
    document.getElementById("btn-criar-curso").addEventListener("click", () => {
        alert(
            "Redirecionando para o formulário de cadastro de novos cursos acadêmicos.",
        );
    });

    // Inicializar a listagem completa
    renderizarCursos(cursos);
});
