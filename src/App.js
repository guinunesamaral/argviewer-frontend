import { Routes, Route, Navigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useSelector } from "react-redux";
import Cadastro from "./components/Cadastro";
import Login from "./components/Login";
import AlterarDados from "./components/AlterarDados";
import TelaPrincipal from "./components/TelaPrincipal";
import VisualizarProposicao from "./components/VisualizarProposicao";
import Perfil from "./components/Perfil";
import "./App.css";

function App() {
    const state = useSelector((state) => state.user);

    return (
        <Container
            fluid
            style={{
                minHeight: "100%",
                position: "relative",
                display: "flex",
                overflowX: "hidden",
            }}
        >
            <Row
                style={{
                    height: "100vh",
                    flex: "1",
                    display: "flex",
                    justifyContent: "center",
                    alignSelf: "center",
                    alignItems: "center",
                }}
            >
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={
                            state.isLoggedIn ? (
                                <Navigate replace to="principal" />
                            ) : (
                                <Login />
                            )
                        }
                    />
                    <Route path="/cadastro" element={<Cadastro />}></Route>
                    <Route
                        path="/alterarDados"
                        element={<AlterarDados />}
                    ></Route>
                    <Route
                        path="/principal"
                        element={
                            !state.isLoggedIn ? (
                                <Navigate replace to="/" />
                            ) : (
                                <TelaPrincipal />
                            )
                        }
                    ></Route>
                    <Route
                        path="/visualizarProposicao"
                        element={<VisualizarProposicao />}
                    ></Route>
                    <Route path="/perfil" element={<Perfil />}></Route>
                </Routes>
            </Row>
        </Container>
    );
}

export default App;
