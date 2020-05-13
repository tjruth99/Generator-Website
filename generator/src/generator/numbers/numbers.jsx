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

  handleMinChange = (event) => {
    this.setState({
      min: parseInt(event.target.value),
    });
  };

  handleMaxChange = (event) => {
    this.setState({
      max: parseInt(event.target.value),
    });
  };

  handleSizeChange = (event) => {
    this.setState({
      size: parseInt(event.target.value),
    });
  };

  setOpen = (visibility) => {
    this.setState({
      open: visibility,
    });
  };

  generateNum() {
    if (this.state.max <= this.state.min) {
      alert("Invalid range!");
    } else if (this.state.size < 1) {
      alert("Invalid numbers in sequence!");
    } else {
      let newResult = Math.floor(
        Math.random() * (this.state.max - this.state.min + 1) + this.state.min
      );

      this.setState({
        result: newResult,
      });
    }
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
                    onChange={this.handleMinChange}
                  ></Form.Control>
                </Col>
              </Form.Group>
              <Form.Group>
                <Form.Label>Max</Form.Label>
                <Col>
                  <Form.Control
                    type="number"
                    placeholder={this.state.max}
                    onChange={this.handleMaxChange}
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
                    onChange={this.handleSizeChange}
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
