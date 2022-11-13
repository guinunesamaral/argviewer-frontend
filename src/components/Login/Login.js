import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { login as loginAction } from "../../store/usuarioSlice";
import { findUsuarioByNickname, login } from "../../shared/requests";
import "./Login.css";

function Login() {
    const [loading, setLoading] = useState(false);
    const [nickname, setNickname] = useState("gn19");
    const [senha, setSenha] = useState("123456");
    const dispatch = useDispatch();

    const handleLogin = async () => {
        setLoading(true);
        let res = await login(nickname, senha);
        if (res.status === 200) {
            res = await findUsuarioByNickname(nickname);
            if (res.status === 200) {
                dispatch(loginAction(res.data[0]));
            }
            setLoading(false);
        } else {
            setLoading(false);
        }
    };

    return (
        <Col className="login">
            {loading ? (
                <div className="loader-container">
                    <div className="spinner"></div>
                </div>
            ) : (
                <Card className="login__wrapper">
                    <Card.Body>
                        <Card.Title
                            style={{
                                textAlign: "center",
                                marginBottom: "25px",
                            }}
                        >
                            Login
                        </Card.Title>
                        <Form>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                            >
                                <Form.Label>Nickname</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Entre com seu nickname"
                                    value={nickname}
                                    onChange={(e) =>
                                        setNickname(e.target.value)
                                    }
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
            )}
        </Col>
    );
}

export default Login;
