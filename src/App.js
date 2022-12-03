import { Routes, Route, Navigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { useSelector } from "react-redux";
import Cadastro from "./components/Cadastro/Cadastro";
import Login from "./components/Login/Login";
import AlterarDados from "./components/AlterarDados/AlterarDados";
import TelaPrincipal from "./components/TelaPrincipal/TelaPrincipal";
import VisualizarProposicao from "./components/VisualizarProposicao/VisualizarProposicao";
import Perfil from "./components/Perfil/Perfil";
import CriarProposicao from "./components/CriarProposicao/CriarProposicao";
import NavBar from "./components/NavBar/NavBar";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faTrash,
    faArrowDown,
    faArrowUp,
    faArrowLeft,
    faEdit,
    fas,
    faHouse,
    faDoorClosed,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import EditarProposicao from "./components/EditarProposicao/EditarProposicao";

library.add(
    fas,
    faHouse,
    faDoorClosed,
    faArrowUp,
    faArrowDown,
    faArrowLeft,
    faEdit,
    faTrash
);

function App() {
    const usuario = useSelector((state) => state.usuario);

    return (
        <Container
            fluid
            style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
                padding: 0,
            }}
        >
            <NavBar />
            <Routes>
                <Route
                    exact
                    path="/"
                    element={
                        usuario.isLoggedIn ? (
                            <Navigate replace to="principal" />
                        ) : (
                            <Login />
                        )
                    }
                />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/alterarDados" element={<AlterarDados />} />
                <Route
                    path="/principal"
                    element={
                        !usuario.isLoggedIn ? (
                            <Navigate replace to="/" />
                        ) : (
                            <TelaPrincipal />
                        )
                    }
                />
                <Route
                    path="/visualizarProposicao"
                    element={<VisualizarProposicao />}
                />
                <Route
                    path="/editarProposicao"
                    element={<EditarProposicao />}
                />
                <Route path="/perfil/:usuarioId" element={<Perfil />} />
                <Route path="/criarProposicao" element={<CriarProposicao />} />
            </Routes>
        </Container>
    );
}

export default App;
