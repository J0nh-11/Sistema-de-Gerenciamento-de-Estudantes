class DocenteModel {
    #matricula;
    #cpf;
    #nome;
    #senha;
    #email;
    #dataNascimento;

    constructor(matricula, nome, cpf, email, dataNascimento, senha) {
        this.#matricula = matricula;
        this.#cpf = cpf;
        this.#nome = nome;
        this.#senha = senha;
        this.#email = email;
        this.#dataNascimento = dataNascimento;
    }

    getNome() {
        return this.#nome;
    }
    getMatricula() {
        return this.#matricula;
    }
    getCpf() {
        return this.#cpf;
    }
    getSenha() {
        return this.#senha;
    }
    getEmail() {
        return this.#email;
    }
    getDataNascimento() {
        return this.#dataNascimento;
    }
}
