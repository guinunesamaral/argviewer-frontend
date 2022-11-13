import { argviewer } from "../plugins/axios";

export const login = async (nickname, senha) => {
    return await argviewer.post("usuarios/login", {
        nickname: nickname,
        senha: senha,
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
        nickname: usuario.nickname,
        email: usuario.email,
        senha: usuario.senha,
        foto: usuario.foto,
        anonimo: usuario.anonimo,
    });
};

export const findProposicoesByUsuarioId = async (usuarioId) => {
    return await argviewer.get(`proposicoes?usuarioId=${usuarioId}`);
};

export const criarProposicao = async (proposicao) => {
    return await argviewer.post("proposicoes", {
        texto: proposicao.texto,
        fonte: proposicao.fonte,
        usuarioId: proposicao.usuarioId,
    });
};

export const criarResposta = async (proposicaoId, resposta) => {
    return await argviewer.post(`proposicoes/${proposicaoId}/resposta`, {
        texto: resposta.texto,
        fonte: resposta.fonte,
        usuarioId: resposta.usuarioId,
    });
};

export const deleteProposicao = async (proposicaoId) => {
    return await argviewer.delete(`proposicoes/${proposicaoId}`);
};
