import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Proposicao from "./Proposicao";
import NavBar from "./NavBar";

function VisualizarProposicao(props) {
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
                        Proposicao
                    </Card.Title>
                    <Row>
                        <Col sm="6">
                            <p>Favoráveis</p>
                            <Proposicao></Proposicao>
                            <Proposicao></Proposicao>
                            <Proposicao></Proposicao>
                            <Proposicao></Proposicao>
                        </Col>
                        <Col sm="6">
                            <p>Contrárias</p>
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

export default VisualizarProposicao;
