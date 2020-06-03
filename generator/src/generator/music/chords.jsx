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

const maj_scale_steps = [2, 2, 1, 2, 2, 2];
const min_scale_steps = [2, 1, 2, 2, 1, 2];
const maj_chords = ["maj", "min", "min", "maj", "maj", "min", "dim"];
const min_chords = ["min", "dim", "maj", "min", "min", "maj", "maj"];

class ChordGenerator extends React.Component {
  constructor() {
    super();
    this.state = {
      result: "Press Generate",
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

  scale_tone_to_note(key, scaleTone) {
    let arr = this.state.major ? maj_scale_steps : min_scale_steps;
    let sum = 0;

    for (let i = 0; i < scaleTone; i++) {
      sum += arr[i];
    }

    return (key + sum) % 12;
  }

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

  generateChords() {
    let progression = "";
    if (this.state.major) {
      for (let i = 0; i < this.state.size; i++) {
        let scaleTone = Math.floor(Math.random() * 7);
        let chordRoot = this.scale_tone_to_note(this.state.key, scaleTone);
        let chord = notes[chordRoot] + maj_chords[scaleTone];

        if (i !== this.state.size - 1) {
          progression = progression.concat(chord, ", ");
        } else {
          progression = progression.concat(chord);
        }
      }
    } else {
      for (let i = 0; i < this.state.size; i++) {
        let scaleTone = Math.floor(Math.random() * 7);
        let chordRoot = this.scale_tone_to_note(this.state.key, scaleTone);
        let chord = notes[chordRoot] + min_chords[scaleTone];

        if (i !== this.state.size - 1) {
          progression = progression.concat(chord, ", ");
        } else {
          progression = progression.concat(chord);
        }
      }
    }

    this.setState({
      result: progression,
    });
  }

  render() {
    return (
      <>
        <h1>Chord Progression</h1>
        <p className="description-text">Generate a random chord progression.</p>
        <div className="result-container">
          <div className="result" id="result-string">
            <b>{this.state.result}</b>
          </div>
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
