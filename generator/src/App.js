import React from "react";

import { Navbar, Nav, NavDropdown } from "react-bootstrap";

import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";

import HomePage from "./components/HomePage.jsx";
import NumberGenerator from "./components/numbers/NumberGenerator.jsx";
import ColorGenerator from "./components/colors/ColorGenerator.jsx";
import SequenceElement from "./components/sequences/SequencesElement.jsx";
import SequenceRandomize from "./components/sequences/SequencesRandomize.jsx";
import StringGenerator from "./components/words/StringGenerator.jsx";
import NameGenerator from "./components/words/NameGenerator.jsx";
import ChordGenerator from "./components/music/ChordGenerator.jsx";
import DungeonGenerator from "./components/maps/DungeonGenerator.jsx";
import MapGenerator from "./components/maps/MapGenerator.jsx";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  render() {
    return (
      <>
        <div className="App">
          <Router basename="/">
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
              <Navbar.Brand as={Link} to="/">
                Generator
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link as={Link} to="/numbers">
                    Numbers
                  </Nav.Link>
                  <Nav.Link as={Link} to="/colors">
                    Colors
                  </Nav.Link>
                  <NavDropdown title="Sequences" id="sequences-dropdown">
                    <NavDropdown.Item as={Link} to="/sequences/element">
                      Random Element
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/sequences/randomize">
                      Randomize Sequence
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="Words" id="words-dropdown">
                    <NavDropdown.Item as={Link} to="/words/string">
                      Random String
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/words/name">
                      Random Name
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link as={Link} to="/music">
                    Chords
                  </Nav.Link>
                  <NavDropdown title="Maps" id="maps-dropdown">
                    <NavDropdown.Item as={Link} to="/map">
                      Topological Map
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/dungeon">
                      Dungeon
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <br />
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route path="/numbers">
                <NumberGenerator />
              </Route>
              <Route path="/colors">
                <ColorGenerator />
              </Route>
              <Route path="/sequences/element">
                <SequenceElement />
              </Route>
              <Route path="/sequences/randomize">
                <SequenceRandomize />
              </Route>
              <Route path="/words/string">
                <StringGenerator />
              </Route>
              <Route path="/words/name">
                <NameGenerator />
              </Route>
              <Route path="/music">
                <ChordGenerator />
              </Route>
              <Route path="/map">
                <MapGenerator />
              </Route>
              <Route path="/dungeon">
                <DungeonGenerator />
              </Route>
            </Switch>
          </Router>
        </div>
      </>
    );
  }
}

export default App;
