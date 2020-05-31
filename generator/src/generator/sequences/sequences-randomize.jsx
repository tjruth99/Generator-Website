import React from "react";

import { Button } from "react-bootstrap";

import "../generator.css";

class SequencesRandomize extends React.Component {
  constructor() {
    super();
    this.state = { input: "", result: "" };
  }

  handleInput = (event) => {
    this.setState({
      input: event.target.value,
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

    var text = "";

    array.forEach((element) => {
      text = text.concat(element, "\n");
    });

    this.setState({
      // Slice the extra newline from the end of the output
      input: text.slice(0, text.length - 1),
    });
  }

  render() {
    return (
      <>
        <h1>Randomize Sequence</h1>
        <p className="description-text">Randomize a list</p>
        <textarea
          className="sequences-input"
          value={this.state.input}
          onChange={this.handleInput}
          wrap="off"
          placeholder="Enter list here"
        ></textarea>
        <br />
        <Button onClick={() => this.randomizeSequence()}>Generate</Button>
        <br />
      </>
    );
  }
}

export default SequencesRandomize;
