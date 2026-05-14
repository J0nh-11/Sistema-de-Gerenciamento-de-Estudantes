const PessoaModel = require("./PessoaModel");

class LoginModel extends PessoaModel {
    #id;
    #senha;
    #matricula;
    #email;
    constructor(id, senha, matricula, email) {
        super(id, senha, matricula, email)
        this.#id = id;
        this.#senha = senha;
        this.#matricula = matricula;
        this.#email = email;
    }

    getId() {
        return this.#id;
    }
    getSenha() {
        return this.#senha;
    }
    setSenha(NovaSenha) {
        this.#senha = NovaSenha;
        return this.#senha;
    }
    getMatricula() {
        return this.#senha;
    }
    getEmail() {
        return this.#email;
    }
    setSenha(NovoEmail) {
        this.#email = NovoEmail;
        return this.#email;
    }
}

module.exports = LoginModel;
