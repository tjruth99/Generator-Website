import React from "react";

import { Button, Collapse, Form } from "react-bootstrap";

import enFirstNames from "./us-first.js";
import enLastNames from "./us-last.js";

import "../generator.css";

let firstNames = [];
let lastNames = [];

class Name extends React.Component {
  constructor() {
    super();
    this.state = {
      result: "Generate Name",
      animate: false,
      settingsShow: false,
    };
  }

  componentDidMount() {
    firstNames = enFirstNames.split(/\r?\n/);
    lastNames = enFirstNames.split(/\r?\n/);
  }

  setSettingsShow = (visibility) => {
    this.setState({
      settingsShow: visibility,
    });
  };

  generateName() {
    let first = firstNames[Math.floor(Math.random() * firstNames.length)];
    let last = lastNames[Math.floor(Math.random() * lastNames.length)];

    this.setState({
      animate: true,
      result: first + " " + last,
    });
  }

  render() {
    return (
      <>
        <h1>Name</h1>
        <p className="description-text">Generate a random name.</p>
        <div className="result-container">
          <div
            className={
              this.state.animate ? "result result-string-animation" : "result"
            }
            id="result-string"
            onAnimationEnd={() => this.setState({ animate: false })}
          >
            {this.state.result}
          </div>
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
