import React from "react";

import { Button, Form, Collapse, Col, Row } from "react-bootstrap";

import "../generator.css";

let separatorList = [
  { name: "NewLine", separator: /\r?\n/, build: "\n" },
  { name: "Space", separator: / /, build: " " },
  { name: "Comma", separator: /,/, build: "," },
  { name: "Period", separator: /\./, build: "." },
];

class SequencesRandomize extends React.Component {
  constructor() {
    super();
    this.state = {
      input: "",
      result: "",
      separator: /\r?\n/,
      rebuild: "\n",
      wrap: false,
      settingsShow: false,
    };
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

  handleSeparatorChange = (event) => {
    let selected = event.target.value;
    let s = -1;

    for (var i = 0; i < separatorList.length; i++) {
      if (selected === separatorList[i].name) {
        s = i;
      }
    }

    this.setState({
      separator: separatorList[s].separator,
      rebuild: separatorList[s].build,
    });
  };

  handleWrapChange = (event) => {
    let w = this.state.wrap;
    this.setState({
      wrap: !w,
    });
  };

  randomizeSequence() {
    var array = this.state.input.split(this.state.separator);

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
      text = text.concat(element, this.state.rebuild);
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
        <p className="description-text">Randomize a list.</p>
        <div className="result-background">
          <textarea
            className="sequences-input"
            value={this.state.input}
            onChange={this.handleInput}
            wrap={this.state.wrap ? "on" : "off"}
            placeholder="Enter list here"
          ></textarea>
        </div>
        <br />
        <Button
          className="generate-button"
          size="lg"
          onClick={() => this.randomizeSequence()}
        >
          Generate
        </Button>
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
          <Collapse in={this.state.settingsShow}>
            <Form>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Separator Character
                </Form.Label>
                <Col>
                  <Form.Control
                    as="select"
                    onChange={this.handleSeparatorChange}
                  >
                    {separatorList.map((i) => (
                      <option key={i.name}>{i.name}</option>
                    ))}
                  </Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Col sm={3} />
                <Col sm={3}>
                  <Form.Check
                    inline
                    type="checkbox"
                    id="wrap-checkbox"
                    label="Enable Word Wrap"
                    onChange={this.handleWrapChange}
                  />
                </Col>
              </Form.Group>
            </Form>
          </Collapse>
        </div>
      </>
    );
  }
}

export default SequencesRandomize;
