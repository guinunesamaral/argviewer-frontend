import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { login as loginAction } from "store/usuarioSlice";
import { findUsuarioByNickname, login } from "utils/requests";
import Loader from "../Loader/Loader";
import "./Login.css";

function Login() {
    const [loading, setLoading] = useState(false);
    const loadingMessageRef = useRef("");

    const [nickname, setNickname] = useState("gn19");
    const [senha, setSenha] = useState("123456");
    const dispatch = useDispatch();

    const handleLogin = async () => {
        loadingMessageRef.current = "Realizando login";
        setLoading(true);

        await login(nickname, senha)
            .then(async () => {
                loadingMessageRef.current = "Buscando suas informações";
                return await findUsuarioByNickname(nickname);
            })
            .then((res) => {
                loadingMessageRef.current = "Entrando na plataforma";
                dispatch(loginAction(res.data));
            })
            .catch(setLoading(false));
        setLoading(false);
    };

    return (
        <Col className="login">
            {loading ? (
                <Loader message={loadingMessageRef.current} />
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
