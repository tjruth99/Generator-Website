import React from "react";

import { Button, Collapse, Form } from "react-bootstrap";

import "../generator.css";

class String extends React.Component {
  constructor() {
    super();
    this.state = { settingsShow: false };
  }

  setSettingsShow = (visibility) => {
    this.setState({
      settingsShow: visibility,
    });
  };

  generateString() {}

  render() {
    return (
      <>
        <h1>String</h1>
        <p>
          Generate a random string of characters. Can be used for passwords.
        </p>
        <div className="result-container">
          <div className="result"></div>
        </div>

        <Button onClick={() => this.generateString()}>Generate</Button>
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

export default String;