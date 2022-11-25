import Proposicao from "../Proposicao/Proposicao";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useLocation } from "react-router-dom";
import {
    goToCriarResposta,
    goToEditarProposicao,
    goToVisualizarProposicao,
} from "../../shared/navigations";
import { formatText } from "../../shared/functions";
import "./VisualizarProposicao.css";
import { useSelector } from "react-redux";

function VisualizarProposicao(props) {
    const navigate = useNavigate();
    const location = useLocation();

    const usuarioPlataforma = useSelector((state) => state.usuario.data);
    const { proposicao, usuarioReferencia } = Object.keys(props).length
        ? { ...props }
        : { ...location.state };

    return (
        <div className="visualizarProposicao">
            <div key={proposicao.id} className="visualizarProposicao__wrapper">
                <div className="visualizarProposicao__content">
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
                        {usuarioPlataforma.id === usuarioReferencia.id && (
                            <FontAwesomeIcon
                                className="c-pointer mr-15"
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
                                        proposicaoId={resposta.id}
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
                                        proposicaoId={resposta.id}
                                        navigate={navigate}
                                    />
                                ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VisualizarProposicao;
