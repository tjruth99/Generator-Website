import React from "react";

import { Button, Col, Collapse, Form, Row } from "react-bootstrap";

import "../generator.css";

class String extends React.Component {
  constructor() {
    super();
    this.state = {
      result: [""],
      size: 8,
      numberOfStrings: 1,
      useLowerCase: true,
      useUpperCase: false,
      useNumbers: false,
      useSymbols: false,
      settingsShow: false,
    };
  }

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
          <div className="result"></div>
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
                  <Form.Control type="number" value="8" />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Number of Strings to Generate:
                </Form.Label>
                <Col sm={10}>
                  <Form.Control type="number" value="1" />
                </Col>
              </Form.Group>
              <hr />
              <Form.Group as={Row}>
                <Form.Label as="legend" column sm={2}></Form.Label>
                <Col sm={10}>
                  <Form.Check
                    label="use lower case (a-z)"
                    name="lowercase-checkbox"
                  />
                  <Form.Check
                    label="use upper case (A-Z)"
                    name="uppercase-checkbox"
                  />
                  <Form.Check
                    label="use numbers (0-9)"
                    name="numbers-checkbox"
                  />
                  <Form.Check label="use symbols" name="symbol-checkbox" />
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
