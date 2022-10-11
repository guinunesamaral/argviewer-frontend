import { Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Cadastro from "./components/Cadastro/Cadastro";
import Login from "./components/Login/Login";
import AlterarDados from "./components/AlterarDados/AlterarDados";
import "./App.css";

function App() {
    return (
        <Container
            fluid
            style={{
                minHeight: "100%",
                position: "relative",
                display: "flex",
                overflowX: "hidden",
            }}
            className="App"
        >
            <Row
                style={{
                    height: "100%",
                    flex: "1",
                    alignSelf: "center",
                    paddingBottom: "32px",
                }}
            >
                <Routes>
                    <Route path="/" element={<Login />}></Route>
                    <Route path="/cadastro" element={<Cadastro />}></Route>
                    <Route
                        path="/alterarDados"
                        element={<AlterarDados />}
                    ></Route>
                </Routes>
            </Row>
        </Container>
    );
}

export default App;
