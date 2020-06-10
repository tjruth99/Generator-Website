import React from "react";

import { Button, Col, Collapse, Form, Row } from "react-bootstrap";

import ChordDisplay from "./ChordDisplay.jsx";

import * as music from "./music_functions.js";

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

const scale_list = ["7-note scale", "Pentatonic Scale"];

class ChordGenerator extends React.Component {
  constructor() {
    super();
    this.state = {
      result: "Press Generate",
      progression: [{ root: 0, tonality: 0, name: "Press Generate" }],
      key: 0,
      major: true,
      size: 4,
      seventh: false,
      pentatonic: false,
      settingsShow: false,
      animate: false,
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

  handleScaleChange = (event) => {
    let selected = event.target.value;

    this.setState({
      pentatonic: selected === scale_list[1] ? true : false,
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

  handleSeventhChange = (event) => {
    this.setState((prev) => {
      return {
        seventh: !prev.seventh,
      };
    });
  };

  setSettingsShow = (visibility) => {
    this.setState({
      settingsShow: visibility,
    });
  };

  generateChords() {
    let chords = this.state.pentatonic
      ? music.getChordsPentatonic(
          this.state.major,
          this.state.size,
          this.state.key,
          this.state.seventh
        )
      : music.getChords(
          this.state.major,
          this.state.size,
          this.state.key,
          this.state.seventh
        );

    this.setState({
      progression: chords,
      animate: true,
    });
  }

  render() {
    return (
      <>
        <h1>Chord Progression</h1>
        <p className="description-text">Generate a random chord progression.</p>
        <div className="result-container">
          <div>
            {this.state.progression.map((i) => (
              <ChordDisplay info={i} seventh={this.state.seventh} />
            ))}
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
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Generate from scale type:
                </Form.Label>
                <Col>
                  <Form.Control as="select" onChange={this.handleScaleChange}>
                    {scale_list.map((i) => (
                      <option key={i}>{i}</option>
                    ))}
                  </Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Generate Seventh Chords?
                </Form.Label>
                <Col>
                  <Form.Check
                    type="checkbox"
                    id="seventh-checkbox"
                    label=""
                    onChange={this.handleSeventhChange}
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
