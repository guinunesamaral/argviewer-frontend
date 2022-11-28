import { useState, useEffect } from "react";
import { Figure } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { goToPerfil, goToVisualizarProposicao } from "utils/navigations";
import {
    formatText,
    isUpvoteCallback,
    upvoteColorCallback,
    downvoteColorCallback,
    listaDeVotosContemUsuarioLogado,
} from "utils/functions";
import { addVote, findProposicaoById, removeVote } from "utils/requests";
import fotoPadrao from "img/perfil.jpg";
import "./Proposicao.css";

const proposicaoTemplate = {
    id: 0,
    texto: "",
    fonte: "",
    qtdDownvotes: 0,
    qtdUpvotes: 0,
    usuarioId: 0,
    respostas: [],
    votes: [],
};

const Proposicao = (props) => {
    const usuarioLogado = useSelector((state) => state.usuario.data);
    const { usuarioReferencia, proposicaoId, navigate } = { ...props };
    const [proposicao, setProposicao] = useState(proposicaoTemplate);

    const [jaVotouNessaProposicao, setJaVotouNessaProposicao] = useState(
        listaDeVotosContemUsuarioLogado(proposicao, usuarioLogado.id)
    );

    const [isUpvote, setIsUpvote] = useState(
        isUpvoteCallback(
            jaVotouNessaProposicao,
            proposicao.votes,
            usuarioLogado.id
        )
    );

    const [upvoteColor, setUpvoteColor] = useState(
        upvoteColorCallback(isUpvote)
    );

    const [downvoteColor, setDownvoteColor] = useState(
        downvoteColorCallback(isUpvote)
    );

    const setData = () => {
        setJaVotouNessaProposicao(
            listaDeVotosContemUsuarioLogado(proposicao, usuarioLogado.id)
        );
        setIsUpvote(
            isUpvoteCallback(
                jaVotouNessaProposicao,
                proposicao.votes,
                usuarioLogado.id
            )
        );
        setUpvoteColor(upvoteColorCallback(isUpvote));
        setDownvoteColor(downvoteColorCallback(isUpvote));
        // console.log(
        //     jaVotouNessaProposicao,
        //     isUpvote,
        //     upvoteColor,
        //     downvoteColor
        // );
    };

    useEffect(() => {
        const findProposicao = async () =>
            await findProposicaoById(proposicaoId);
        findProposicao()
            .then((res) => {
                setProposicao(res.data);
            })
            .then(() => setData());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [proposicao.qtdDownvotes, proposicao.qtdUpvotes]);

    const handleUpvoteClick = async () => {
        if (jaVotouNessaProposicao && isUpvote === true) {
            await removeVote(usuarioLogado.id, proposicao.id);
            proposicao.qtdUpvotes -= 1;
        } else if (jaVotouNessaProposicao && isUpvote === false) {
            // Remove downvote e adiciona upvote
            await removeVote(usuarioLogado.id, proposicao.id);
            await addVote(usuarioLogado.id, proposicao.id, true);
            proposicao.qtdUpvotes += 1;
        } else {
            await addVote(usuarioLogado.id, proposicao.id, true);
            proposicao.qtdUpvotes += 1;
        }
    };

    const handleDownvoteClick = async () => {
        if (jaVotouNessaProposicao && isUpvote === false) {
            await removeVote(usuarioLogado.id, proposicao.id);
            proposicao.qtdDownvotes -= 1;
        } else if (jaVotouNessaProposicao && isUpvote === true) {
            // Remove upvote a adiciona upvote
            await removeVote(usuarioLogado.id, proposicao.id);
            await addVote(usuarioLogado.id, proposicao.id, false);
            proposicao.qtdDownvotes += 1;
        } else {
            await addVote(usuarioLogado.id, proposicao.id, false);
            proposicao.qtdDownvotes += 1;
        }
    };

    return (
        <Card className="proposicao">
            <Card.Body className="proposicao__body" style={{ marginRight: 0 }}>
                <div className="d-flex justify-between">
                    <div className="d-flex align-center">
                        <Figure.Image
                            className="proposicao__foto"
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
                            @{usuarioReferencia.nickname}
                        </span>
                    </div>
                    <div className="d-flex align-center">
                        <span className={`fw-bold mr-05 text-${downvoteColor}`}>
                            {proposicao.qtdDownvotes}
                        </span>
                        <FontAwesomeIcon
                            className="c-pointer mr-15"
                            icon="fa-solid fa-arrow-down"
                            color={downvoteColor}
                            size="lg"
                            onClick={handleUpvoteClick.bind(this, true)}
                        />
                        <span className={`fw-bold mr-05 text-${upvoteColor}`}>
                            {proposicao.qtdUpvotes}
                        </span>
                        <FontAwesomeIcon
                            className="c-pointer"
                            icon="fa-solid fa-arrow-up"
                            color={upvoteColor}
                            size="lg"
                            onClick={handleDownvoteClick.bind(this, false)}
                        />
                    </div>
                </div>
                <div className="proposicao__texto--wrapper">
                    <p
                        className="c-pointer fs-17"
                        onClick={goToVisualizarProposicao.bind(
                            this,
                            navigate,
                            proposicao,
                            usuarioReferencia
                        )}
                    >
                        {formatText(proposicao.texto)}
                    </p>
                </div>
            </Card.Body>
        </Card>
    );
};

export default Proposicao;
