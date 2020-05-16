import React from "react";

import { Button, Col, Collapse, Form, Modal } from "react-bootstrap";

import "../generator.css";

class Numbers extends React.Component {
  constructor() {
    super();
    this.state = {
      result: [0],
      prevResult: 0,
      min: 0,
      max: 10,
      size: 1,
      settingsShow: false,
      resultShow: false,
      animate: false,
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

  handleClose = (event) => {
    this.setState({
      resultShow: false,
    });
  };

  setSettingsShow = (visibility) => {
    this.setState({
      settingsShow: visibility,
    });
  };

  generateNum() {
    if (this.state.max <= this.state.min) {
      alert("Invalid range!");
    } else if (this.state.size < 1) {
      alert("Invalid numbers in sequence!");
    } else if (this.state.size > 1) {
      this.setState({ resultShow: true });
      var resultArr = [];
      var i;
      for (i = 0; i < this.state.size; i++) {
        resultArr[i] = Math.floor(
          Math.random() * (this.state.max - this.state.min + 1) + this.state.min
        );
      }

      this.setState({
        result: resultArr,
      });
    } else {
      let newResult = [
        Math.floor(
          Math.random() * (this.state.max - this.state.min + 1) + this.state.min
        ),
      ];

      this.setState((cur) => ({
        result: newResult,
        prevResult: cur.result,
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
        <div className="resultContainer">
          <div
            className={
              this.state.animate
                ? "previousResult previousResult-animation"
                : "previousResult"
            }
          >
            {this.state.prevResult}
          </div>
          <div
            className={
              this.state.animate ? "result result-animation" : "result"
            }
            onAnimationEnd={() => this.setState({ animate: false })}
          >
            <b>{this.state.result[0]}</b>
          </div>
          <div className="result"></div>
        </div>

        <Button onClick={() => this.generateNum()}>Generate</Button>
        <br />

        <Modal show={this.state.resultShow} size="lg" centered>
          <Modal.Header>
            <Modal.Title>Result:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul>
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
