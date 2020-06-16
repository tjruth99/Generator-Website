import React from "react";

import { Button, Collapse } from "react-bootstrap";

import "../generator.css";

class SequencesElement extends React.Component {
  constructor() {
    super();
    this.state = { input: "", result: "", resultShow: false };
  }

  handleInput = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  getRandomElement() {
    if (this.state.input.length > 0) {
      let array = this.state.input.split(/\r?\n/);
      let index = Math.floor(Math.random() * array.length);

      this.setState({
        result: array[index],
        resultShow: true,
      });
    } else {
      this.setState({
        result: "",
        resultShow: false,
      });
    }
  }

  render() {
    return (
      <>
        <h1>Random Element</h1>
        <p className="description-text">
          Give a list of words or phrases separated on a new line and hit
          generate to get a random element from the list
        </p>
        <div className="result-background">
          <textarea
            className="sequences-input"
            value={this.state.input}
            onChange={this.handleInput}
            wrap="off"
            placeholder="Enter list here"
          ></textarea>
          <div className="result-container">
            <br />
            <Collapse in={this.state.resultShow} fluid>
              <div className="result" id="result-string">
                {this.state.result}
              </div>
            </Collapse>
          </div>
        </div>
        <Button
          className="generate-button"
          size="lg"
          onClick={() => this.getRandomElement()}
        >
          Generate
        </Button>
        <br />
      </>
    );
  }
}

export default SequencesElement;
