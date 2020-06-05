import React from "react";

import {
  Button,
  Col,
  Collapse,
  Form,
  Row,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";

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

class ChordDisplay extends React.Component {
  constructor() {
    super();
    this.state = {
      root: 0,
      tonality: 0,
      name: "",
      notesInChord: "",
      is7th: false,
    };
  }

  updateState() {
    let crdRoot = this.props.info.root,
      crdTonality = this.props.info.tonality,
      crdName = this.props.info.name;

    let arr = [];
    switch (crdTonality) {
      case 0: // major
        arr = this.getMajorNotes(crdRoot, false);
        break;
      case 1: // minor
        arr = this.getMinorNotes(crdRoot, false);
        break;
      case 2: // diminished
        arr = this.getDiminishedNotes(crdRoot, false);
        break;
      default:
        arr = this.getMajorNotes(crdRoot, false);
    }

    let noteString = "";

    arr.map((n) => (noteString = noteString.concat(n, ", ")));
    noteString = noteString.slice(0, noteString.length - 2);

    this.setState({
      root: crdRoot,
      tonality: crdTonality,
      name: crdName,
      notesInChord: noteString,
    });
  }

  componentDidMount = () => {
    this.updateState();
  };

  componentDidUpdate(prevProps) {
    if (prevProps.info !== this.props.info) {
      this.updateState();
    }
  }

  convertNoteToString(noteArr) {
    let a = [];
    let i = 0;
    noteArr.forEach((n) => (a[i++] = notes[n]));

    return a;
  }

  getMajorNotes(root, is7th) {
    let arr = [];

    arr[0] = root;
    arr[1] = (root + 4) % 12;
    arr[2] = (root + 7) % 12;

    if (is7th) {
      arr[4] = (root + 11) % 12;
    }

    return this.convertNoteToString(arr);
  }

  getMinorNotes(root, is7th) {
    let arr = [];

    arr[0] = root;
    arr[1] = (root + 3) % 12;
    arr[2] = (root + 7) % 12;

    if (is7th) {
      arr[4] = (root + 10) % 12;
    }

    return this.convertNoteToString(arr);
  }

  getDiminishedNotes(root, is7th) {
    let arr = [];

    arr[0] = root;
    arr[1] = (root + 3) % 12;
    arr[2] = (root + 6) % 12;

    if (is7th) {
      arr[4] = (root + 9) % 12;
    }

    return this.convertNoteToString(arr);
  }

  render() {
    return (
      <>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 100, hide: 500 }}
          overlay={
            <Tooltip id="tooltip-chord">
              Notes in chord: <br />
              {this.state.notesInChord}
            </Tooltip>
          }
        >
          <div id="result-chord">{this.state.name}</div>
        </OverlayTrigger>
      </>
    );
  }
}

class ChordGenerator extends React.Component {
  constructor() {
    super();
    this.state = {
      result: "Press Generate",
      progression: [],
      key: 0,
      major: true,
      size: 4,
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
    let objects = [];
    if (this.state.major) {
      for (let i = 0; i < this.state.size; i++) {
        let scaleTone = Math.floor(Math.random() * 7);
        let chordRoot = this.scale_tone_to_note(this.state.key, scaleTone);
        let chord = notes[chordRoot] + " " + maj_chords[scaleTone];
        let tone = 0;

        if (maj_chords[scaleTone] === "maj") {
          tone = 0;
        } else if (maj_chords[scaleTone] === "min") {
          tone = 1;
        } else {
          tone = 2;
        }

        objects.push({
          root: chordRoot,
          tonality: tone,
          name: chord,
        });
      }
    } else {
      for (let i = 0; i < this.state.size; i++) {
        let scaleTone = Math.floor(Math.random() * 7);
        let chordRoot = this.scale_tone_to_note(this.state.key, scaleTone);
        let chord = notes[chordRoot] + " " + min_chords[scaleTone];
        let tone = 0;

        if (min_chords[scaleTone] === "maj") {
          tone = 0;
        } else if (min_chords[scaleTone] === "min") {
          tone = 1;
        } else {
          tone = 2;
        }

        objects.push({
          root: chordRoot,
          tonality: tone,
          name: chord,
        });
      }
    }

    this.setState({
      progression: objects,
      animate: true,
    });
  }

  render() {
    return (
      <>
        <h1>Chord Progression</h1>
        <p className="description-text">Generate a random chord progression.</p>
        <div className="result-container">
          <div
            className={
              this.state.animate ? "result result-string-animation" : "result"
            }
            id="result-string"
            onAnimationEnd={() => this.setState({ animate: false })}
          >
            {this.state.progression.map((i) => (
              <ChordDisplay info={i} />
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
            </Form>
          </Collapse>
        </div>
      </>
    );
  }
}

export default ChordGenerator;
