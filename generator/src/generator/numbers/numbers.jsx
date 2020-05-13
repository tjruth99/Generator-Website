import React, { useState } from "react";

import { Button, Col, Collapse, Form } from "react-bootstrap";

import "../generator.css";

function Settings() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="collapse-settings"
        aria-expanded={open}
        className="settings-button"
      >
        Settings
      </Button>
      <br />
      <div className="settings">
        <Collapse in={open} fluid>
          <Form>
            <Form.Group>
              <Form.Label>Min</Form.Label>
              <Col>
                <Form.Control type="number" placeholder="0"></Form.Control>
              </Col>
            </Form.Group>
            <Form.Group>
              <Form.Label>Max</Form.Label>
              <Col>
                <Form.Control type="number" placeholder="10"></Form.Control>
              </Col>
            </Form.Group>
            <hr />
            <Form.Group>
              <Col>
                <Form.Label>How many numbers to generate</Form.Label>
                <Form.Control type="number" placeholder="1"></Form.Control>
              </Col>
            </Form.Group>
          </Form>
        </Collapse>
      </div>
    </>
  );
}

class Numbers extends React.Component {
  constructor() {
    super();
    this.state = {
      result: 0,
    };
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
        <Settings />
      </>
    );
  }
}

export default Numbers;
