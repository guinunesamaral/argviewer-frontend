import { argviewer, sentenceAnalyzer } from "../plugins/axios";

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

export const findUsuarioByNickname = async (nickname) => {
    return await argviewer.get(`usuarios/nickname/${nickname}`);
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

export const findProposicoesByUsuarioId = async (usuarioId) => {
    return await argviewer.get(`proposicoes?usuarioId=${usuarioId}`);
};

export const criarProposicao = async (proposicao) => {
    return await argviewer.post("proposicoes", proposicao);
};

export const criarResposta = async (proposicaoId, resposta) => {
    return await argviewer.post(
        `proposicoes/${proposicaoId}/resposta`,
        resposta
    );
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

export const deleteProposicao = async (proposicaoId) => {
    return await argviewer.delete(`proposicoes/${proposicaoId}`);
};
