export const concatMessages = (m1, m2) => `${m1} ${m2}`;

export const formatText = (text) => {
    return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
};

export const listaDeVotosContemUsuarioLogado = (proposicao, usuarioId) =>
    proposicao.votes.some((v) => v.usuarioId === usuarioId);

export const isUpvoteCallback = (jaVotouNessaProposicao, votes, usuarioId) => {
    // console.log(jaVotouNessaProposicao, votes, usuarioId);
    const voto = votes.find((v) => v.usuarioId === usuarioId);
    return jaVotouNessaProposicao
        ? voto
            ? voto.upvote
            : undefined
        : undefined;
};

export const upvoteColorCallback = (isUpvote) =>
    isUpvote === true ? "blue" : "black";

export const downvoteColorCallback = (isUpvote) =>
    isUpvote === false ? "blue" : "black";
