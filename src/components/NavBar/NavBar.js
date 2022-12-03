import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Figure, Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import {
    goToAlterarDados,
    goToLogin,
    goToPerfil,
    goToPrincipal,
} from "utils/navigations";
import { findAllUsuarios } from "utils/requests";
import { removeAllProposicoes } from "store/proposicoesSlice";
import { logout } from "store/usuarioSlice";
import fotoPadrao from "img/perfil.jpg";
import "./NavBar.css";

const NavBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const usuarioPlataforma = useSelector((state) => state.usuario);

    const [options, setOptions] = useState([]);
    useEffect(() => {
        const fetchUsuarios = async () => await findAllUsuarios();
        fetchUsuarios()
            .then((res) => res.data)
            .then((data) => {
                setOptions(
                    data.filter((u) => u.id !== usuarioPlataforma.data.id)
                );
            })
            .catch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLogout = async () => {
        dispatch(logout());
        dispatch(removeAllProposicoes());
        goToLogin(navigate);
    };

    return (
        <div className="navBar">
            <div className="navBar__personalData">
                {usuarioPlataforma.isLoggedIn && (
                    <>
                        <Figure.Image
                            className="personalData__foto"
                            width={40}
                            height={40}
                            src={
                                usuarioPlataforma.data.foto
                                    ? `data:image/png;base64,${usuarioPlataforma.data.foto}`
                                    : fotoPadrao
                            }
                            onClick={goToAlterarDados.bind(this, navigate)}
                        />
                        <span className="fw-bold text-white fs-20">
                            @{usuarioPlataforma.data.nickname}
                        </span>
                    </>
                )}
            </div>
            <div className="navBar__homeAndSearch">
                <FontAwesomeIcon
                    className="navBar__homeIcon"
                    icon="fa-solid fa-house"
                    color="white"
                    size="xl"
                    onClick={goToPrincipal.bind(this, navigate)}
                />
                <Form className="w-100 ml-10">
                    <Form.Group>
                        <Typeahead
                            style={{ margin: 0 }}
                            id="typeahead"
                            labelKey="nickname"
                            onChange={(selected) => {
                                if (selected.length > 0) {
                                    const usuarioPesquisa = options.find(
                                        (u) => u.nickname === selected[0]
                                    );
                                    goToPerfil(navigate, usuarioPesquisa);
                                }
                            }}
                            placeholder="Digite o que quer buscar"
                            options={options.map((u) => u.nickname)}
                        />
                    </Form.Group>
                </Form>
            </div>
            <div className="navBar__doorLocked">
                {usuarioPlataforma.isLoggedIn && (
                    <FontAwesomeIcon
                        style={{
                            margin: "10px 10px 10px 0",
                            cursor: "pointer",
                        }}
                        icon="fa-solid fa-door-closed"
                        color="white"
                        size="xl"
                        onClick={handleLogout}
                    />
                )}
            </div>
        </div>
    );
};

export default NavBar;
