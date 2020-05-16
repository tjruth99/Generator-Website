import React from "react";

import { Button, Collapse, Form } from "react-bootstrap";

import "../generator.css";

class Colors extends React.Component {
  constructor() {
    super();
    this.state = { settingsShow: false };
  }

  setSettingsShow = (visibility) => {
    this.setState({
      settingsShow: visibility,
    });
  };

  generateColor() {}

  render() {
    return (
      <>
        <h1>Colors</h1>
        <p>
          Generate a random color or a color palette. Choose from different
          palettes to customize the feel.
        </p>
        <div className="resultContainer">
          <div className="result"></div>
        </div>

        <Button onClick={() => this.generateColor()}>Generate</Button>
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

export default Colors;
