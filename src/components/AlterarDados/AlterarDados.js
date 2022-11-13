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
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { goToPrincipal } from "../../shared/navigate";
import { updateUsuario } from "../../shared/requests";
import Usuario from "../../shared/Usuario";
import { useRef } from "react";
import "./AlterarDados.css";

function AlterarDados(props) {
    const usuario = useSelector((state) => state.usuario);
    const navigate = useNavigate();
    const imageInputRef = useRef();

    const [nome, setNome] = useState(usuario.data.nome);
    const [email, setEmail] = useState(usuario.data.email);
    const [isAnonimo, setIsAnonimo] = useState(usuario.data.anonimo);
    const [senha, setSenha] = useState("");
    const [senha2, setSenha2] = useState("");
    const [foto, setFoto] = useState(usuario.data.foto);

    const handleUpdate = async () => {
        const res = await updateUsuario(
            new Usuario(usuario.id, nome, email, senha, foto, usuario.anonimo)
        );
        return res.status;
    };

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

    const [show, setShow] = useState(false);
    const [showAlertSuccess, setShowAlertSuccess] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseAndShowAlert = () => {
        setShow(false);
        const status = handleUpdate();
        setShowAlertSuccess(status === 200);
    };

    return (
        <Col>
            <Card className="alterarDados__wrapper">
                <Card.Body className="body">
                    <Row>
                        <FontAwesomeIcon
                            onClick={goToPrincipal.bind(this, navigate)}
                            className="c-pointer"
                            icon={faArrowLeft}
                        />
                    </Row>
                    <Card.Title className="title">Alterar Dados</Card.Title>
                    <Figure>
                        <Figure.Image
                            className="border-rounded"
                            width={100}
                            height={100}
                            alt="100x100"
                            src={`data:image/png;base64,${foto}`}
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
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Insira seu email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="senha1">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Insira sua senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="senha2">
                            <Form.Label>Repetir Senha</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirme sua senha"
                                value={senha2}
                                onChange={(e) => setSenha2(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Check
                            className="mb-3"
                            type="switch"
                            id="custom-switch"
                            label={
                                isAnonimo
                                    ? "Mostrar seus dados?"
                                    : "Tornar-se anônimo"
                            }
                            checked={isAnonimo}
                            onChange={(e) => setIsAnonimo(e.target.value)}
                        />

                        <Button
                            className="confirmarAlteracoes"
                            variant="primary"
                            onClick={handleShow}
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
