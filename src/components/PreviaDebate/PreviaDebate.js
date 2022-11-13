import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";

function PreviaDebate(props) {
    return (
        <Col style={{ margin: "auto" }}>
            <ConteudoPreviaDebate tituloDebate="Debate 1"></ConteudoPreviaDebate>
            <ConteudoPreviaDebate tituloDebate="Debate 2"></ConteudoPreviaDebate>
            <ConteudoPreviaDebate tituloDebate="Debate 3"></ConteudoPreviaDebate>
            <ConteudoPreviaDebate tituloDebate="Debate 4"></ConteudoPreviaDebate>
            <ConteudoPreviaDebate tituloDebate="Debate 5"></ConteudoPreviaDebate>
            <ConteudoPreviaDebate tituloDebate="Debate 6"></ConteudoPreviaDebate>
            <ConteudoPreviaDebate tituloDebate="Debate 7"></ConteudoPreviaDebate>
        </Col>
    );
}

function ConteudoPreviaDebate(props) {
    return (
        <Card
            style={{
                margin: "auto",
                textAlign: "center",
                marginTop: "5%",
                borderColor: "black",
            }}
        >
            <Link
                style={{ textDecoration: "none" }}
                to={"/visualizarProposicao"}
            >
                <Card.Body
                    style={{
                        backgroundColor: "black",
                        backgroundSize: "cover",
                        backgroundPosition: "100% 56%",
                        backgroundImage: `url("https://img.freepik.com/free-vector/group-people-with-speech-bubbles_24877-56560.jpg?w=826&t=st=1667270052~exp=1667270652~hmac=67234391f6376bdf9a0ec66517c2981357de5e85a38af8abc29316a2ebcac2b7")`,
                    }}
                >
                    <Card.Title
                        style={{
                            color: "black",
                            textAlign: "left",
                            marginBottom: "25px",
                        }}
                    >
                        {props.tituloDebate}
                    </Card.Title>
                    <Row></Row>
                </Card.Body>
            </Link>
        </Card>
    );
}

export default PreviaDebate;
