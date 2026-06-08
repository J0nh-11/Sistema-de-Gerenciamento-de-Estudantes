"use strict";

const MatriculaDisciplinaService = require("../service/MatriculaDisciplinaService");
const MatriculaDisciplinaModel = require("../model/MatriculaDisciplina");

class MatriculaController {
    /**
     * Listar todas as matrículas em disciplinas
     * GET /api/matricula/listar
     */
    async listar(req, res) {
        try {
            const matriculas = await MatriculaDisciplinaService.listar();
            res.status(200).json({
                sucesso: true,
                dados: matriculas,
                total: matriculas.length,
            });
        } catch (erro) {
            res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao listar matrículas",
                erro: erro.message,
            });
        }
    }

    /**
     * Listar matrícula completa com detalhes (aluno, disciplina, etc)
     * GET /api/matricula/completo
     */
    async listarCompleto(req, res) {
        try {
            const matriculas =
                await MatriculaDisciplinaService.listarCompleto();
            res.status(200).json({
                sucesso: true,
                dados: matriculas,
                total: matriculas.length,
            });
        } catch (erro) {
            res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao listar matrículas completas",
                erro: erro.message,
            });
        }
    }

    /**
     * Buscar matrícula por ID
     * GET /api/matricula/:id
     */
    async buscarPorId(req, res) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: "ID da matrícula é obrigatório",
                });
            }

            const matricula = await MatriculaDisciplinaService.buscarPorId(id);

            if (!matricula) {
                return res.status(404).json({
                    sucesso: false,
                    mensagem: "Matrícula não encontrada",
                });
            }

            res.status(200).json({
                sucesso: true,
                dados: matricula,
            });
        } catch (erro) {
            res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao buscar matrícula",
                erro: erro.message,
            });
        }
    }

    /**
     * Buscar matrículas por discente (aluno)
     * GET /api/matricula/discente/:matricula
     */
    async buscarPorDiscente(req, res) {
        try {
            const { matricula } = req.params;

            if (!matricula) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: "Matrícula do discente é obrigatória",
                });
            }

            const matriculas =
                await MatriculaDisciplinaService.buscarPorDiscente(matricula);

            res.status(200).json({
                sucesso: true,
                dados: matriculas,
                total: matriculas.length,
            });
        } catch (erro) {
            res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao buscar matrículas do discente",
                erro: erro.message,
            });
        }
    }

    /**
     * Criar nova matrícula
     * POST /api/matricula/criar
     */
    async criar(req, res) {
        try {
            const { discente_matricula, disciplina_id, ano, semestre, status } =
                req.body;

            // Validação básica
            if (!discente_matricula || !disciplina_id || !ano || !semestre) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem:
                        "Campos obrigatórios: discente_matricula, disciplina_id, ano, semestre",
                });
            }

            const dados = {
                discente_matricula,
                disciplina_id,
                ano,
                semestre,
                status: status || "CURSANDO",
            };

            const resultado = await MatriculaDisciplinaService.criar(dados);

            res.status(201).json({
                sucesso: true,
                mensagem: "Matrícula criada com sucesso",
                dados: resultado,
            });
        } catch (erro) {
            res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao criar matrícula",
                erro: erro.message,
            });
        }
    }

    /**
     * Atualizar matrícula
     * PUT /api/matricula/atualizar/:id
     */
    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { discente_matricula, disciplina_id, ano, semestre, status } =
                req.body;

            if (!id) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: "ID da matrícula é obrigatório",
                });
            }

            if (!discente_matricula || !disciplina_id || !ano || !semestre) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem:
                        "Campos obrigatórios: discente_matricula, disciplina_id, ano, semestre",
                });
            }

            const dados = {
                id,
                discente_matricula,
                disciplina_id,
                ano,
                semestre,
                status: status || "CURSANDO",
            };

            const resultado = await MatriculaDisciplinaService.atualizar(dados);

            res.status(200).json({
                sucesso: true,
                mensagem: "Matrícula atualizada com sucesso",
                dados: resultado,
            });
        } catch (erro) {
            res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao atualizar matrícula",
                erro: erro.message,
            });
        }
    }

    /**
     * Deletar matrícula
     * DELETE /api/matricula/deletar/:id
     */
    async deletar(req, res) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: "ID da matrícula é obrigatório",
                });
            }

            const resultado = await MatriculaDisciplinaService.deletar(id);

            res.status(200).json({
                sucesso: true,
                mensagem: "Matrícula deletada com sucesso",
                dados: resultado,
            });
        } catch (erro) {
            res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao deletar matrícula",
                erro: erro.message,
            });
        }
    }

    /**
     * Atualizar status da matrícula (CURSANDO, APROVADO, REPROVADO, TRANCADO)
     * PATCH /api/matricula/status/:id
     */
    async atualizarStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            if (!id) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: "ID da matrícula é obrigatório",
                });
            }

            if (!status) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: "Status é obrigatório",
                });
            }

            const statusValidos = [
                "CURSANDO",
                "APROVADO",
                "REPROVADO",
                "TRANCADO",
            ];
            if (!statusValidos.includes(status)) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: `Status inválido. Valores aceitos: ${statusValidos.join(", ")}`,
                });
            }

            const resultado = await MatriculaDisciplinaService.atualizarStatus(
                id,
                status,
            );

            res.status(200).json({
                sucesso: true,
                mensagem: "Status da matrícula atualizado com sucesso",
                dados: resultado,
            });
        } catch (erro) {
            res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao atualizar status da matrícula",
                erro: erro.message,
            });
        }
    }
}

module.exports = new MatriculaController();
