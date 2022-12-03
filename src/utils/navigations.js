export const goBack = (navigate) => {
    navigate(-1);
};

export const goToLogin = (navigate) => {
    navigate("/");
};

export const goToPrincipal = (navigate) => {
    navigate("/principal");
};

export const goToAlterarDados = (navigate) => {
    navigate("/alterarDados");
};

export const goToVisualizarProposicao = (
    navigate,
    proposicao,
    usuarioReferencia
) => {
    navigate(`/visualizarProposicao`, {
        state: {
            proposicao,
            usuarioReferencia,
        },
    });
};

export const goToEditarProposicao = (navigate, proposicao) => {
    navigate(`/editarProposicao`, {
        state: {
            proposicao,
        },
    });
};

export const goToCriarProposicao = (navigate) => {
    navigate(`/criarProposicao`);
};

export const goToCriarResposta = (
    navigate,
    proposicaoReferencia,
    respostaFavoravel
) => {
    navigate(`/criarProposicao`, {
        state: {
            proposicaoReferencia,
            respostaFavoravel,
        },
    });
};

export const goToPerfil = (navigate, usuario) => {
    navigate(`/perfil/${usuario.id}`, {
        state: {
            usuario,
        },
    });
};
