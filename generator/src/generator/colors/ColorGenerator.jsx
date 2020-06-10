import React from "react";

import { Button, Col, Collapse, Form, Row } from "react-bootstrap";

import ColorDisplay from "./ColorDisplay.jsx";
import * as Colors from "./color_functions.js";

import "../generator.css";

let paletteList = [
  "None (Completely Random)",
  "Selected Saturation (One Hue)",
  "Complementary (Two Hues)",
  "Triadic (Three Hues)",
  "Neon",
  "Pastel",
];

const MAX_SIZE = 100;

class ColorGenerator extends React.Component {
  constructor() {
    super();
    this.state = {
      size: 1,
      paletteType: 0,
      colors: ["#000000"],
      settingsShow: false,
    };
  }

  handleSizeChange = (event) => {
    var newSize = parseInt(event.target.value);
    if (newSize > MAX_SIZE) {
      newSize = MAX_SIZE;
    } else if (newSize < 1) {
      newSize = 1;
    }

    this.setState({
      size: newSize,
    });
  };

  handlePaletteChange = (event) => {
    let selected = event.target.value;
    var type = -1;
    for (var i = 0; i < paletteList.length; i++) {
      if (selected === paletteList[i]) {
        type = i;
      }
    }

    this.setState({
      paletteType: type,
    });
  };

  setSettingsShow = (visibility) => {
    this.setState({
      settingsShow: visibility,
    });
  };

  generateColor() {
    var newColors = [];
    let rH = Math.floor(Math.random() * 360);

    for (var i = 0; i < this.state.size; i++) {
      var hex = "";

      switch (this.state.paletteType) {
        case 0:
          // Completely Random Case
          hex = Colors.generateRandomColor();
          break;
        case 1:
          // One hue
          hex = Colors.generateSingleHue(rH, 100, 0);
          break;
        case 2:
          // Two Hues
          hex = Colors.generateSingleHue(
            (rH + (360 / 2) * (i % 2)) % 360,
            50,
            25
          );
          break;
        case 3:
          // Three hues
          hex = Colors.generateSingleHue(
            (rH + (360 / 3) * (i % 3)) % 360,
            50,
            25
          );
          break;
        case 4:
          // Neon
          hex = Colors.generateNeon();
          break;
        case 5:
          // Pastel
          hex = Colors.generatePastel();
          break;
        default:
          hex = Colors.generateRandomColor();
      }

      newColors.push(hex);
    }

    this.setState({
      colors: newColors,
    });
  }

  render() {
    return (
      <>
        <h1>Colors</h1>
        <p className="description-text">
          Generate a random color or a color palette. Choose from different
          palettes to customize the feel. Hover over a color to see it's color
          code.
        </p>

        <div className="result-container">
          <div className="result">
            {this.state.colors.map((item) => (
              <ColorDisplay hex={item} />
            ))}
          </div>
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
          <Collapse in={this.state.settingsShow}>
            <Form>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Number of Colors to Generate:
                </Form.Label>
                <Col>
                  <Form.Control
                    type="number"
                    value={this.state.size}
                    onChange={this.handleSizeChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Palette Type:
                </Form.Label>
                <Col>
                  <Form.Control as="select" onChange={this.handlePaletteChange}>
                    {paletteList.map((i) => (
                      <option key={i}>{i}</option>
                    ))}
                  </Form.Control>
                </Col>
              </Form.Group>
            </Form>
          </Collapse>
        </div>
      </>
    );
  }
}

export default ColorGenerator;
