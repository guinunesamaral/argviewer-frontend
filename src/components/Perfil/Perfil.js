import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Figure from "react-bootstrap/Figure";
import Modal from "react-bootstrap/Modal";
import PreviaDebate from "../PreviaDebate/PreviaDebate";
import { useLocation, useNavigate } from "react-router-dom";

function Perfil() {
    const navigate = useNavigate();
    const location = useLocation();
    const { usuario } = { ...location.state };

    const goToPrincipal = () => {
        navigate("/principal");
    };
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Col style={{ margin: "auto" }}>
            <Card
                style={{
                    alignItems: "center",
                    width: "450px",
                    margin: "auto",
                    textAlign: "center",
                    marginTop: "2%",
                    borderRadius: "15px",
                }}
            >
                <Card.Body style={{ width: "380px" }}>
                    <Row>
                        <FontAwesomeIcon
                            onClick={goToPrincipal.bind(this)}
                            className="c-pointer"
                            icon={faArrowLeft}
                        />
                    </Row>
                    <Card.Title
                        style={{ textAlign: "center", marginBottom: "25px" }}
                    >
                        Perfil
                    </Card.Title>
                    <Figure>
                        <Figure.Image
                            style={{ borderRadius: "50%" }}
                            width={70}
                            height={70}
                            alt="150x150"
                            src={
                                usuario.foto
                                    ? `data:image/png;base64,${usuario.foto}`
                                    : "../../img/perfil.jpg"
                            }
                        />
                    </Figure>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Nome de usuário</Form.Label>
                            <Form.Control
                                disabled
                                defaultValue={usuario.nome}
                                placeholder="Insira seu nome"
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                        >
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                disabled
                                defaultValue={usuario.email}
                                type="email"
                                placeholder="Insira seu email"
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                        >
                            <Form.Label>Apelido</Form.Label>
                            <Form.Control
                                disabled
                                defaultValue={usuario.nickname}
                            />
                        </Form.Group>

                        <Button
                            onClick={handleShow}
                            style={{
                                display: "flex",
                                margin: "auto",
                                marginBottom: "15px",
                                marginTop: "10px",
                                float: "left",
                                width: "100%",
                                justifyContent: "center",
                            }}
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
                    <PreviaDebate />
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>
        </Col>
    );
}

export default Perfil;
