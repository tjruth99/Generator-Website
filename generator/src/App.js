import React from "react";

import { Navbar, Nav, NavDropdown } from "react-bootstrap";

import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";

import Numbers from "./generator/numbers/numbers.jsx";
import Colors from "./generator/colors/colors.jsx";
import SequenceElement from "./generator/sequences/sequences-element.jsx";
import SequenceRandomize from "./generator/sequences/sequences-randomize.jsx";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  render() {
    return (
      <>
        <div className="App">
          <Router basename="/">
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
              <Navbar.Brand>
                <Link to="/" style={{ textDecoration: "none" }}>
                  Generator
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link>
                    <Link to="/numbers" style={{ textDecoration: "none" }}>
                      Numbers
                    </Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link to="/colors" style={{ textDecoration: "none" }}>
                      Colors
                    </Link>
                  </Nav.Link>
                  <NavDropdown title="Sequences" id="sequences-dropdown">
                    <NavDropdown.Item>
                      <Link
                        to="/sequences/element"
                        style={{ textDecoration: "none" }}
                      >
                        Random Element
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link
                        to="/sequences/randomize"
                        style={{ textDecoration: "none" }}
                      >
                        Randomize Sequence
                      </Link>
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <br />
            <Switch>
              <Route exact path="/">
                Home page WIP
              </Route>
              <Route path="/numbers">
                <Numbers />
              </Route>
              <Route path="/colors">
                <Colors />
              </Route>
              <Route path="/sequences/element">
                <SequenceElement />
              </Route>
              <Route path="/sequences/randomize">
                <SequenceRandomize />
              </Route>
            </Switch>
          </Router>
        </div>
      </>
    );
  }
}

export default App;
