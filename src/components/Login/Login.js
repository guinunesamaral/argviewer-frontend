import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../plugins/axios";
import { useState } from "react";

function Login(props) {
    const [nickname, setNickname] = useState("gn19");
    const [senha, setSenha] = useState("123456");

    const handleLogin = () => {
        axiosInstance.post("login", {
            nickname: nickname,
            senha: senha,
        });
    };

    return (
        <Col style={{ margin: "auto" }}>
            <Card
                style={{
                    alignItems: "center",
                    width: "450px",
                    margin: "auto",
                    textAlign: "center",
                    borderRadius: "15px",
                }}
            >
                <Card.Body>
                    <Card.Title
                        style={{ textAlign: "center", marginBottom: "25px" }}
                    >
                        Login
                    </Card.Title>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Nickname</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Entre com seu nickname"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                        >
                            <Form.Label>Senha</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                        </Form.Group>
                        <Button
                            style={{
                                display: "flex",
                                margin: "auto",
                                marginBottom: "15px",
                            }}
                            variant="primary"
                            onClick={handleLogin}
                        >
                            Entrar
                        </Button>
                        <div>
                            Ainda não é cadastrado?
                            <Link to={"cadastro"}> Cadastre-se aqui!</Link>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default Login;
