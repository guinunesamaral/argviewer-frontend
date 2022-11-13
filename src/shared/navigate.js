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

export const goToCriarResposta = (
    navigate,
    proposicaoId,
    isRespostaNegativa
) => {
    navigate(`/criarProposicao`, {
        state: {
            proposicaoId: proposicaoId,
            isRespostaNegativa: isRespostaNegativa,
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
