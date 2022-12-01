import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Figure from "react-bootstrap/Figure";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { goBack } from "utils/navigations";
import { findProposicoesByUsuarioId } from "utils/requests";
import PreviaDebate from "../PreviaDebate/PreviaDebate";
import fotoPadrao from "img/perfil.jpg";
import "./Perfil.css";

function Perfil() {
    const navigate = useNavigate();
    const location = useLocation();
    const { usuario } = { ...location.state };

    const [proposicoes, setProposicoes] = useState([]);
    useEffect(() => {
        const fetchProposicoes = async () =>
            await findProposicoesByUsuarioId(usuario.id);
        fetchProposicoes()
            .then((res) => res.data)
            .then((data) => setProposicoes(data));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Col className="perfil">
            <Card className="perfil__card">
                <Card.Body className="perfil__body">
                    <Row>
                        <FontAwesomeIcon
                            onClick={goBack.bind(this, navigate)}
                            className="c-pointer"
                            icon={faArrowLeft}
                        />
                    </Row>
                    <Card.Title className="perfil__title">Perfil</Card.Title>
                    <Figure>
                        <Figure.Image
                            className="perfil__image"
                            width={100}
                            height={100}
                            alt="100x100"
                            src={
                                usuario.foto
                                    ? `data:image/png;base64,${usuario.foto}`
                                    : fotoPadrao
                            }
                        />
                    </Figure>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicNome">
                            <Form.Label>Nome de usuário</Form.Label>
                            <Form.Control
                                disabled
                                defaultValue={
                                    usuario.anonimo ? "------" : usuario.nome
                                }
                                placeholder="Nome"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                disabled
                                defaultValue={
                                    usuario.anonimo ? "------" : usuario.email
                                }
                                type="email"
                                placeholder="Email"
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formBasicNickname"
                        >
                            <Form.Label>Apelido</Form.Label>
                            <Form.Control
                                disabled
                                defaultValue={
                                    usuario.anonimo
                                        ? "------"
                                        : usuario.nickname
                                }
                                placeholder="Apelido"
                            />
                        </Form.Group>

                        <Button
                            onClick={handleShow}
                            className="perfil__exibirDebates"
                            variant="primary"
                        >
                            Exibir debates ativos
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <Modal scrollable show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Debates ativos</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PreviaDebate usuario={usuario} proposicoes={proposicoes} />
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>
        </Col>
    );
}

export default Perfil;
