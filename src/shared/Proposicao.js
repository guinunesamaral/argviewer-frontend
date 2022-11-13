export default class Proposicao {
    constructor(
        id,
        texto,
        fonte,
        dataCriacao,
        dataAlteracao,
        qtdDownvotes,
        qtdUpvotes,
        usuarioId,
        isProposicaoInicial,
        isRespostaContraria
    ) {
        this.id = id;
        this.texto = texto;
        this.fonte = fonte;
        this.dataCriacao = dataCriacao;
        this.dataAlteracao = dataAlteracao;
        this.qtdDownvotes = qtdDownvotes;
        this.qtdUpvotes = qtdUpvotes;
        this.usuarioId = usuarioId;
        this.isProposicaoInicial = isProposicaoInicial;
        this.isRespostaContraria = isRespostaContraria;
    }
}
