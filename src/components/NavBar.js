import Navbar from "react-bootstrap/Navbar";
import { Figure, Form, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { persistor } from "../store/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen, faHouse, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function NavBar() {
    const navigate = useNavigate();
    const state = useSelector((state) => state.user);

    const logout = async () => {
        await persistor.purge();
        window.location.reload();
    };

    const goToPrincipal = () => {
        navigate("/principal");
    };

    const goToAlterarDados = () => {
        navigate("/alterarDados");
    };

    return (
        <Navbar bg="dark" variant="dark">
            <Col
                sm="4"
                style={{
                    display: "flex",
                    alignItems: "center",
                    padding: 0,
                }}
            >
                {state.isLoggedIn && (
                    <>
                        {state.data.foto ? (
                            <Figure.Image
                                style={{
                                    margin: "10px 10px 10px 0",
                                    borderRadius: "50%",
                                    cursor: "pointer",
                                }}
                                width={40}
                                height={40}
                                src={`data:image/png;base64,${state.data.foto}`}
                                onClick={goToAlterarDados}
                            />
                        ) : (
                            <FontAwesomeIcon
                                style={{
                                    margin: "10px 10px 10px 0",
                                    cursor: "pointer",
                                }}
                                icon={faUser}
                                color="black"
                                size="xl"
                                onClick={goToAlterarDados}
                            />
                        )}
                        <FontAwesomeIcon
                            style={{
                                cursor: "pointer",
                                marginLeft: "10px",
                            }}
                            icon={faHouse}
                            color="black"
                            size="xl"
                            onClick={goToPrincipal}
                        />
                    </>
                )}
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
                    <FontAwesomeIcon
                        style={{
                            margin: "10px 10px 10px 0",
                            cursor: "pointer",
                        }}
                        icon={faDoorOpen}
                        color="black"
                        size="xl"
                        onClick={logout}
                    />
                </Col>
            )}
        </Navbar>
    );
}

export default NavBar;
