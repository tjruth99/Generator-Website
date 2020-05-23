/*
    Template component for generator website

    Change all occurrences of template based on what is being generated
*/

import React from "react";

import { Button, Collapse, Form } from "react-bootstrap";

import "../generator.css";

class Template extends React.Component {
  constructor() {
    super();
    this.state = { settingsShow: false };
  }

  setSettingsShow = (visibility) => {
    this.setState({
      settingsShow: visibility,
    });
  };

  generateTemplate() {}

  render() {
    return (
      <>
        <h1>Template</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur
          minus minima iusto architecto esse aperiam quod. Tempore, praesentium
          sed molestiae quasi facilis eveniet vero exercitationem laboriosam ea
          veniam dolores ad.
        </p>
        <div className="result-container">
          <div className="result"></div>
        </div>

        <Button onClick={() => this.generateTemplate()}>Generate</Button>
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

export default Template;
