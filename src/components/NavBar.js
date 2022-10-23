import Navbar from "react-bootstrap/Navbar";
import { Figure, Form, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

function NavBar() {
    const state = useSelector((state) => state.user);

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Col sm="4">
                    <Navbar.Brand href="/alterarDados" style={{ padding: "0" }}>
                        {state.data.foto && (
                            <Figure.Image
                                style={{ margin: "10px" }}
                                width={40}
                                height={40}
                                src={`data:image/png;base64,${state.data.foto}`}
                            />
                        )}
                    </Navbar.Brand>
                </Col>
                <Col sm="4">
                    <Form>
                        <Form.Group>
                            <Form.Control
                                placeholder="Digite o que quer buscar"
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
