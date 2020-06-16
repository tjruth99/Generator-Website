import React from "react";

import { Button, Col, Collapse, Form, Modal, Row } from "react-bootstrap";

import "../generator.css";

const MIN_VALUE = -10000000000;
const MAX_VALUE = 10000000000;
const MAX_SIZE = 100;
const MAX_DIGIT = 20;

class NumberGenerator extends React.Component {
  constructor() {
    super();
    this.state = {
      result: [0],
      prevResult: 0,
      min: 0,
      max: 10,
      size: 1,
      decimal: false,
      digits: 2,
      settingsShow: false,
      resultShow: false,
      animate: false,
    };
  }

  handleMinChange = (event) => {
    var newMin = parseInt(event.target.value);
    if (newMin < MIN_VALUE) {
      newMin = MIN_VALUE;
    }

    this.setState({
      min: newMin,
    });
  };

  handleMaxChange = (event) => {
    var newMax = parseInt(event.target.value);
    if (newMax > MAX_VALUE) {
      newMax = MAX_VALUE;
    }

    this.setState({
      max: newMax,
    });
  };

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

  handleClose = (event) => {
    this.setState({
      resultShow: false,
    });
  };

  handleDecimalChange = (event) => {
    this.setState((prev) => {
      return {
        decimal: !prev.decimal,
      };
    });
  };

  handleDigitsChange = (event) => {
    var newDigit = parseInt(event.target.value);
    if (newDigit < 1) {
      newDigit = 1;
    } else if (newDigit > MAX_DIGIT) {
      newDigit = MAX_DIGIT;
    }

    this.setState({ digits: newDigit });
  };

  setSettingsShow = (visibility) => {
    this.setState({
      settingsShow: visibility,
    });
  };

  randomInteger() {
    return Math.floor(
      Math.random() * (this.state.max - this.state.min + 1) + this.state.min
    );
  }

  randomDecimal() {
    return (
      Math.random() * (this.state.max - this.state.min) +
      this.state.min
    ).toFixed(this.state.digits);
  }

  generateNum() {
    if (this.state.max <= this.state.min) {
      alert("Invalid range!");
    } else if (this.state.size > 1) {
      var resultArr = [];
      var i;
      for (i = 0; i < this.state.size; i++) {
        resultArr[i] = this.state.decimal
          ? this.randomDecimal()
          : this.randomInteger();
      }

      this.setState({
        resultShow: true,
        result: resultArr,
      });
    } else {
      let newResult = [
        this.state.decimal ? this.randomDecimal() : this.randomInteger(),
      ];

      this.setState((cur) => ({
        result: newResult,
        prevResult: newResult.toString().length < 9 ? cur.result[0] : null,
        animate: true,
      }));
    }
  }

  render() {
    return (
      <>
        <h1>Numbers</h1>
        <p className="description-text">
          Get a series of random numbers within a range
        </p>
        <div className="result-background">
          <div className="result-container">
            {/* 
          This div holds the previously generated result. 
          Removed because it was causing problems with mobile screens
          Might fix in the future
          
          <div
            className={
              this.state.animate
                ? "result-previous result-previous-animation"
                : "result-previous"
            }
            id="result-numbers-prev"
          >
            {this.state.prevResult}
          </div>
          */}
            <div className="result"></div>
            <div
              className={
                this.state.animate ? "result result-num-animation" : "result"
              }
              id="result-numbers"
              onAnimationEnd={() => this.setState({ animate: false })}
            >
              <b>{this.state.result[0]}</b>
            </div>
            <div className="result"></div>
          </div>
        </div>

        <Button
          className="generate-button"
          size="lg"
          onClick={() => this.generateNum()}
        >
          Generate
        </Button>
        <br />

        <Modal
          show={this.state.resultShow}
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
                <Form.Label column sm={1}>
                  Min:
                </Form.Label>
                <Col>
                  <Form.Control
                    type="number"
                    value={this.state.min}
                    onChange={this.handleMinChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={1}>
                  Max:
                </Form.Label>
                <Col>
                  <Form.Control
                    type="number"
                    value={this.state.max}
                    onChange={this.handleMaxChange}
                  />
                </Col>
              </Form.Group>
              <hr />
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  How many numbers to generate:
                </Form.Label>
                <Col>
                  <Form.Control
                    type="number"
                    value={this.state.size}
                    onChange={this.handleSizeChange}
                  />
                </Col>
              </Form.Group>
              <hr />
              <Form.Group as={Row}>
                <Col>
                  <Form.Check
                    type="checkbox"
                    id="decimal-checkbox"
                    label="decimal?"
                    onChange={this.handleDecimalChange}
                  />
                </Col>
                <Form.Label column sm={4}>
                  Number of digits to round to:
                </Form.Label>
                <Col>
                  <Form.Control
                    type="number"
                    value={this.state.digits}
                    onChange={this.handleDigitsChange}
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

export default NumberGenerator;
