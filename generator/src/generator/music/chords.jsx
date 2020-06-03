import React from "react";

import { Button, Col, Collapse, Form, Row } from "react-bootstrap";

import "../generator.css";

const notes = [
  "A",
  "A#/Bb",
  "B",
  "C",
  "C#/Db",
  "D",
  "D#/Eb",
  "E",
  "F",
  "F#/Gb",
  "G",
  "G#/Ab",
];

const MAX_SIZE = 12;

class ChordGenerator extends React.Component {
  constructor() {
    super();
    this.state = {
      result: [],
      key: 0,
      major: true,
      size: 4,
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

  handleTonalityChange = (event) => {
    let isMajor = event.target.value === "Major";
    this.setState({ major: isMajor });
  };

  handleKeyChange = (event) => {
    let selected = event.target.value;
    var type = -1;
    for (var i = 0; i < notes.length; i++) {
      if (selected === notes[i]) {
        type = i;
      }
    }

    this.setState({
      key: type,
    });
  };

  setSettingsShow = (visibility) => {
    this.setState({
      settingsShow: visibility,
    });
  };

  generateChords() {}

  render() {
    return (
      <>
        <h1>Chord Progression</h1>
        <p className="description-text">Generate a random chord progression.</p>
        <div className="result-container">
          <div className="result">{this.state.result}</div>
        </div>

        <div>
          State: <br /> {this.state.major ? "True" : "False"}
        </div>

        <Button onClick={() => this.generateChords()}>Generate</Button>
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
                <Form.Label column sm={3}>
                  Key:
                </Form.Label>
                <Col>
                  <Form.Control as="select" onChange={this.handleKeyChange}>
                    {notes.map((i) => (
                      <option key={i}>{i}</option>
                    ))}
                  </Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Tonality:
                </Form.Label>
                <Col>
                  <Form.Control
                    as="select"
                    onChange={this.handleTonalityChange}
                  >
                    <option>Major</option>
                    <option>Minor</option>
                  </Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Number of chords to generate:
                </Form.Label>
                <Col>
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

export default ChordGenerator;
