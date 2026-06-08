"use strict";

const MatriculaDisciplinaDao = require("../repository/MatriculaDisciplinaDao");

class MatriculaDisciplinaService {
    /**
     * Listar todas as matrículas
     */
    async listar() {
        try {
            const matriculas = await MatriculaDisciplinaDao.list();
            return matriculas;
        } catch (erro) {
            throw new Error(`Erro ao listar matrículas: ${erro.message}`);
        }
    }

    /**
     * Listar matrículas com informações completas (aluno, disciplina, etc)
     */
    async listarCompleto() {
        try {
            const matriculas = await MatriculaDisciplinaDao.listCompleto();
            return matriculas;
        } catch (erro) {
            throw new Error(
                `Erro ao listar matrículas completas: ${erro.message}`,
            );
        }
    }

    /**
     * Buscar matrícula por ID
     */
    async buscarPorId(id) {
        try {
            if (!id) {
                throw new Error("ID é obrigatório");
            }
            const matricula = await MatriculaDisciplinaDao.buscarPorId(id);
            return matricula;
        } catch (erro) {
            throw new Error(`Erro ao buscar matrícula: ${erro.message}`);
        }
    }

    /**
     * Buscar matrículas por matrícula do discente
     */
    async buscarPorDiscente(matriculaDiscente) {
        try {
            if (!matriculaDiscente) {
                throw new Error("Matrícula do discente é obrigatória");
            }
            const matriculas =
                await MatriculaDisciplinaDao.buscarPorDiscente(
                    matriculaDiscente,
                );
            return matriculas;
        } catch (erro) {
            throw new Error(
                `Erro ao buscar matrículas do discente: ${erro.message}`,
            );
        }
    }

    /**
     * Criar nova matrícula
     */
    async criar(dados) {
        try {
            // Validação
            if (
                !dados.discente_matricula ||
                !dados.disciplina_id ||
                !dados.ano ||
                !dados.semestre
            ) {
                throw new Error(
                    "Campos obrigatórios faltando: discente_matricula, disciplina_id, ano, semestre",
                );
            }

            // Validar status se fornecido
            const statusValidos = [
                "CURSANDO",
                "APROVADO",
                "REPROVADO",
                "TRANCADO",
            ];
            if (dados.status && !statusValidos.includes(dados.status)) {
                throw new Error(
                    `Status inválido. Valores aceitos: ${statusValidos.join(", ")}`,
                );
            }

            // Validar ano (deve ser um ano válido)
            const anoAtual = new Date().getFullYear();
            if (dados.ano < 2000 || dados.ano > anoAtual + 1) {
                throw new Error("Ano inválido");
            }

            // Validar semestre
            if (!["1", "2"].includes(dados.semestre.toString())) {
                throw new Error("Semestre deve ser 1 ou 2");
            }

            const resultado = await MatriculaDisciplinaDao.create(dados);
            return resultado;
        } catch (erro) {
            throw new Error(`Erro ao criar matrícula: ${erro.message}`);
        }
    }

    /**
     * Atualizar matrícula completa
     */
    async atualizar(dados) {
        try {
            if (!dados.id) {
                throw new Error("ID é obrigatório");
            }

            if (
                !dados.discente_matricula ||
                !dados.disciplina_id ||
                !dados.ano ||
                !dados.semestre
            ) {
                throw new Error(
                    "Campos obrigatórios faltando: discente_matricula, disciplina_id, ano, semestre",
                );
            }

            // Validar status se fornecido
            const statusValidos = [
                "CURSANDO",
                "APROVADO",
                "REPROVADO",
                "TRANCADO",
            ];
            if (dados.status && !statusValidos.includes(dados.status)) {
                throw new Error(
                    `Status inválido. Valores aceitos: ${statusValidos.join(", ")}`,
                );
            }

            // Verificar se matrícula existe
            const matriculaExistente = await MatriculaDisciplinaDao.buscarPorId(
                dados.id,
            );
            if (!matriculaExistente) {
                throw new Error("Matrícula não encontrada");
            }

            const resultado = await MatriculaDisciplinaDao.update(dados);
            return resultado;
        } catch (erro) {
            throw new Error(`Erro ao atualizar matrícula: ${erro.message}`);
        }
    }

    /**
     * Atualizar apenas o status da matrícula
     */
    async atualizarStatus(id, novoStatus) {
        try {
            if (!id) {
                throw new Error("ID é obrigatório");
            }

            if (!novoStatus) {
                throw new Error("Status é obrigatório");
            }

            // Validar status
            const statusValidos = [
                "CURSANDO",
                "APROVADO",
                "REPROVADO",
                "TRANCADO",
            ];
            if (!statusValidos.includes(novoStatus)) {
                throw new Error(
                    `Status inválido. Valores aceitos: ${statusValidos.join(", ")}`,
                );
            }

            // Buscar matrícula existente
            const matricula = await MatriculaDisciplinaDao.buscarPorId(id);
            if (!matricula) {
                throw new Error("Matrícula não encontrada");
            }

            // Atualizar apenas status
            const dadosAtualizacao = {
                id,
                discente_matricula: matricula.discente_matricula,
                disciplina_id: matricula.disciplina_id,
                ano: matricula.ano,
                semestre: matricula.semestre,
                status: novoStatus,
            };

            const resultado =
                await MatriculaDisciplinaDao.update(dadosAtualizacao);
            return resultado;
        } catch (erro) {
            throw new Error(
                `Erro ao atualizar status da matrícula: ${erro.message}`,
            );
        }
    }

    /**
     * Deletar matrícula por ID
     */
    async deletar(id) {
        try {
            if (!id) {
                throw new Error("ID é obrigatório");
            }

            // Verificar se matrícula existe antes de deletar
            const matricula = await MatriculaDisciplinaDao.buscarPorId(id);
            if (!matricula) {
                throw new Error("Matrícula não encontrada");
            }

            const resultado = await MatriculaDisciplinaDao.deletar(id);
            return resultado;
        } catch (erro) {
            throw new Error(`Erro ao deletar matrícula: ${erro.message}`);
        }
    }

    /**
     * Método legado para compatibilidade
     */
    async cadastrar(matriculando) {
        try {
            // Se for objeto com getters
            if (
                matriculando &&
                typeof matriculando.getDiscenteMatricula === "function"
            ) {
                const dados = {
                    discente_matricula: matriculando.getDiscenteMatricula(),
                    disciplina_id: matriculando.getDisciplinaId(),
                    ano: matriculando.getAno(),
                    semestre: matriculando.getSemestre(),
                    status: matriculando.getStatus() || "CURSANDO",
                };
                return await this.criar(dados);
            }
            // Se for objeto simples
            return await this.criar(matriculando);
        } catch (erro) {
            throw new Error(`Erro ao cadastrar matrícula: ${erro.message}`);
        }
    }

    /**
     * Método legado para compatibilidade
     */
    async update(matriculando) {
        try {
            // Se for objeto com getters
            if (matriculando && typeof matriculando.getId === "function") {
                const dados = {
                    id: matriculando.getId(),
                    discente_matricula: matriculando.getDiscenteMatricula(),
                    disciplina_id: matriculando.getDisciplinaId(),
                    ano: matriculando.getAno(),
                    semestre: matriculando.getSemestre(),
                    status: matriculando.getStatus() || "CURSANDO",
                };
                return await this.atualizar(dados);
            }
            // Se for objeto simples
            return await this.atualizar(matriculando);
        } catch (erro) {
            throw new Error(`Erro ao atualizar matrícula: ${erro.message}`);
        }
    }
}

module.exports = new MatriculaDisciplinaService();
