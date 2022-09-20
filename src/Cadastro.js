import './App.css';
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'


function Cadastro(props) {
    const voltar = () => {
        window.location.href = (window.location.origin + window.location.pathname).replace(/cadastro/g, "")
    };
    return (
        <Col style={{ margin: "auto" }}>
            <Card style={{ alignItems: "center", width: "450px", margin: "auto", textAlign: "center", marginTop: "5%", borderRadius: "15px" }}>
                <Card.Body style={{ width: "380px" }}>
                    <Row>
                        <FontAwesomeIcon onClick={e => { voltar() }} style={{ float: "left", cursor: "pointer" }} icon={faArrowLeft} />
                    </Row>
                    <Card.Title style={{ textAlign: "center", marginBottom: "25px" }}>Cadastro</Card.Title>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Nome Completo</Form.Label>
                            <Form.Control placeholder="Insira seu nome" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Apelido</Form.Label>
                            <Form.Control placeholder="Insira seu apelido" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Insira seu email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control type="password" placeholder="Insira sua senha" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Repetir Senha</Form.Label>
                            <Form.Control type="password" placeholder="Confirme sua senha" />
                        </Form.Group>

                        <Button style={{ display: "flex", margin: "auto", marginBottom: "15px" }} variant="primary">Efetuar Cadastro</Button>

                    </Form>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Cadastro;
