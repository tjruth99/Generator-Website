import React from "react";

import { Button, Col, Collapse, Form, Modal, Row } from "react-bootstrap";

import "../generator.css";

const MAX_CHARS = 30;
const MAX_SIZE = 100;

class StringGenerator extends React.Component {
  constructor() {
    super();
    this.state = {
      result: ["Press Generate"],
      size: 8,
      numberOfStrings: 1,
      useLowerCase: true,
      useUpperCase: false,
      useNumbers: false,
      useSymbols: false,
      multipleShow: false,
      animate: false,
      settingsShow: false,
    };
  }

  handleSizeChange = (event) => {
    var newSize = parseInt(event.target.value);
    if (newSize > MAX_CHARS) {
      newSize = MAX_CHARS;
    } else if (newSize < 1) {
      newSize = 1;
    }

    this.setState({
      size: newSize,
    });
  };

  handleNumberOfStringsChange = (event) => {
    var newNumber = parseInt(event.target.value);
    if (newNumber > MAX_SIZE) {
      newNumber = MAX_SIZE;
    } else if (newNumber < 1) {
      newNumber = 1;
    }

    this.setState({
      numberOfStrings: newNumber,
    });
  };

  handleLowerChange = () => {
    this.setState((prev) => {
      return {
        useLowerCase: !prev.useLowerCase,
      };
    });
  };

  handleUpperChange = () => {
    this.setState((prev) => {
      return {
        useUpperCase: !prev.useUpperCase,
      };
    });
  };

  handleNumbersChange = () => {
    this.setState((prev) => {
      return {
        useNumbers: !prev.useNumbers,
      };
    });
  };

  handleSymbolChange = () => {
    this.setState((prev) => {
      return {
        useSymbols: !prev.useSymbols,
      };
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

  generateString() {
    if (
      !this.state.useLowerCase &&
      !this.state.useUpperCase &&
      !this.state.useNumbers &&
      !this.state.useSymbols
    ) {
      alert("Please select at least one character set!");
    } else {
      var characterSet = [],
        i,
        results = [];

      if (this.state.useLowerCase) {
        for (i = 97; i < 123; i++) {
          characterSet.push(String.fromCharCode(i));
        }
      }

      if (this.state.useUpperCase) {
        for (i = 65; i < 91; i++) {
          characterSet.push(String.fromCharCode(i));
        }
      }

      if (this.state.useNumbers) {
        for (i = 48; i < 58; i++) {
          characterSet.push(String.fromCharCode(i));
        }
      }

      if (this.state.useSymbols) {
        for (i = 33; i < 48; i++) {
          characterSet.push(String.fromCharCode(i));
        }
      }

      for (i = 0; i < this.state.numberOfStrings; i++) {
        var newString = "",
          j;
        for (j = 0; j < this.state.size; j++) {
          let c = characterSet[Math.floor(Math.random() * characterSet.length)];
          newString += c;
        }
        results[i] = newString;
      }

      if (this.state.numberOfStrings > 1) {
        this.setState({
          result: results,
          multipleShow: true,
        });
      } else {
        this.setState({
          result: results,
          multipleShow: false,
          animate: true,
        });
      }
    }
  }

  render() {
    return (
      <>
        <h1>String Generator</h1>
        <p className="description-text">
          Generate a random string of characters. Can be used for passwords.
        </p>
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
          className="generate-button"
          size="lg"
          onClick={() => this.generateString()}
        >
          Generate
        </Button>
        <br />

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
                  Size of String:
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="number"
                    value={this.state.size}
                    onChange={this.handleSizeChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Number of Strings to Generate:
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="number"
                    value={this.state.numberOfStrings}
                    onChange={this.handleNumberOfStringsChange}
                  />
                </Col>
              </Form.Group>
              <hr />
              <Form.Group as={Row}>
                <Form.Label as="legend" column sm={2}>
                  Character set:
                </Form.Label>
                <Col sm={10}>
                  <Form.Check
                    label="use lower case (a-z)"
                    name="lowercase-checkbox"
                    checked={this.state.useLowerCase}
                    onChange={this.handleLowerChange}
                  />
                  <Form.Check
                    label="use upper case (A-Z)"
                    name="uppercase-checkbox"
                    checked={this.state.useUpperCase}
                    onChange={this.handleUpperChange}
                  />
                  <Form.Check
                    label="use numbers (0-9)"
                    name="numbers-checkbox"
                    checked={this.state.useNumbers}
                    onChange={this.handleNumbersChange}
                  />
                  <Form.Check
                    label="use symbols"
                    name="symbol-checkbox"
                    checked={this.state.useSymbols}
                    onChange={this.handleSymbolChange}
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

export default StringGenerator;
