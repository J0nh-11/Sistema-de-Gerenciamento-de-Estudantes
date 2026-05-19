"use strict";

const PessoaDao = require("../repository/PessoaDao");
const PessoaModel = require("../model/PessoaModel");
const ServicePessoa = require("../service/ServicePessoa");

async function create(req, res) {
  try {
    const { matricula, email, senha } = req.body;

    if (!matricula || !email || !senha) {
      return res.status(400).json({ erro: "Campos obrigatórios" });
    }

    if (!email.includes("@")) {
      return res.status(400).json({ erro: "Email inválido" });
    }

    const pessoa = new PessoaModel(req.body);

    const result = await servicePessoa.create(pessoa);

    res.status(201).json(result);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
async function list(req, res) {
    try {
        const pessoas = await servicePessoa.list();

        res.json(pessoas);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function update(req, res) {
    try {
        const pessoa = new Pessoa(req.body);

        const result = await servicePessoa.update(pessoa);

        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function Delete(req, res) {
    try {
        const { matricula } = req.params;

        const result = await servicePessoa.deletar(matricula);

        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = {
    create,
    list,
    update,
    Delete,
};
