import React from "react";

import { Button, Collapse, Form } from "react-bootstrap";

import "../generator.css";

class SequencesElement extends React.Component {
  constructor() {
    super();
    this.state = { input: "", result: "", settingsShow: false };
  }

  handleInput = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  setSettingsShow = (visibility) => {
    this.setState({
      settingsShow: visibility,
    });
  };

  getRandomElement() {
    let array = this.state.input.split(/\r?\n/);
    let index = Math.floor(Math.random() * array.length);

    this.setState({
      result: array[index],
    });
  }

  render() {
    return (
      <>
        <h1>Random Element</h1>
        <p>
          Give a list of words or phrases separated on a new line and hit
          generate to get a random element from the list
        </p>
        <textarea
          className="sequences-input"
          value={this.state.input}
          onChange={this.handleInput}
          wrap="off"
          placeholder="Enter list here"
        ></textarea>
        <div className="result-container">
          <br />
          <div className="result" id="result-element">
            {this.state.result}
          </div>
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
