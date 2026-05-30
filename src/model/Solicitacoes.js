class Solicitacoes {
    #id;
    #nome;
    #cpf;
    #email;
    #senha;
    #cargo;
    constructor(id,nome, cpf, email, senha, cargo) {
        this.#id = id;
        this.#nome = nome;
        this.#cargo = cpf;
        this.#email = email;
        this.#senha = senha;
        this.#cargo = cargo;
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
}

module.exports = Solicitacoes;
