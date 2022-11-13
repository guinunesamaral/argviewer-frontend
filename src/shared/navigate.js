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

export const goToCriarResposta = (
    navigate,
    proposicaoId,
    isRespostaContraria
) => {
    navigate(`/criarProposicao`, {
        state: {
            proposicaoId: proposicaoId,
            isRespostaContraria: isRespostaContraria,
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
