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
import Alert from "react-bootstrap/Alert";

function AlterarDados(props) {
    const voltar = () => {
        window.location.href = (
            window.location.origin + window.location.pathname
        ).replace(/alterarDados/g, "");
    };
    const [show, setShow] = useState(false);
    const [showAlertSuccess, setShowAlertSuccess] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseAndShowAlert = () => {
        setShow(false);
        setShowAlertSuccess(true);
    };

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
                            onClick={(e) => {
                                voltar();
                            }}
                            style={{ float: "left", cursor: "pointer" }}
                            icon={faArrowLeft}
                        />
                    </Row>
                    <Card.Title
                        style={{ textAlign: "center", marginBottom: "25px" }}
                    >
                        Alterar Dados
                    </Card.Title>
                    <Figure>
                        <Figure.Image
                            width={100}
                            height={100}
                            alt="150x150"
                            src={require("./img/perfil.jpg")}
                        />
                    </Figure>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Nome de usuário</Form.Label>
                            <Form.Control
                                defaultValue={"dnscstr"}
                                placeholder="Insira seu nome"
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                        >
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                defaultValue="dnscstr@email.com"
                                type="email"
                                placeholder="Insira seu email"
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                        >
                            <Form.Label>Senha</Form.Label>
                            <Form.Control
                                defaultValue="senha"
                                type="password"
                                placeholder="Insira sua senha"
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                        >
                            <Form.Label>Repetir Senha</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirme sua senha"
                            />
                        </Form.Group>

                        <Button
                            onClick={handleShow}
                            style={{
                                display: "flex",
                                margin: "auto",
                                marginBottom: "15px",
                            }}
                            variant="primary"
                        >
                            Confirmar Alterações
                        </Button>
                    </Form>
                    <Alert show={showAlertSuccess} variant="success">
                        Dados alterados com sucesso!
                    </Alert>
                </Card.Body>
            </Card>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Alteração dos Dados</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Você está efetuando alterações em seu cadastro. Clique em
                    Confirmar para prosseguir
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={handleCloseAndShowAlert}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Col>
    );
}

export default AlterarDados;
