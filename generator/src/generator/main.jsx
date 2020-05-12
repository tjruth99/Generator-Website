import React from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
                <NavDropdown title="Colors" id="colors-dropdown">
                  <NavDropdown.Item href="/colors/single">
                    Single Color
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/colors/palatte">
                    Color Palatte
                  </NavDropdown.Item>
                </NavDropdown>
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
              home
            </Route>
            <Route exact path="/numbers">
              numbers
            </Route>
            <Route exact path="/colors/single">
              single
            </Route>
            <Route exact path="/colors/palatte">
              palatte
            </Route>
            <Route exact path="/sequences/element">
              element
            </Route>
            <Route exact path="/sequences/randomize">
              randomize
            </Route>
          </Switch>
        </Router>
      </>
    );
  }
}

export default Main;
