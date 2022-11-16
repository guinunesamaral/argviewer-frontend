import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Figure from "react-bootstrap/Figure";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { goToPrincipal } from "../../shared/navigations";
import { findUsuarioByNickname, updateUsuario } from "../../shared/requests";
import { useRef } from "react";
import { login } from "../../store/usuarioSlice";
import fotoPadrao from "../../img/perfil.jpg";
import Loader from "../Loader/Loader";
import { arePasswordsEqual, validarSenha } from "../../shared/validations";
import {
    DIFFERENT_PASSWORDS,
    INVALID_PASSWORD,
} from "../../shared/errorMessages";
import { concatMessages } from "../../shared/functions";
import "./AlterarDados.css";

function AlterarDados(props) {
    const usuario = useSelector((state) => state.usuario);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const imageInputRef = useRef();

    const [loading, setLoading] = useState(false);
    const loadingMessageRef = useRef("");

    const [foto, setFoto] = useState(usuario.data.foto);
    const [nome, setNome] = useState(usuario.data.nome);
    const [email, setEmail] = useState(usuario.data.email);
    const [senha, setSenha] = useState("");
    const [senha2, setSenha2] = useState("");
    const [isAnonimo, setIsAnonimo] = useState(usuario.data.anonimo);

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

        if (!validarSenha(senha) || !validarSenha(senha2)) {
            valid = false;
            message = INVALID_PASSWORD;
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

    const handleUpdate = async () => {
        const res = await updateUsuario({
            id: usuario.data.id,
            nome,
            email,
            senha,
            foto,
            isAnonimo,
        });
        return res;
    };

    const handleCloseAndShowAlert = async () => {
        setShow(false);
        setShowAlertSuccess(undefined);

        if (validarDados()) {
            loadingMessageRef.current = "Atualizando seus dados";
            setLoading(true);
            await handleUpdate()
                .then(async () => {
                    setShowAlertSuccess(true);
                    loadingMessageRef.current = "Buscando suas informações";
                    return await findUsuarioByNickname(usuario.data.nickname);
                })
                .then((res) => dispatch(login(res.data)));
            setLoading(false);
        }
    };

    return (
        <Col className="alterarDados">
            {loading ? (
                <Loader message={loadingMessageRef.current} />
            ) : (
                <>
                    <Card className="alterarDados__wrapper">
                        <Card.Body className="body">
                            <Row>
                                <FontAwesomeIcon
                                    onClick={goToPrincipal.bind(this, navigate)}
                                    className="c-pointer"
                                    icon={faArrowLeft}
                                />
                            </Row>
                            <Card.Title className="title">
                                Alterar Dados
                            </Card.Title>
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
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Control ref={imageInputRef} type="file" />
                            </Form.Group>
                            <Form>
                                <Form.Group className="mb-3" controlId="nome">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control
                                        placeholder="Insira seu nome"
                                        value={nome}
                                        onChange={(e) =>
                                            setNome(e.target.value)
                                        }
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="email">
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

                                <Form.Group className="mb-3" controlId="senha1">
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

                                <Form.Group className="mb-3" controlId="senha2">
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

                                <Form.Check
                                    className="mb-3"
                                    type="switch"
                                    id="custom-switch"
                                    label="Anônimo"
                                    checked={isAnonimo}
                                    onChange={(e) => setIsAnonimo(!isAnonimo)}
                                />

                                <Button
                                    className="confirmarAlteracoes"
                                    variant="primary"
                                    onClick={handleShow}
                                >
                                    Confirmar Alterações
                                </Button>
                            </Form>
                            <Alert
                                show={showAlertSuccess === true}
                                variant="success"
                            >
                                Dados alterados com sucesso!
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

export default AlterarDados;
