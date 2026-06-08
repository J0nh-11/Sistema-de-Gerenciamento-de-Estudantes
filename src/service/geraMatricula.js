function gerarMatricula(id, dataNascimento) {
    const hoje = new Date();

    const anoAtual = hoje.getFullYear().toString().slice(-2);

    const nascimento = new Date(dataNascimento);

    const anoNascimento = nascimento.getFullYear().toString().slice(-2);

    const idade = hoje.getFullYear() - nascimento.getFullYear();

    const idFormatado = String(id).padStart(2, "0");

    return `${anoAtual}${String(id).padStart(6, "0")}`;
}

module.exports = gerarMatricula;
