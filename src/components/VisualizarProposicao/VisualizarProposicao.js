import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Figure } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    goToCriarResposta,
    goToEditarProposicao,
    goToPerfil,
    goToVisualizarProposicao,
} from "utils/navigations";
import { useSelector } from "react-redux";
import {
    downvoteColorCallback,
    formatText,
    isUpvoteCallback,
    listaDeVotosContemUsuarioLogado,
    upvoteColorCallback,
} from "utils/functions";
import Proposicao from "../Proposicao/Proposicao";
import fotoPadrao from "img/perfil.jpg";
import { addVote, findProposicaoById, removeVote } from "utils/requests";
import "./VisualizarProposicao.css";

const VisualizarProposicao = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { proposicaoId } = useParams();

    const usuarioLogado = useSelector((state) => state.usuario.data);

    // Os dados da proposição podem vir de props ou da rota. Quando ocorre um click em uma proposição, o id é passado na url
    const { proposicao: p, usuarioReferencia } = Object.keys(props).length
        ? { ...props }
        : { ...location.state };

    const [proposicao, setProposicao] = useState(p);

    const [upvoteColor, setUpvoteColor] = useState(
        upvoteColorCallback(proposicao, usuarioLogado.id)
    );
    const [downvoteColor, setDownvoteColor] = useState(
        downvoteColorCallback(proposicao, usuarioLogado.id)
    );

    const setData = async () => {
        if (proposicaoId) {
            const res = await findProposicaoById(proposicaoId);
            setProposicao(res.data);
            setUpvoteColor(upvoteColorCallback(res.data, usuarioLogado.id));
            setDownvoteColor(downvoteColorCallback(res.data, usuarioLogado.id));
        }
    };

    useEffect(() => {
        setData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [proposicaoId]);

    const handleUpvoteClick = async () => {
        const jaVotouNessaProposicao = listaDeVotosContemUsuarioLogado(
            proposicao,
            usuarioLogado.id
        );
        const isUpvote = isUpvoteCallback(proposicao, usuarioLogado.id);
        if (jaVotouNessaProposicao && isUpvote === true) {
            await removeVote(usuarioLogado.id, proposicao.id);
            proposicao.qtdUpvotes -= 1;
        } else if (jaVotouNessaProposicao && isUpvote === false) {
            // Remove downvote e adiciona upvote
            await removeVote(usuarioLogado.id, proposicao.id);
            await addVote(usuarioLogado.id, proposicao.id, true);
        } else {
            await addVote(usuarioLogado.id, proposicao.id, true);
        }
        await setData();
    };

    const handleDownvoteClick = async () => {
        const jaVotouNessaProposicao = listaDeVotosContemUsuarioLogado(
            proposicao,
            usuarioLogado.id
        );
        const isUpvote = isUpvoteCallback(proposicao, usuarioLogado.id);
        if (jaVotouNessaProposicao && isUpvote === false) {
            await removeVote(usuarioLogado.id, proposicao.id);
            proposicao.qtdDownvotes -= 1;
        } else if (jaVotouNessaProposicao && isUpvote === true) {
            // Remove upvote a adiciona upvote
            await removeVote(usuarioLogado.id, proposicao.id);
            await addVote(usuarioLogado.id, proposicao.id, false);
        } else {
            await addVote(usuarioLogado.id, proposicao.id, false);
        }
        await setData();
    };

    return (
        <div className="visualizarProposicao">
            <div className="visualizarProposicao__wrapper">
                <div className="visualizarProposicao__content">
                    <div className="d-flex align-center">
                        <Figure.Image
                            className="visualizarProposicao__foto"
                            width={30}
                            height={30}
                            src={
                                usuarioReferencia.foto
                                    ? `data:image/png;base64,${usuarioReferencia.foto}`
                                    : fotoPadrao
                            }
                            onClick={goToPerfil.bind(
                                this,
                                navigate,
                                usuarioReferencia
                            )}
                        />
                        <span
                            className="c-pointer fw-bold fs-17"
                            onClick={goToPerfil.bind(
                                this,
                                navigate,
                                usuarioReferencia
                            )}
                        >
                            @
                            {usuarioReferencia.anonimo
                                ? "------"
                                : usuarioReferencia.nickname}
                        </span>
                    </div>
                    <h4
                        className="visualizarProposicao__texto"
                        onClick={goToVisualizarProposicao.bind(
                            this,
                            navigate,
                            proposicao,
                            usuarioReferencia
                        )}
                    >
                        {formatText(proposicao.texto)}
                    </h4>
                    <div className="visualizarProposicao__icons">
                        <span
                            className={`visualizarProposicao__qtdDownvotes text-${downvoteColor}`}
                        >
                            {proposicao.qtdDownvotes}
                        </span>
                        <FontAwesomeIcon
                            className="c-pointer ml-05"
                            icon="fa-solid fa-arrow-down"
                            color={downvoteColor}
                            size="lg"
                            onClick={handleDownvoteClick}
                        />
                        <span
                            className={`visualizarProposicao__qtdUpvotes text-${upvoteColor}`}
                        >
                            {proposicao.qtdUpvotes}
                        </span>
                        <FontAwesomeIcon
                            className="c-pointer ml-05"
                            icon="fa-solid fa-arrow-up"
                            color={upvoteColor}
                            size="lg"
                            onClick={handleUpvoteClick}
                        />
                        {usuarioLogado.id === usuarioReferencia.id && (
                            <FontAwesomeIcon
                                className="visualizarProposicao__edit"
                                icon="fa-solid fa-edit"
                                color="black"
                                size="lg"
                                onClick={goToEditarProposicao.bind(
                                    this,
                                    navigate,
                                    proposicao
                                )}
                            />
                        )}
                    </div>
                </div>
                <div className="d-flex">
                    <div className="visualizarProposicao__respostas">
                        <div className="respostas--favoraveis">
                            <h4 className="fw-bold mv-10">Favoráveis</h4>
                            <FontAwesomeIcon
                                className="respostas--favoraveis__plus"
                                icon="fa-solid fa-plus"
                                size="2x"
                                onClick={goToCriarResposta.bind(
                                    this,
                                    navigate,
                                    proposicao,
                                    true
                                )}
                            />
                        </div>
                        {proposicao.respostas &&
                            proposicao.respostas
                                .filter((r) => r.isRespostaFavoravel)
                                .map((resposta) => (
                                    <Proposicao
                                        key={resposta.id}
                                        usuarioReferencia={resposta.usuario}
                                        proposicao={resposta}
                                        navigate={navigate}
                                    />
                                ))}
                    </div>
                    <div className="flex-1">
                        <div className="respostas--contrarias">
                            <h4 className="fw-bold mv-10">Contrárias</h4>
                            <FontAwesomeIcon
                                className="respostas--contrarias__plus"
                                icon="fa-solid fa-plus"
                                size="2x"
                                onClick={goToCriarResposta.bind(
                                    this,
                                    navigate,
                                    proposicao,
                                    false
                                )}
                            />
                        </div>
                        {proposicao.respostas &&
                            proposicao.respostas
                                .filter((r) => !r.isRespostaFavoravel)
                                .map((resposta) => (
                                    <Proposicao
                                        key={resposta.id}
                                        usuarioReferencia={resposta.usuario}
                                        proposicao={resposta}
                                        navigate={navigate}
                                    />
                                ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VisualizarProposicao;
