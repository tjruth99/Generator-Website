import React from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Navbar";
//import NavDropdown from 'react-bootstrap/Navbar';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand>Generator</Navbar.Brand>
          <Nav>{/*<Nav.Item>Numbers</Nav.Item>*/}</Nav>
        </Navbar>
      </div>
    );
  }
}
