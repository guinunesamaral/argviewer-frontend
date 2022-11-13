import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Figure } from "react-bootstrap";
import { goToPerfil, goToVisualizarProposicao } from "../../shared/navigate";
import "./Proposicao.css";

function Proposicao(props) {
    const { usuario, proposicao, formatText, navigate } = { ...props };

    return (
        <Card className="proposicao">
            <Card.Body className="proposicao__body">
                <div className="d-flex justify-between">
                    <div className="d-flex align-center">
                        <Figure.Image
                            className="proposicao__foto"
                            width={30}
                            height={30}
                            src={
                                usuario.foto
                                    ? `data:image/png;base64,${usuario.foto}`
                                    : "../../img/perfil.jpg"
                            }
                            onClick={goToPerfil.bind(this, navigate, usuario)}
                        />
                        <span
                            className="c-pointer fw-bold fs-17"
                            onClick={goToPerfil.bind(this, navigate, usuario)}
                        >
                            @{usuario.nickname}
                        </span>
                    </div>
                    <div className="d-flex align-center">
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
                            {proposicao.qtdUpvotes}
                        </span>
                        <FontAwesomeIcon
                            className="c-pointer"
                            icon="fa-solid fa-arrow-up"
                            color="black"
                            size="lg"
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
                            usuario
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
