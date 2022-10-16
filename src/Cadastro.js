import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { axiosInstance } from "./plugins/axios";
import { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

function Cadastro(props) {
    const voltar = () => {
        window.location.href = (
            window.location.origin + window.location.pathname
        ).replace(/cadastro/g, "");
    };

    const [nome, setNome] = useState("");
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [senha2, setSenha2] = useState("");
    const [show, setShow] = useState(true);
    const [toastMessage, setToastMessage] = useState("");

    const cadastrar = () => {
        if (senha !== senha2) {
            setShow(true);
            setToastMessage("As senhas não podem ser diferentes.");
        } else {
            axiosInstance.post("usuarios", {
                nome: nome,
                nickname: nickname,
                email: email,
                senha: senha,
                foto: null,
            });
        }
    };

    return (
        <Col style={{ margin: "auto" }}>
            <div
                aria-live="polite"
                aria-atomic="true"
                className="bg-dark position-relative"
            >
                <ToastContainer position="top-end" className="p-3">
                    <Toast show={show}>
                        <Toast.Header>
                            <img
                                src="holder.js/20x20?text=%20"
                                className="rounded me-2"
                                alt="img"
                            />
                            <strong className="me-auto">Bootstrap</strong>
                            <small className="text-muted">just now</small>
                        </Toast.Header>
                        <Toast.Body>{toastMessage}</Toast.Body>
                    </Toast>
                </ToastContainer>
            </div>
            <Card
                style={{
                    alignItems: "center",
                    width: "450px",
                    margin: "auto",
                    textAlign: "center",
                    marginTop: "5%",
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
                        Cadastro
                    </Card.Title>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Nome Completo</Form.Label>
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
                            <Form.Label>Apelido</Form.Label>
                            <Form.Control
                                placeholder="Insira seu apelido"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
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
                            style={{
                                display: "flex",
                                margin: "auto",
                                marginBottom: "15px",
                            }}
                            variant="primary"
                            onClick={cadastrar}
                        >
                            Efetuar Cadastro
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default Cadastro;
