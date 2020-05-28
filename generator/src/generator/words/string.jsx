import React from "react";

import { Button, Col, Collapse, Form, Row } from "react-bootstrap";

import "../generator.css";

const MAX_SIZE = 100;

class String extends React.Component {
  constructor() {
    super();
    this.state = {
      result: ["test"],
      size: 8,
      numberOfStrings: 1,
      useLowerCase: true,
      useUpperCase: false,
      useNumbers: false,
      useSymbols: false,
      settingsShow: false,
    };
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

  handleNumberOfStringsChange = (event) => {
    var newNumber = parseInt(event.target.value);
    if (newNumber < 1) {
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

  generateString() {}

  render() {
    return (
      <>
        <h1>String</h1>
        <p>
          Generate a random string of characters. Can be used for passwords.
        </p>
        <div className="result-container">
          <div className="result" id="result-string">
            {this.state.result[0]}
          </div>
        </div>

        <Button onClick={() => this.generateString()}>Generate</Button>
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
                    checked={true}
                    onChange={this.handleLowerChange}
                  />
                  <Form.Check
                    label="use upper case (A-Z)"
                    name="uppercase-checkbox"
                    onChange={this.handleUpperChange}
                  />
                  <Form.Check
                    label="use numbers (0-9)"
                    name="numbers-checkbox"
                    onChange={this.handleNumbersChange}
                  />
                  <Form.Check
                    label="use symbols"
                    name="symbol-checkbox"
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

export default String;
