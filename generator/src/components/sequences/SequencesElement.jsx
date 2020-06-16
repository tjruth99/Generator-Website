import React from "react";

import { Button, Collapse, Form, Row, Col } from "react-bootstrap";

import "../generator.css";

let separatorList = [
  { name: "NewLine", separator: /\r?\n/, build: "\n" },
  { name: "Space", separator: / /, build: " " },
  { name: "Comma", separator: /,/, build: "," },
  { name: "Period", separator: /\./, build: "." },
];

class SequencesElement extends React.Component {
  constructor() {
    super();
    this.state = {
      input: "",
      result: "",
      separator: /\r?\n/,
      wrap: false,
      settingsShow: false,
      resultShow: false,
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

  getRandomElement() {
    if (this.state.input.length > 0) {
      let array = this.state.input.split(this.state.separator);
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
          Give a list of words or phrases and hit generate to get a random
          element from the list.
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

export default SequencesElement;
