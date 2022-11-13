import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useLocation } from "react-router-dom";
import { goToPrincipal } from "../../shared/navigate";
import { criarProposicao, criarResposta } from "../../shared/requests";
import Proposicao from "../Proposicao/Proposicao";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./CriarProposicao.css";

export default function CriarProposicao() {
    const [texto, setTexto] = useState("");
    const [fonte, setFonte] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const usuario = useSelector((state) => state.usuario);

    const { proposicaoId } = { ...location.state };

    const handleCriarProposicao = () => {
        criarProposicao(new Proposicao(texto, fonte, usuario.id));
        criarResposta(proposicaoId, new Proposicao(texto, fonte, usuario.id));
    };

    return (
        <Col className="criarProposicao">
            <Card className="criarProposicao__wrapper">
                <Card.Body style={{ width: "380px" }}>
                    <Row>
                        <FontAwesomeIcon
                            onClick={goToPrincipal.bind(this, navigate)}
                            className="c-pointer"
                            color="black"
                            icon="fa-solid fa-arrow-left"
                            size="lg"
                        />
                    </Row>
                    <Card.Title
                        style={{ textAlign: "center", marginBottom: "25px" }}
                    >
                        {proposicaoId
                            ? "Adicionar resposta"
                            : "Criar Proposição"}
                    </Card.Title>
                    <Form>
                        <Form.Group className="mb-3" controlId="formTexto">
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Texto"
                                value={texto}
                                onChange={(e) => setTexto(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formTexto">
                            <Form.Control
                                placeholder="Fonte"
                                value={fonte}
                                onChange={(e) => setFonte(e.target.value)}
                            />
                        </Form.Group>

                        <Button
                            style={{
                                display: "flex",
                                margin: "15px auto",
                            }}
                            variant="primary"
                            onClick={handleCriarProposicao}
                        >
                            Postar
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Col>
    );
}
