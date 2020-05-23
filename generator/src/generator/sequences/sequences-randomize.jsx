import React from "react";

import { Button, Collapse, Form } from "react-bootstrap";

import "../generator.css";

class SequencesRandomize extends React.Component {
  constructor() {
    super();
    this.state = { settingsShow: false };
  }

  setSettingsShow = (visibility) => {
    this.setState({
      settingsShow: visibility,
    });
  };

  randomizeSequence() {}

  render() {
    return (
      <>
        <h1>Randomize Sequence</h1>
        <p>Randomize a list</p>
        <div className="result-container">
          <div className="result"></div>
        </div>

        <Button onClick={() => this.randomizeSequence()}>Generate</Button>
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

export default SequencesRandomize;
