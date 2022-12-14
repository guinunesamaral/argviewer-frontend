import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    checkForProfanity,
    checkSimilarity,
    editarProposicao,
    findRespostas,
} from "utils/requests";
import { goBack } from "utils/navigations";
import { isTextValid } from "utils/validations";
import {
    INVALID_PROPOSICAO_TEXT,
    SENTENCE_PROFANITY,
    SENTENCE_TOO_SIMILAR,
    TEXTO_IGUAL_AO_ORIGINAL,
} from "utils/errorMessages";
import { concatMessages } from "utils/functions";
import Loader from "../Loader/Loader";
import "./EditarProposicao.css";

export default function EditarProposicao() {
    const navigate = useNavigate();
    const location = useLocation();

    const [loading, setLoading] = useState(false);
    const loadingMessageRef = useRef("");

    const { proposicao } = { ...location.state };
    const textoOriginal = proposicao.texto;
    const [texto, setTexto] = useState(proposicao.texto);

    const [failureMessage, setFailureMessage] = useState("");
    const [show, setShow] = useState(false);
    const [showAlertSuccess, setShowAlertSuccess] = useState(undefined);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const isProfanity = async () => {
        const res = await checkForProfanity(texto);
        return res.status === 200 ? res.data > 0.5 : false;
    };

    const isTooSimilar = async () => {
        let respostas = [];
        if (!proposicao.proposicaoInicial) {
            const res = await findRespostas(proposicao.id);
            respostas = res.data && proposicao.respostas.map((r) => r.texto);
        } else {
            respostas = proposicao.respostas
                ? proposicao.respostas.map((r) => r.texto)
                : [];
        }
        if (respostas.length > 0) {
            const res = await checkSimilarity(texto, [
                proposicao.texto,
                ...respostas,
            ]);
            return res.status === 200 ? res.data.some((s) => s > 0.6) : false;
        }
        return false;
    };

    const validarDados = async () => {
        let valid = true;
        let message = "";

        if (texto === textoOriginal) {
            valid = false;
            message = TEXTO_IGUAL_AO_ORIGINAL;
        }
        if (!isTextValid(texto)) {
            valid = false;
            message = concatMessages(message, INVALID_PROPOSICAO_TEXT);
        }
        if (await isProfanity()) {
            valid = false;
            message = concatMessages(message, SENTENCE_PROFANITY);
        }
        if (await isTooSimilar()) {
            valid = false;
            message = concatMessages(message, SENTENCE_TOO_SIMILAR);
        }
        if (!valid) {
            setShowAlertSuccess(false);
            setFailureMessage(message);
        }
        return valid;
    };

    const handleEditarProposicao = async () => {
        await editarProposicao(proposicao.id, texto, proposicao.fonte);
    };

    const handleCloseAndShowAlert = async () => {
        setShow(false);
        setShowAlertSuccess(undefined);

        loadingMessageRef.current = "validando sua proposição";
        setLoading(true);

        if (await validarDados()) {
            loadingMessageRef.current = "editando sua proposição";
            await handleEditarProposicao();
            setShowAlertSuccess(true);
            goBack(navigate);
        }
        setLoading(false);
    };

    return (
        <Col className="editarProposicao">
            {loading ? (
                <Loader message={loadingMessageRef.current} />
            ) : (
                <>
                    <Card className="editarProposicao__wrapper">
                        <Card.Body style={{ width: "380px" }}>
                            <Row>
                                <FontAwesomeIcon
                                    className="c-pointer"
                                    icon="fa-solid fa-arrow-left"
                                    onClick={goBack.bind(this, navigate)}
                                />
                            </Row>
                            <Card.Title
                                style={{
                                    textAlign: "center",
                                    marginBottom: "25px",
                                }}
                            >
                                Editar Proposição
                            </Card.Title>
                            <Form>
                                <Form.Group
                                    className="mb-3"
                                    controlId="formTexto"
                                >
                                    <Form.Label>Texto da proposição</Form.Label>
                                    <Form.Control
                                        placeholder="Insira o texto"
                                        value={texto}
                                        onChange={(e) =>
                                            setTexto(e.target.value)
                                        }
                                    />
                                </Form.Group>

                                <Button variant="primary" onClick={handleShow}>
                                    Alterar
                                </Button>
                            </Form>
                        </Card.Body>
                        <Alert
                            show={showAlertSuccess === true}
                            variant="success"
                        >
                            Proposição editada com sucesso!
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
                            <Modal.Title>Aviso</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Tem certeza que deseja alterar o seu texto?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cancelar
                            </Button>
                            <Button
                                variant="primary"
                                onClick={handleCloseAndShowAlert}
                            >
                                Alterar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )}
        </Col>
    );
}
