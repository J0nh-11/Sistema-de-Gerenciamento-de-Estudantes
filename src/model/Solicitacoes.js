class Solicitacoes {
    #id;
    #nome;
    #cpf;
    #email;
    #senha;
    #cargo;
    #dataNascimento;
    #celular;
    #endereco;
    constructor(
        id,
        nome,
        cpf,
        email,
        senha,
        cargo,
        dataNascimento,
        celular,
        endereco,
    ) {
        this.#id = id;
        this.#nome = nome;
        this.#cpf = cpf;
        this.#email = email;
        this.#senha = senha;
        this.#cargo = cargo;
        this.#dataNascimento = dataNascimento;
        this.#celular = celular;
        this.#endereco = endereco;
    }
    getId() {
        return this.#id;
    }
    getNome() {
        return this.#nome;
    }

    getCpf() {
        return this.#cpf;
    }

    getEmail() {
        return this.#email;
    }

    getSenha() {
        return this.#senha;
    }

    getCargo() {
        return this.#cargo;
    }
    getEndereco() {
        return this.#endereco;
    }

    getCelular() {
        return this.#celular;
    }

    getDataNascimento() {
        return this.#dataNascimento;
    }
}

module.exports = Solicitacoes;
