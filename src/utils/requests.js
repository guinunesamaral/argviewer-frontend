import { argviewer, sentenceAnalyzer } from "plugins/axios";

export const cadastrarUsuario = async (usuario) => {
    return await argviewer.post("usuarios", {
        nome: usuario.nome,
        nickname: usuario.nickname,
        email: usuario.email,
        senha: usuario.senha,
        foto: usuario.foto,
    });
};

export const login = async (nickname, senha) => {
    return await argviewer.post("usuarios/login", {
        nickname,
        senha,
    });
};

export const findAllUsuarios = async () => {
    return await argviewer.get("usuarios");
};

export const findUsuarioByNickname = async (nickname) => {
    return await argviewer.get(`usuarios/nickname/${nickname}`);
};

export const findUsuarioById = async (id) => {
    return await argviewer.get(`usuarios/${id}`);
};

export const findUsuariosByNomeOrNicknameContaining = async (value) => {
    return await argviewer.get(`usuarios?value=${value}`);
};

export const updateUsuario = async (usuario) => {
    return await argviewer.put("usuarios", {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        senha: usuario.senha,
        foto: usuario.foto,
        anonimo: usuario.isAnonimo,
    });
};

export const findProposicaoById = async (id) => {
    return await argviewer.get(`proposicoes/${id}`);
};

export const findProposicoesByUsuarioId = async (usuarioId) => {
    return await argviewer.get(`proposicoes?usuarioId=${usuarioId}`);
};

export const findRespostas = async (proposicaoId) => {
    return await argviewer.get(`proposicoes/${proposicaoId}/respostas`);
};

export const criarProposicao = async (proposicao) => {
    return await argviewer.post("proposicoes", proposicao);
};

export const editarProposicao = async (id, texto, fonte) => {
    return await argviewer.put("proposicoes", { id, texto, fonte });
};

export const criarResposta = async (proposicaoId, resposta) => {
    return await argviewer.post(
        `proposicoes/${proposicaoId}/resposta`,
        resposta
    );
};

export const addVote = async (usuarioId, proposicaoId, upvote) => {
    return await argviewer.post("proposicoes/vote", {
        usuarioId,
        proposicaoId,
        upvote,
    });
};

// axios' delete requests must pass their bodies inside the data property
export const removeVote = async (usuarioId, proposicaoId) => {
    return await argviewer.delete("proposicoes/vote", {
        data: {
            usuarioId,
            proposicaoId,
        },
    });
};

export const checkForProfanity = async (sentence) => {
    return await sentenceAnalyzer.post("profanity", { sentence });
};

export const checkSimilarity = async (sentence, sentences_to_compare) => {
    return await sentenceAnalyzer.post("similarity", {
        sentence,
        sentences_to_compare,
    });
};
