import logo from './logo.svg';
import './App.css';
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Container from "react-bootstrap/Container"
import Row from 'react-bootstrap/Row'
import Cadastro from './Cadastro';
import Login from "./Login"
import { Routes, Route } from "react-router-dom"
import AlterarDados from './AlterarDados';
import TelaPrincipal from './TelaPrincipal';


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
          <Route path="/" element={<Login />}>
          </Route>
          <Route path="/cadastro" element={<Cadastro />}>
          </Route>
          <Route path="/alterarDados" element={<AlterarDados />}>
          </Route>
          <Route path="/principal" element={<TelaPrincipal />}>
          </Route>
        </Routes>
      </Row>
    </Container >
  )
}

export default App;
