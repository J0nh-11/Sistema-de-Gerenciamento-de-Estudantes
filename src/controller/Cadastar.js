"use strict";

const SolicitacaoService = require("../service/SolicitacaoService");
const Solicitacoes = require("../model/Solicitacoes");

// ============================================================================
// FUNÇÕES UTILITÁRIAS DE VALIDAÇÃO
// ============================================================================

function trimString(value) {
    return typeof value === "string" ? value.trim() : value;
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }
    // Validação do primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    // Validação do segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;

    return true;
}

function validarCargos(cargo) {
    const cargosValidos = [
        "discente",
        "docente",
        "responsavel",
        "administrador",
    ];
    return cargosValidos.includes(cargo.toLowerCase());
}

function validarCampos(dados, regras) {
    const erros = [];

    regras.forEach((regra) => {
        const valor = dados[regra.nome];

        // Verifica se é obrigatório
        if (regra.obrigatorio && (!valor || valor === "")) {
            erros.push(`${regra.label} é obrigatório.`);
            return;
        }

        // Se não é obrigatório e está vazio, pula validações
        if (!valor || valor === "") {
            return;
        }

        // Validações específicas por tipo
        if (regra.tipo === "email") {
            if (!validarEmail(valor)) {
                erros.push(`${regra.label} inválido.`);
            }
        } else if (regra.tipo === "cpf") {
            if (!validarCPF(valor)) {
                erros.push(`${regra.label} inválido.`);
            }
        } else if (regra.tipo === "minLength") {
            if (valor.length < regra.minLength) {
                erros.push(
                    `${regra.label} deve ter no mínimo ${regra.minLength} caracteres.`,
                );
            }
        } else if (regra.tipo === "cargo") {
            if (!validarCargos(valor)) {
                erros.push(
                    `${regra.label} deve ser 'discente', 'docente' ou 'responsavel'.`,
                );
            }
        }
    });

    return {
        valido: erros.length === 0,
        erros: erros,
    };
}

// ============================================================================
// CONTROLLER DE CADASTRO
// ============================================================================

class CadastroController {
    /**
     * Cria uma solicitação de cadastro (solicitação pendente)
     * PUT /cadastro
     */
    async create(req, res, next) {
        try {
            const dados = {
                nome: trimString(req.body.nome),
                cpf: trimString(req.body.cpf),
                email: trimString(req.body.email),
                senha: req.body.senha, // Não faz trim em senha
                cargo: trimString(req.body.cargo || ""),
                turma: req.body.turma,
                curso: req.body.curso,

                especialidade: req.body.especialidade,
                formacao: req.body.formacao,
                salario: req.body.salario,

                parentesco: req.body.parentesco,
            };

            // Validação dos campos
            const validacao = validarCampos(dados, [
                {
                    nome: "nome",
                    label: "Nome",
                    tipo: "minLength",
                    minLength: 3,
                    obrigatorio: true,
                },
                {
                    nome: "cpf",
                    label: "CPF",
                    tipo: "cpf",
                    obrigatorio: true,
                },
                {
                    nome: "email",
                    label: "Email",
                    tipo: "email",
                    obrigatorio: true,
                },
                {
                    nome: "senha",
                    label: "Senha",
                    tipo: "minLength",
                    minLength: 6,
                    obrigatorio: true,
                },
                {
                    nome: "cargo",
                    label: "Cargo",
                    tipo: "cargo",
                    obrigatorio: true,
                },
            ]);

            if (!validacao.valido) {
                return res.status(400).json({
                    sucesso: false,
                    erros: validacao.erros,
                });
            }

            // Cria o modelo de solicitação
            const solicitacao = new Solicitacoes(
                null,
                dados.nome,
                dados.cpf,
                dados.email,
                dados.senha,
                dados.cargo,
                "pendente",
            );

            const result = await SolicitacaoService.create(solicitacao);

            return res.status(201).json({
                sucesso: true,
                mensagem:
                    "Solicitação de cadastro recebida. Aguarde a aprovação.",
                protocolo: result.insertId,
                redirectUrl: "/",
            });
        } catch (erro) {
            return res.status(400).json({
                sucesso: false,
                mensagem: erro.message,
            });
        }
    }

    /**
     * Lista todas as solicitações de cadastro pendentes (apenas ADMIN)
     * GET /cadastros/pendentes
     */
    async listarPendentes(req, res, next) {
        try {
            // Já protegido pela rota com verifyJwt e permissao('admin')
            const solicitacoes = await SolicitacaoService.listarPendentes();

            return res.status(200).json({
                sucesso: true,
                quantidade: solicitacoes.length,
                data: solicitacoes,
            });
        } catch (erro) {
            return res.status(500).json({
                sucesso: false,
                mensagem: erro.message,
            });
        }
    }

    /**
     * Lista solicitações de cadastro por tipo de cargo
     * GET /cadastros/:tipo
     */
    async listarPorTipo(req, res, next) {
        try {
            const { tipo } = req.params;

            if (!validarCargos(tipo)) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem:
                        "Tipo inválido. Deve ser 'discente', 'docente' ou 'responsavel'.",
                });
            }

            const solicitacoes = await SolicitacaoService.buscarPorTipo(tipo);

            return res.status(200).json({
                sucesso: true,
                quantidade: solicitacoes.length,
                cargo: tipo,
                data: solicitacoes,
            });
        } catch (erro) {
            return res.status(500).json({
                sucesso: false,
                mensagem: erro.message,
            });
        }
    }

    /**
     * Aprova uma solicitação de cadastro (apenas ADMIN)
     * PUT /cadastros/aprovar/:id
     */
    async aprovar(req, res, next) {
        try {
            const { id } = req.params;

            if (!id || isNaN(id)) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: "ID inválido.",
                });
            }

            const resultado = await SolicitacaoService.aprovar(parseInt(id));

            return res.status(200).json({
                sucesso: true,
                mensagem: "Solicitação aprovada com sucesso.",
                data: resultado,
            });
        } catch (erro) {
            return res.status(400).json({
                sucesso: false,
                mensagem: erro.message,
            });
        }
    }

    /**
     * Rejeita uma solicitação de cadastro (apenas ADMIN)
     * PUT /cadastros/rejeitar/:id
     */
    async rejeitar(req, res, next) {
        try {
            const { id } = req.params;

            if (!id || isNaN(id)) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: "ID inválido.",
                });
            }

            const resultado = await SolicitacaoService.rejeitar(parseInt(id));

            return res.status(200).json({
                sucesso: true,
                mensagem: "Solicitação rejeitada.",
                data: resultado,
            });
        } catch (erro) {
            return res.status(400).json({
                sucesso: false,
                mensagem: erro.message,
            });
        }
    }

    /**
     * Busca uma solicitação específica por CPF
     * GET /cadastros/buscar/:cpf
     */
    async buscarPorCpf(req, res, next) {
        try {
            const { cpf } = req.params;

            if (!validarCPF(cpf)) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: "CPF inválido.",
                });
            }

            const solicitacao = await SolicitacaoService.buscarPorCpf(cpf);

            if (!solicitacao) {
                return res.status(404).json({
                    sucesso: false,
                    mensagem: "Solicitação não encontrada.",
                });
            }

            return res.status(200).json({
                sucesso: true,
                data: solicitacao,
            });
        } catch (erro) {
            return res.status(500).json({
                sucesso: false,
                mensagem: erro.message,
            });
        }
    }
}

module.exports = new CadastroController();
