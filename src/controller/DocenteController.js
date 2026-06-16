"use strict";

const DocenteService = require("../service/DocenteService");

class DocenteController {
    async listar(req, res) {
        try {
            const docentes = await DocenteService.listar();

            res.status(200).json({
                sucesso: true,
                dados: docentes,
                total: docentes.length,
            });
        } catch (erro) {
            res.status(500).json({
                sucesso: false,
                mensagem: erro.message,
            });
        }
    }

    async buscarPorMatricula(req, res) {
        try {
            const { matricula } = req.params;

            const docente = await DocenteService.buscarPorMatricula(matricula);

            if (!docente) {
                return res.status(404).json({
                    sucesso: false,
                    mensagem: "Docente não encontrado",
                });
            }

            res.status(200).json(docente);
        } catch (erro) {
            res.status(500).json({
                sucesso: false,
                mensagem: erro.message,
            });
        }
    }

    async criar(req, res) {
        try {
            const resultado = await DocenteService.criar(req.body);

            res.status(201).json({
                sucesso: true,
                dados: resultado,
            });
        } catch (erro) {
            res.status(500).json({
                sucesso: false,
                mensagem: erro.message,
            });
        }
    }

    async atualizar(req, res) {
        try {
            const resultado = await DocenteService.atualizar(req.body);

            res.status(200).json({
                sucesso: true,
                dados: resultado,
            });
        } catch (erro) {
            res.status(500).json({
                sucesso: false,
                mensagem: erro.message,
            });
        }
    }

    async deletar(req, res) {
        try {
            const { id } = req.params;

            const resultado = await DocenteService.deletar(id);

            res.status(200).json({
                sucesso: true,
                dados: resultado,
            });
        } catch (erro) {
            res.status(500).json({
                sucesso: false,
                mensagem: erro.message,
            });
        }
    }
}

module.exports = new DocenteController();
