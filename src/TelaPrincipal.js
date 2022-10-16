import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Proposicao from "./Proposicao";
import NavBar from "./NavBar";

function TelaPrincipal(props) {
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
                        style={{ textAlign: "center", marginBottom: "25px" }}
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
