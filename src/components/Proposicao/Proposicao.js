import { useState, useEffect } from "react";
import { Figure } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { goToPerfil, goToVisualizarProposicao } from "utils/navigations";
import { formatText } from "utils/functions";
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

function Proposicao(props) {
    const usuarioPlataforma = useSelector((state) => state.usuario.data);
    const { usuarioReferencia, proposicaoId, navigate } = { ...props };
    const [proposicao, setProposicao] = useState(proposicaoTemplate);

    // usuarioVote and upvote
    const usuarioVoteCallback = (v) => v.usuarioId === usuarioPlataforma.id;
    const haveAlreadyVotedCallback = () =>
        proposicao.votes.some(usuarioVoteCallback);
    const [haveAlreadyVoted, setHaveAlreadyVoted] = useState(
        haveAlreadyVotedCallback
    );
    const isUpvoteCallback = () =>
        haveAlreadyVoted
            ? proposicao.votes.find(usuarioVoteCallback).upvote
            : undefined;
    const [isUpvote, setIsUpvote] = useState(isUpvoteCallback);

    // fetches proposicao when the component loads
    useEffect(() => {
        const findProposicao = async () => {
            const res = await findProposicaoById(proposicaoId);
            setProposicao(res.data);
        };
        findProposicao();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // updates haveAlreadyVoted and isUpvote
    useEffect(() => {
        setHaveAlreadyVoted(haveAlreadyVotedCallback);
        setIsUpvote(isUpvoteCallback);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [proposicao]);

    // upvoteCollorCallbacks
    const isUpvoteCollorCallback = () => (isUpvote === true ? "blue" : "black");
    const isDownvoteCollorCallback = () =>
        isUpvote === false ? "blue" : "black";

    // handleVoteClick
    const handleVoteClick = async (isUpvote) => {
        if (!haveAlreadyVoted) {
            await addVote(usuarioPlataforma.id, proposicao.id, isUpvote);
            setIsUpvote(isUpvote);
            setHaveAlreadyVoted(false);
            if (isUpvote === true) {
                proposicao.qtdUpvotes += 1;
            } else {
                proposicao.qtdDownvotes += 1;
            }
        } else {
            await removeVote(usuarioPlataforma.id, proposicao.id);
            setIsUpvote(undefined);
            setHaveAlreadyVoted(false);
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
                        <span
                            className={`fw-bold mr-05 text-${isDownvoteCollorCallback()}`}
                        >
                            {proposicao.qtdDownvotes}
                        </span>
                        <FontAwesomeIcon
                            className="c-pointer mr-15"
                            icon="fa-solid fa-arrow-down"
                            color={() => isDownvoteCollorCallback()}
                            size="lg"
                            onClick={handleVoteClick.bind(this, true)}
                        />
                        <span
                            className={`fw-bold mr-05 text-${isUpvoteCollorCallback()}`}
                        >
                            {proposicao.qtdUpvotes}
                        </span>
                        <FontAwesomeIcon
                            className="c-pointer"
                            icon="fa-solid fa-arrow-up"
                            color={isUpvoteCollorCallback()}
                            size="lg"
                            onClick={handleVoteClick.bind(this)}
                        />
                    </div>
                </div>
                <div className="d-flex mt-10">
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
}

export default Proposicao;
