import logo from './logo.svg';
import './App.css';
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import { Link } from "react-router-dom"


function Login(props) {
    return (
        <Col style={{ margin: "auto" }}>
            <Card style={{ alignItems: "center", width: "450px", margin: "auto", textAlign: "center", marginTop: "15%", borderRadius: "15px" }}>
                <Card.Body>
                    <Card.Title style={{ textAlign: "center", marginBottom: "25px" }}>Login</Card.Title>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Entre com seu email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control type="password" placeholder="Senha" />
                        </Form.Group>
                        <Button style={{ display: "flex", margin: "auto", marginBottom: "15px" }} variant="primary">Entrar</Button>
                        <div>
                            Ainda não é cadastrado?
                            <Link to={"cadastro"}> Cadastre-se aqui!</Link>

                        </div>

                    </Form>
                </Card.Body>
            </Card>
        </Col>
    )

}

export default Login;
