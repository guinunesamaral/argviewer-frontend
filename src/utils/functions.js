export const concatMessages = (m1, m2) => `${m1} ${m2}`;

export const formatText = (text) => {
    return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
};

export const listaDeVotosContemUsuarioLogado = (proposicao, usuarioId) =>
    proposicao.votes
        ? proposicao.votes.some((v) => v.usuarioId === usuarioId)
        : undefined;

export const isUpvoteCallback = (proposicao, usuarioId) => {
    const jaVotouNessaProposicao = listaDeVotosContemUsuarioLogado(
        proposicao,
        usuarioId
    );
    if (jaVotouNessaProposicao) {
        const voto = proposicao.votes.find((v) => v.usuarioId === usuarioId);
        return voto ? voto.upvote : undefined;
    }
    return undefined;
};

export const upvoteColorCallback = (proposicao, usuarioId) => {
    const isUpvote = isUpvoteCallback(proposicao, usuarioId);
    return isUpvote === true ? "blue" : "black";
};

export const downvoteColorCallback = (proposicao, usuarioId) => {
    const isUpvote = isUpvoteCallback(proposicao, usuarioId);
    return isUpvote === false ? "blue" : "black";
};
