import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { goToVisualizarProposicao } from "utils/navigations";
import "./PreviaDebate.css";

function PreviaDebate(props) {
    return (
        <Col className="previaDebate">
            {props.proposicoes.length ? (
                props.proposicoes.map((p) => (
                    <ConteudoPreviaDebate
                        key={p.id}
                        usuario={props.usuario}
                        proposicao={p}
                    />
                ))
            ) : (
                <Message />
            )}
        </Col>
    );
}

const Message = () => {
    return <h3>Este usuário não possui debates</h3>;
};

function ConteudoPreviaDebate(props) {
    const navigate = useNavigate();
    const { usuario, proposicao } = { ...props };

    return (
        <Card
            className="conteudoPreviaDebate"
            onClick={goToVisualizarProposicao.bind(
                this,
                navigate,
                proposicao,
                usuario
            )}
        >
            <Card.Body className="conteudoPreviaDebate__body">
                <Card.Title className="conteudoPreviaDebate__texto">
                    {proposicao.texto}
                </Card.Title>
            </Card.Body>
        </Card>
    );
}

export default PreviaDebate;
