import logo from './logo.svg';
import './App.css';
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import { Link } from "react-router-dom"
import Row from 'react-bootstrap/Row'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp, faScaleBalanced, faMessage, faFlag } from '@fortawesome/free-solid-svg-icons'




function Proposicao(props) {
    return (
        <Col style={{ margin: "auto" }}>
            <Card style={{ textAlign: "center", borderRadius: "15px" }}>
                <Card.Body>
                    <Row>
                        <Col sm="6">
                            <p style={{ textAlign: "left" }}>@usuario</p>
                        </Col>
                        <Col sm="6">
                            <Button variant="dark" size='sm' style={{ marginRight: "10px" }}>
                                <FontAwesomeIcon style={{ float: "left", cursor: "pointer" }} icon={faArrowDown} />
                            </Button>
                            <Button variant="dark" size='sm' style={{ marginRight: "10px" }}>
                                <FontAwesomeIcon style={{ float: "left", cursor: "pointer" }} icon={faArrowUp} />
                            </Button>
                            <Button variant="dark" size='sm' style={{ marginRight: "10px" }}>
                                <FontAwesomeIcon style={{ float: "left", cursor: "pointer" }} icon={faScaleBalanced} />
                            </Button>
                            <Button variant="dark" size='sm' style={{ marginRight: "10px" }}>
                                <FontAwesomeIcon style={{ float: "left", cursor: "pointer" }} icon={faMessage} />
                            </Button>
                            <Button variant="dark" size='sm' style={{ marginRight: "10px" }}>
                                <FontAwesomeIcon style={{ float: "left", cursor: "pointer" }} icon={faFlag} />
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ textAlign: "left" }} sm="12">
                            <p>Texto da proposição</p>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    )

}

export default Proposicao;
