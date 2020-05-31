import React from "react";

import { Button, Collapse, Form } from "react-bootstrap";

import "../generator.css";

class Name extends React.Component {
  constructor() {
    super();
    this.state = { settingsShow: false };
  }

  setSettingsShow = (visibility) => {
    this.setState({
      settingsShow: visibility,
    });
  };

  generateName() {}

  render() {
    return (
      <>
        <h1>Name</h1>
        <p className="description-text">Generate a random name.</p>
        <div className="result-container">
          <div className="result"></div>
        </div>

        <Button onClick={() => this.generateName()}>Generate</Button>
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

export default Name;
