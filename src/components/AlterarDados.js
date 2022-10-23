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
import { argviewer } from "../plugins/axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AlterarDados(props) {
    const state = useSelector((state) => state.user);
    const navigate = useNavigate();

    const voltar = () => {
        navigate(-1);
    };
    const [show, setShow] = useState(false);
    const [showAlertSuccess, setShowAlertSuccess] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseAndShowAlert = () => {
        setShow(false);
        const status = handleUpdate();
        setShowAlertSuccess(status === 200);
    };

    const [nome, setNome] = useState("gn19");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("123456");
    const [senha2, setSenha2] = useState("");

    const handleUpdate = async () => {
        const res = await argviewer.post("usuarios", {
            id: 1,
            nome: nome,
            nickname: "gn19",
            email: email,
            senha: senha,
            foto: null,
            eloId: 1,
            anonimo: false,
            moderador: false,
        });

        return res.status;
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
                            src={`data:image/png;base64,${state.data.foto}`}
                        />
                    </Figure>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Nome de usuário</Form.Label>
                            <Form.Control
                                placeholder="Insira seu nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                        >
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Insira seu email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                        >
                            <Form.Label>Senha</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Insira sua senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
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
                                value={senha2}
                                onChange={(e) => setSenha2(e.target.value)}
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
