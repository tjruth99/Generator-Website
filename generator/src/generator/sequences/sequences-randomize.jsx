import React from "react";

import { Button, Collapse, Form } from "react-bootstrap";

import "../generator.css";

class SequencesRandomize extends React.Component {
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

  randomizeSequence() {
    var array = this.state.input.split(/\r?\n/);

    var shuffle = array.length,
      temp,
      index;

    // Shuffle the list using the Fisher-Yates shuffle
    while (shuffle) {
      index = Math.floor(Math.random() * shuffle--);

      temp = array[shuffle];
      array[shuffle] = array[index];
      array[index] = temp;
    }

    // TODO: Format array to a usable output
    this.setState({
      result: array,
    });
  }

  render() {
    return (
      <>
        <h1>Randomize Sequence</h1>
        <p>Randomize a list</p>
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
