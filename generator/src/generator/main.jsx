import React from "react";

//import Navbar from "react-bootstrap/Navbar";
//import Nav from "react-bootstrap/Nav";
//import NavDropdown from "react-bootstrap/NavDropdown";

import { Navbar, Nav, NavDropdown } from "react-bootstrap";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Numbers from "./numbers/numbers.jsx";
import Colors from "./colors/colors.jsx";
import SequenceElement from "./sequences/sequences-element.jsx";
import SequenceRandomize from "./sequences/sequences-randomize.jsx";

import "bootstrap/dist/css/bootstrap.min.css";

class Main extends React.Component {
  render() {
    return (
      <>
        <Router>
          <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Navbar.Brand href="/">Generator</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/numbers">Numbers</Nav.Link>
                <Nav.Link href="/Colors">Colors</Nav.Link>
                <NavDropdown title="Sequences" id="sequences-dropdown">
                  <NavDropdown.Item href="/sequences/element">
                    Random Element
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/sequences/randomize">
                    Randomize Sequence
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <br />
          <Switch>
            <Route exact path="/">
              Home
            </Route>
            <Route exact path="/numbers">
              <Numbers />
            </Route>
            <Route exact path="/colors">
              <Colors />
            </Route>
            <Route exact path="/sequences/element">
              <SequenceElement />
            </Route>
            <Route exact path="/sequences/randomize">
              <SequenceRandomize />
            </Route>
          </Switch>
        </Router>
      </>
    );
  }
}

export default Main;
