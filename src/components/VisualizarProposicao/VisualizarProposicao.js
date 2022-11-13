import Proposicao from "../Proposicao/Proposicao";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useLocation } from "react-router-dom";
import {
    goToCriarResposta,
    goToVisualizarProposicao,
} from "../../shared/navigate";
import { deleteProposicao } from "../../shared/requests";
import "./VisualizarProposicao.css";

function VisualizarProposicao(props) {
    const navigate = useNavigate();
    const location = useLocation();

    const { proposicao, usuario, fetchProposicoes } = Object.keys(props).length
        ? { ...props }
        : { ...location.state };

    const formatText = (text) => {
        return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
    };

    const handleDelete = async (proposicaoId) => {
        await deleteProposicao(proposicaoId);
        await fetchProposicoes();
    };

    return (
        <div className="mh-20 mv-20">
            <div key={proposicao.id} className={`visualizarProposicao`}>
                <div>
                    <div className="visualizarProposicao__content">
                        <h4
                            className="visualizarProposicao__texto"
                            onClick={goToVisualizarProposicao.bind(
                                this,
                                navigate,
                                proposicao,
                                usuario
                            )}
                        >
                            {formatText(proposicao.texto)}
                        </h4>
                        <div className="visualizarProposicao__icons">
                            <span className="fw-bold mr-05">
                                {proposicao.qtdDownvotes}
                            </span>
                            <FontAwesomeIcon
                                className="c-pointer mr-15"
                                icon="fa-solid fa-arrow-down"
                                color="black"
                                size="lg"
                            />
                            <span className="fw-bold mr-05">
                                {proposicao.qtdDownvotes}
                            </span>
                            <FontAwesomeIcon
                                className="c-pointer mr-15"
                                icon="fa-solid fa-arrow-up"
                                color="black"
                                size="lg"
                            />
                            <FontAwesomeIcon
                                className="c-pointer mr-15"
                                icon="fa-solid fa-edit"
                                color="black"
                                size="lg"
                            />
                            <FontAwesomeIcon
                                className="c-pointer"
                                icon="fa-solid fa-trash"
                                color="black"
                                size="lg"
                                onClick={handleDelete.bind(this, proposicao.id)}
                            />
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
                                        proposicao.id,
                                        false
                                    )}
                                />
                            </div>
                            {proposicao.respostas &&
                                proposicao.respostas
                                    .filter((r) => !r.isRespostaContraria)
                                    .map((resposta) => (
                                        <Proposicao
                                            key={resposta.id}
                                            usuario={resposta.usuario}
                                            proposicao={resposta}
                                            formatText={formatText}
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
                                        proposicao.id,
                                        true
                                    )}
                                />
                            </div>
                            {proposicao.respostas &&
                                proposicao.respostas
                                    .filter((r) => r.isRespostaContraria)
                                    .map((resposta) => (
                                        <Proposicao
                                            key={resposta.id}
                                            usuario={resposta.usuario}
                                            proposicao={resposta}
                                            formatText={formatText}
                                            navigate={navigate}
                                        />
                                    ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VisualizarProposicao;
