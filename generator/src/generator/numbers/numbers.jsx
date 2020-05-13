import React from "react";

import { Button, Col, Collapse, Form } from "react-bootstrap";

import "../generator.css";

class Numbers extends React.Component {
  constructor() {
    super();
    this.state = {
      result: 0,
      min: 0,
      max: 10,
      size: 1,
      open: false,
    };
  }

  setOpen = (visibility) => {
    this.setState({
      open: visibility,
    });
  };

  generateNum() {
    let newResult =
      Math.floor(Math.random() * Math.ceil(this.state.max)) + this.state.min;
    this.setState({
      result: newResult,
    });
  }

  render() {
    return (
      <>
        <h1>Numbers</h1>
        <p className="description-text">
          Get a series of random numbers within a range
        </p>
        <br />
        <h1 className="result">{this.state.result}</h1>
        <p>{this.state.min}</p>
        <p>{this.state.max}</p>
        <p>{this.state.size}</p>
        <Button onClick={() => this.generateNum()}>Generate</Button>
        <br />

        <Button
          onClick={() => this.setOpen(!this.state.open)}
          aria-controls="collapse-settings"
          aria-expanded={this.state.open}
          className="settings-button"
        >
          Settings
        </Button>
        <br />
        <div className="settings">
          <Collapse in={this.state.open} fluid>
            <Form>
              <Form.Group>
                <Form.Label>Min</Form.Label>
                <Col>
                  <Form.Control
                    type="number"
                    placeholder={this.state.min}
                  ></Form.Control>
                </Col>
              </Form.Group>
              <Form.Group>
                <Form.Label>Max</Form.Label>
                <Col>
                  <Form.Control
                    type="number"
                    placeholder={this.state.max}
                  ></Form.Control>
                </Col>
              </Form.Group>
              <hr />
              <Form.Group>
                <Col>
                  <Form.Label>How many numbers to generate</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder={this.state.size}
                  ></Form.Control>
                </Col>
              </Form.Group>
            </Form>
          </Collapse>
        </div>
      </>
    );
  }
}

export default Numbers;
