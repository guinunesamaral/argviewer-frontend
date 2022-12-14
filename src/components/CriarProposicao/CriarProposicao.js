import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useLocation } from "react-router-dom";
import { goBack } from "utils/navigations";
import {
    checkForProfanity,
    checkSimilarity,
    criarProposicao,
    criarResposta,
} from "utils/requests";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { Alert, Modal } from "react-bootstrap";
import { isEmpty, isSourceValid, isTextValid } from "utils/validations";
import {
    INVALID_PROPOSICAO_FONTE,
    INVALID_PROPOSICAO_TEXT,
    SENTENCE_PROFANITY,
    SENTENCE_TOO_SIMILAR,
} from "utils/errorMessages";
import { concatMessages, formatText } from "utils/functions";
import "./CriarProposicao.css";

export default function CriarProposicao() {
    const navigate = useNavigate();
    const location = useLocation();
    const usuario = useSelector((state) => state.usuario);

    const [loading, setLoading] = useState(false);
    const loadingMessageRef = useRef("");

    const [texto, setTexto] = useState("");
    const [fonte, setFonte] = useState("");

    const { proposicaoReferencia, respostaFavoravel } = { ...location.state };
    const proposicaoOuResposta = proposicaoReferencia
        ? "resposta"
        : "proposição";
    const usuarioId = usuario.data.id;

    const [failureMessage, setFailureMessage] = useState("");
    const [show, setShow] = useState(false);
    const [showAlertSuccess, setShowAlertSuccess] = useState(undefined);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const isProfanity = async () => {
        const res = await checkForProfanity(texto);
        return res.status === 200 ? res.data > 0.1 : false;
    };

    const isTooSimilar = async () => {
        const respostas = proposicaoReferencia.respostas
            ? proposicaoReferencia.respostas.map((r) => r.texto)
            : [];
        const res = await checkSimilarity(texto, [
            proposicaoReferencia.texto,
            ...respostas,
        ]);
        return res.status === 200 ? res.data.some((s) => s > 0.6) : false;
    };

    const validarDados = async () => {
        let valid = true;
        let message = "";

        if (!isTextValid(texto)) {
            valid = false;
            message = INVALID_PROPOSICAO_TEXT;
        }
        if (!isEmpty(fonte) && !isSourceValid(fonte)) {
            valid = false;
            message = concatMessages(message, INVALID_PROPOSICAO_FONTE);
        }
        if (await isProfanity()) {
            valid = false;
            message = concatMessages(message, SENTENCE_PROFANITY);
        }
        if (proposicaoReferencia && (await isTooSimilar())) {
            valid = false;
            message = concatMessages(message, SENTENCE_TOO_SIMILAR);
        }
        if (!valid) {
            setShowAlertSuccess(false);
            setFailureMessage(message);
        }
        return valid;
    };

    const handleCriarProposicao = async () => {
        if (proposicaoReferencia) {
            await criarResposta(proposicaoReferencia.id, {
                texto,
                fonte,
                usuarioId,
                respostaFavoravel,
            });
        } else {
            await criarProposicao({ texto, fonte, usuarioId });
        }
    };

    const handleCloseAndShowAlert = async () => {
        setShow(false);
        setShowAlertSuccess(undefined);

        loadingMessageRef.current = "validando sua proposição";
        setLoading(true);

        if (await validarDados()) {
            loadingMessageRef.current = "criando sua proposição";
            await handleCriarProposicao();
            setShowAlertSuccess(true);
            goBack(navigate);
        }
        setLoading(false);
    };

    return (
        <Col className="criarProposicao">
            {loading ? (
                <Loader message={loadingMessageRef.current} />
            ) : (
                <>
                    <Card className="criarProposicao__wrapper">
                        <Card.Body style={{ width: "380px" }}>
                            <Row>
                                <FontAwesomeIcon
                                    onClick={goBack.bind(this, navigate)}
                                    className="c-pointer"
                                    color="black"
                                    icon="fa-solid fa-arrow-left"
                                    size="lg"
                                />
                            </Row>
                            <Card.Title
                                style={{
                                    textAlign: "center",
                                    marginBottom: "25px",
                                }}
                            >
                                {proposicaoReferencia
                                    ? "Adicionar resposta"
                                    : "Criar Proposição"}
                            </Card.Title>
                            <Form>
                                <Form.Group
                                    className="mb-3"
                                    controlId="formTexto"
                                >
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Texto"
                                        value={texto}
                                        onChange={(e) =>
                                            setTexto(e.target.value)
                                        }
                                    />
                                </Form.Group>

                                <Form.Group
                                    className="mb-3"
                                    controlId="formTexto"
                                >
                                    <Form.Control
                                        placeholder="Fonte"
                                        value={fonte}
                                        onChange={(e) =>
                                            setFonte(e.target.value)
                                        }
                                    />
                                </Form.Group>

                                <Button
                                    style={{
                                        display: "flex",
                                        margin: "15px auto 0 auto",
                                    }}
                                    variant="primary"
                                    onClick={handleShow}
                                >
                                    Postar
                                </Button>
                            </Form>
                        </Card.Body>
                        <Alert
                            show={showAlertSuccess === true}
                            variant="success"
                        >
                            {formatText(proposicaoOuResposta)} criada com
                            sucesso!
                        </Alert>
                        <Alert
                            show={showAlertSuccess === false}
                            variant="danger"
                        >
                            {failureMessage}
                        </Alert>
                    </Card>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Confirmar criação da {proposicaoOuResposta}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Você está criando a {proposicaoOuResposta}. Clique
                            em Confirmar para prosseguir
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Fechar
                            </Button>
                            <Button
                                variant="primary"
                                onClick={handleCloseAndShowAlert}
                            >
                                Confirmar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )}
        </Col>
    );
}
