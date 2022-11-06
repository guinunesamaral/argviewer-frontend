import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Proposicao from "./Proposicao";
import NavBar from "./NavBar";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { argviewer } from "../plugins/axios";
import { useEffect } from "react";
import { addAll } from "../store/proposicaoSlice";

function TelaPrincipal() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const state = useSelector((state) => state.user);

    const goTovisualizarProposicao = () => {
        navigate("/visualizarProposicao/");
    };

    useEffect(() => {
        const fetchProposicoes = async () => {
            const res = await argviewer.get(
                `proposicoes?usuarioId=${state.data.id}`
            );
            dispatch(addAll(res.data));
        };
        fetchProposicoes();
    }, [dispatch, state.data.id]);

    return (
        <Col style={{ margin: "auto" }}>
            <NavBar></NavBar>

            <Card
                style={{
                    margin: "auto",
                    textAlign: "center",
                    marginTop: "5%",
                    borderRadius: "15px",
                }}
            >
                <Card.Body>
                    <Card.Title
                        style={{
                            textAlign: "center",
                            marginBottom: "25px",
                            cursor: "pointer",
                        }}
                        onClick={goTovisualizarProposicao}
                    >
                        Argumento 1
                    </Card.Title>
                    <Row>
                        <Col sm="6">
                            <Proposicao></Proposicao>
                            <Proposicao></Proposicao>
                            <Proposicao></Proposicao>
                            <Proposicao></Proposicao>
                        </Col>
                        <Col sm="6">
                            <Proposicao></Proposicao>
                            <Proposicao></Proposicao>
                            <Proposicao></Proposicao>
                            <Proposicao></Proposicao>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <Card
                style={{
                    margin: "auto",
                    textAlign: "center",
                    marginTop: "5%",
                    borderRadius: "15px",
                }}
            >
                <Card.Body>
                    <Card.Title
                        style={{ textAlign: "center", marginBottom: "25px" }}
                    >
                        Argumento 2
                    </Card.Title>
                    <Row>
                        <Col sm="6">
                            <Proposicao></Proposicao>
                            <Proposicao></Proposicao>
                            <Proposicao></Proposicao>
                            <Proposicao></Proposicao>
                        </Col>
                        <Col sm="6">
                            <Proposicao></Proposicao>
                            <Proposicao></Proposicao>
                            <Proposicao></Proposicao>
                            <Proposicao></Proposicao>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <Card
                style={{
                    margin: "auto",
                    textAlign: "center",
                    marginTop: "5%",
                    borderRadius: "15px",
                }}
            >
                <Card.Body>
                    <Card.Title
                        style={{ textAlign: "center", marginBottom: "25px" }}
                    >
                        Argumento 3
                    </Card.Title>
                    <Row>
                        <Col sm="6">
                            <Proposicao></Proposicao>
                            <Proposicao></Proposicao>
                            <Proposicao></Proposicao>
                            <Proposicao></Proposicao>
                        </Col>
                        <Col sm="6">
                            <Proposicao></Proposicao>
                            <Proposicao></Proposicao>
                            <Proposicao></Proposicao>
                            <Proposicao></Proposicao>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default TelaPrincipal;
