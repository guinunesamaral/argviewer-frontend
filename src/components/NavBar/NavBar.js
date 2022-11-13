import { Figure, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { persistor } from "../../store/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { goToAlterarDados, goToPrincipal } from "../../shared/navigate";
import "./NavBar.css";

function NavBar() {
    const navigate = useNavigate();
    const usuario = useSelector((state) => state.usuario);

    const logout = async () => {
        await persistor.purge();
        window.location.reload();
    };

    return (
        <div className="navBar">
            <div className="navBar__personalData">
                {usuario.isLoggedIn && (
                    <>
                        <Figure.Image
                            className="personalData__foto"
                            width={40}
                            height={40}
                            src={
                                usuario.data.foto
                                    ? `data:image/png;base64,${usuario.data.foto}`
                                    : "../../img/perfil.jpg"
                            }
                            onClick={goToAlterarDados.bind(this, navigate)}
                        />
                        <span className="fw-bold text-black fs-20">
                            @{usuario.data.nickname}
                        </span>
                    </>
                )}
            </div>
            <div className="navBar__homeAndSearch">
                <FontAwesomeIcon
                    className="c-pointer"
                    icon="fa-solid fa-house"
                    color="black"
                    size="xl"
                    onClick={goToPrincipal.bind(this, navigate)}
                />
                <Form className="w-100 ml-10">
                    <Form.Group>
                        <Form.Control
                            placeholder="Digite o que quer buscar"
                            type="input"
                        />
                    </Form.Group>
                </Form>
            </div>
            <div className="navBar__doorLocked">
                {usuario.isLoggedIn && (
                    <FontAwesomeIcon
                        style={{
                            margin: "10px 10px 10px 0",
                            cursor: "pointer",
                        }}
                        icon="fa-solid fa-door-closed"
                        color="black"
                        size="xl"
                        onClick={logout}
                    />
                )}
            </div>
        </div>
    );
}

export default NavBar;
