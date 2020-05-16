import React from "react";

import { Button, Collapse, Form } from "react-bootstrap";

import "../generator.css";

class SequencesElement extends React.Component {
  constructor() {
    super();
    this.state = { settingsShow: false };
  }

  setSettingsShow = (visibility) => {
    this.setState({
      settingsShow: visibility,
    });
  };

  getRandomElement() {}

  render() {
    return (
      <>
        <h1>Random Element</h1>
        <p>
          Give a list of words and we will select a random element from the
          list.
        </p>
        <div className="resultContainer">
          <div className="result"></div>
        </div>

        <Button onClick={() => this.getRandomElement()}>Generate</Button>
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

export default SequencesElement;
