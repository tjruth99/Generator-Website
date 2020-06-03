import React from "react";

import { Button, Collapse, Form } from "react-bootstrap";

import "../generator.css";

class ChordGenerator extends React.Component {
  constructor() {
    super();
    this.state = { result: [], settingsShow: false };
  }

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
            <Form></Form>
          </Collapse>
        </div>
      </>
    );
  }
}

export default ChordGenerator;
