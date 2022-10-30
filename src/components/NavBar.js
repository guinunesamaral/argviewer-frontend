import Navbar from "react-bootstrap/Navbar";
import { Figure, Form, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { persistor } from "../store/index";

function NavBar() {
    const state = useSelector((state) => state.user);

    const logout = async () => {
        await persistor.purge();
        window.location.reload();
    };

    return (
        <Navbar bg="dark" variant="dark">
            <Col sm="4" style={{ display: "flex", padding: 0 }}>
                <Navbar.Brand
                    href="/alterarDados"
                    style={{
                        padding: "0",
                    }}
                >
                    {state.data.foto && (
                        <Figure.Image
                            style={{ margin: "10px 10px 10px 0" }}
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
            {state.isLoggedIn && (
                <Col
                    style={{
                        display: "flex",
                        justifyContent: "end",
                        padding: 0,
                    }}
                >
                    <Button variant="outline-primary" onClick={logout}>
                        Sair
                    </Button>
                </Col>
            )}
        </Navbar>
    );
}

export default NavBar;
