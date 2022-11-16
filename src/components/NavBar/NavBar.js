import { Figure, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
    goToAlterarDados,
    goToLogin,
    goToPrincipal,
} from "../../shared/navigations";
import fotoPadrao from "../../img/perfil.jpg";
import { logout } from "../../store/usuarioSlice";
import { removeAllProposicoes } from "../../store/proposicoesSlice";
import "./NavBar.css";

function NavBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const usuario = useSelector((state) => state.usuario);

    const handleLogout = async () => {
        dispatch(logout());
        dispatch(removeAllProposicoes());
        goToLogin(navigate);
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
                                    : fotoPadrao
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
                    className="navBar__homeIcon"
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
                        onClick={handleLogout}
                    />
                )}
            </div>
        </div>
    );
}

export default NavBar;
