import React from "react";

import { Button, Col, Collapse, Modal, Form, Row } from "react-bootstrap";

import enFirstNames from "./us-first.js";
import enLastNames from "./us-last.js";

import "../generator.css";

let firstNames = [];
let lastNames = [];

const MAX_SIZE = 100;

class NameGenerator extends React.Component {
  constructor() {
    super();
    this.state = {
      result: ["Press Generate"],
      size: 1,
      animate: false,
      multipleShow: false,
      settingsShow: false,
    };
  }

  componentDidMount() {
    firstNames = enFirstNames.split(/\r?\n/);
    lastNames = enLastNames.split(/\r?\n/);
  }

  handleSizeChange = (event) => {
    var newSize = parseInt(event.target.value);
    if (newSize > MAX_SIZE) {
      newSize = MAX_SIZE;
    } else if (newSize < 1) {
      newSize = 1;
    }

    this.setState({
      size: newSize,
    });
  };

  setSettingsShow = (visibility) => {
    this.setState({
      settingsShow: visibility,
    });
  };

  handleClose = () => {
    this.setState({
      multipleShow: false,
    });
  };

  generateName() {
    let names = [];

    for (let i = 0; i < this.state.size; i++) {
      let first = firstNames[Math.floor(Math.random() * firstNames.length)];
      let last = lastNames[Math.floor(Math.random() * lastNames.length)];

      names[i] = first + " " + last;
    }

    this.setState({
      animate: true,
      multipleShow: names.length > 1 ? true : false,
      result: names,
    });
  }

  render() {
    return (
      <>
        <h1>Name Generator</h1>
        <p className="description-text">Generate a random name.</p>
        <div className="result-background">
          <div className="result-container">
            <div
              className={
                this.state.animate ? "result result-string-animation" : "result"
              }
              id="result-string"
              onAnimationEnd={() => this.setState({ animate: false })}
            >
              {this.state.result[0]}
            </div>
          </div>
        </div>

        <Button onClick={() => this.generateName()}>Generate</Button>
        <br />

        <Modal
          show={this.state.multipleShow}
          onHide={this.handleClose}
          size="lg"
          centered
        >
          <Modal.Header>
            <Modal.Title>Results:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul class="multiple-result">
              {this.state.result.map((item) => (
                <li>{item}</li>
              ))}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Button
          onClick={() => this.setSettingsShow(!this.state.settingsShow)}
          aria-controls="collapse-settings"
          aria-expanded={this.state.settingsShow}
          className="settings-button"
        >
          Settings
        </Button>
        <br />
        <div className="settings">
          <Collapse in={this.state.settingsShow} fluid>
            <Form>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Number of Names to Generate:
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="number"
                    value={this.state.size}
                    onChange={this.handleSizeChange}
                  />
                </Col>
              </Form.Group>
            </Form>
          </Collapse>
        </div>
      </>
    );
  }
}

export default NameGenerator;
