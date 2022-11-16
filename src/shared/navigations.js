export const goToLogin = (navigate) => {
    navigate("/");
};

export const goToPrincipal = (navigate) => {
    navigate("/principal");
};

export const goToAlterarDados = (navigate) => {
    navigate("/alterarDados");
};

export const goToVisualizarProposicao = (navigate, proposicao, usuario) => {
    navigate(`/visualizarProposicao`, {
        state: {
            proposicao: proposicao,
            usuario: usuario,
        },
    });
};

export const goToCriarProposicao = (navigate) => {
    navigate(`/criarProposicao`);
};

export const goToCriarResposta = (
    navigate,
    proposicaoId,
    respostaFavoravel
) => {
    navigate(`/criarProposicao`, {
        state: {
            proposicaoId,
            respostaFavoravel,
        },
    });
};

export const goToPerfil = (navigate, usuario) => {
    navigate(`/perfil`, {
        state: {
            usuario: usuario,
        },
    });
};
