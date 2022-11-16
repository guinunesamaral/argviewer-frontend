import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { goToPrincipal } from "../../shared/navigations";
import { Alert, Figure, Modal } from "react-bootstrap";
import fotoPadrao from "../../img/perfil.jpg";
import Loader from "../Loader/Loader";
import { login as loginAction } from "../../store/usuarioSlice";
import {
    cadastrarUsuario,
    findUsuarioByNickname,
    login,
} from "../../shared/requests";
import { useDispatch } from "react-redux";
import {
    DIFFERENT_PASSWORDS,
    INVALID_EMAIL,
    INVALID_NAME,
    INVALID_NICKNAME,
    INVALID_PASSWORD,
} from "../../shared/errorMessages";
import {
    arePasswordsEqual,
    validarEmail,
    validarNickname,
    validarNome,
    validarSenha,
} from "../../shared/validations";
import "./Cadastro.css";
import { concatMessages } from "../../shared/functions";

function Cadastro(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const imageInputRef = useRef();
    const [foto, setFoto] = useState(null);
    const [nome, setNome] = useState("");
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("123456");
    const [senha2, setSenha2] = useState("123456");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        imageInputRef.current.addEventListener("change", (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result
                    .replace("data:", "")
                    .replace(/^.+,/, "");
                setFoto(base64String);
            };
            reader.readAsDataURL(file);
        });
    }, []);

    const [failureMessage, setFailureMessage] = useState("");
    const [show, setShow] = useState(false);
    const [showAlertSuccess, setShowAlertSuccess] = useState(undefined);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const validarDados = () => {
        let valid = true;
        let message = "";

        if (!validarNome(nome)) {
            valid = false;
            message = INVALID_NAME;
        }
        if (!validarNickname(nickname)) {
            valid = false;
            message = concatMessages(message, INVALID_NICKNAME);
        }
        if (!validarEmail(email)) {
            valid = false;
            message = concatMessages(message, INVALID_EMAIL);
        }
        if (!validarSenha(senha) || !validarSenha(senha2)) {
            valid = false;
            message = concatMessages(message, INVALID_PASSWORD);
        }
        if (!arePasswordsEqual(senha, senha2)) {
            valid = false;
            message = concatMessages(message, DIFFERENT_PASSWORDS);
        }
        if (!valid) {
            setShowAlertSuccess(false);
            setFailureMessage(message);
        }
        return valid;
    };

    const handleCadastro = async () => {
        return await cadastrarUsuario({
            nome,
            nickname,
            email,
            senha,
            foto,
        });
    };

    const handleLogin = async (nickname, senha) => {
        return await login(nickname, senha);
    };

    const handleCloseAndShowAlert = async () => {
        setShow(false);
        setShowAlertSuccess(undefined);

        if (validarDados()) {
            setLoading(true);
            await handleCadastro()
                .then(async () => {
                    setShowAlertSuccess(true);
                    return await handleLogin(nickname, senha);
                })
                .then(async () => await findUsuarioByNickname(nickname))
                .then((res) => dispatch(loginAction(res.data)));
            setLoading(false);
        }
    };

    return (
        <Col>
            {loading ? (
                <Loader message="Cadastrando." />
            ) : (
                <>
                    <Card className="cadastrar__wrapper">
                        <Card.Body style={{ width: "380px" }}>
                            <Row>
                                <FontAwesomeIcon
                                    onClick={goToPrincipal.bind(this, navigate)}
                                    className="c-pointer"
                                    icon="fa-solid fa-arrow-left"
                                />
                            </Row>
                            <Card.Title
                                style={{
                                    textAlign: "center",
                                    marginBottom: "25px",
                                }}
                            >
                                Cadastro
                            </Card.Title>
                            <Form>
                                <Figure>
                                    <Figure.Image
                                        style={{
                                            minHeight: "100px",
                                            minWidth: "100px",
                                        }}
                                        className="border-rounded"
                                        width={100}
                                        height={100}
                                        alt="100x100"
                                        src={
                                            foto
                                                ? `data:image/png;base64,${foto}`
                                                : fotoPadrao
                                        }
                                    />
                                </Figure>
                                <Form.Group
                                    controlId="cadastroFormBasicFoto"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        ref={imageInputRef}
                                        type="file"
                                    />
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="cadastroFormBasicNome"
                                >
                                    <Form.Label>Nome Completo</Form.Label>
                                    <Form.Control
                                        placeholder="Insira seu nome"
                                        value={nome}
                                        onChange={(e) =>
                                            setNome(e.target.value)
                                        }
                                    />
                                </Form.Group>

                                <Form.Group
                                    className="mb-3"
                                    controlId="cadastroFormBasicNickname"
                                >
                                    <Form.Label>Apelido</Form.Label>
                                    <Form.Control
                                        placeholder="Insira seu apelido"
                                        value={nickname}
                                        onChange={(e) =>
                                            setNickname(e.target.value)
                                        }
                                    />
                                </Form.Group>

                                <Form.Group
                                    className="mb-3"
                                    controlId="cadastroFormBasicEmail"
                                >
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Insira seu email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </Form.Group>

                                <Form.Group
                                    className="mb-3"
                                    controlId="cadastroFormBasicPassword"
                                >
                                    <Form.Label>Senha</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Insira sua senha"
                                        value={senha}
                                        onChange={(e) =>
                                            setSenha(e.target.value)
                                        }
                                    />
                                </Form.Group>

                                <Form.Group
                                    className="mb-3"
                                    controlId="cadastroFormBasicPasswordRepeat"
                                >
                                    <Form.Label>Repetir Senha</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirme sua senha"
                                        value={senha2}
                                        onChange={(e) =>
                                            setSenha2(e.target.value)
                                        }
                                    />
                                </Form.Group>

                                <Button
                                    style={{
                                        display: "flex",
                                        margin: "auto",
                                        marginBottom: "15px",
                                    }}
                                    variant="primary"
                                    onClick={handleShow}
                                >
                                    Efetuar Cadastro
                                </Button>
                            </Form>
                            <Alert
                                show={showAlertSuccess === true}
                                variant="success"
                            >
                                Cadastrado com sucesso!
                            </Alert>
                            <Alert
                                show={showAlertSuccess === false}
                                variant="danger"
                            >
                                {failureMessage}
                            </Alert>
                        </Card.Body>
                    </Card>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Confirmar Alteração dos Dados
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Você está efetuando alterações em seu cadastro.
                            Clique em Confirmar para prosseguir
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

export default Cadastro;
