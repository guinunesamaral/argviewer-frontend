import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Figure, Card, Row, Form, Col } from 'react-bootstrap';

function NavBar() {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Col sm="4">
                    <Navbar.Brand href='/alterarDados' style={{padding:"0"}}>
                        <Figure.Image
                            style={{ margin: "10px" }}
                            width={40}
                            height={40}
                            src={require('./img/perfil.jpg')}
                        />
                    </Navbar.Brand>
                </Col>
                <Col sm="4">
                    <Form>
                        <Form.Group>
                            <Form.Control
                                placeholder='Digite o que quer buscar'
                                type="input"

                            />
                        </Form.Group>
                    </Form>
                </Col>
            </Navbar>


        </>
    );
}

export default NavBar;