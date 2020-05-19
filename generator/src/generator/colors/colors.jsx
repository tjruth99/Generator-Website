import React from "react";

import { Button, Collapse, Form } from "react-bootstrap";

import "../generator.css";

class ColorDisplay extends React.Component {
  constructor() {
    super();
    this.state = { hex: "#000000" };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.hex !== this.props.hex) {
      this.setState({
        hex: this.props.hex,
      });
    }
  }

  render() {
    return (
      <>
        <div id="colorResult" style={{ background: this.state.hex }}></div>
      </>
    );
  }
}

class Colors extends React.Component {
  constructor() {
    super();
    this.state = {
      red: 0,
      green: 0,
      blue: 0,
      hex: "#000000",
      numberOfColors: 1,
      colors: ["#000000"],
      settingsShow: false,
    };
  }

  setSettingsShow = (visibility) => {
    this.setState({
      settingsShow: visibility,
    });
  };

  generateColor() {
    var newColors = [];

    for (var i = 0; i < this.state.numberOfColors; i++) {
      let red = Math.floor(Math.random() * 256);
      let green = Math.floor(Math.random() * 256);
      let blue = Math.floor(Math.random() * 256);

      var redHex = red.toString(16);
      console.log(redHex);
      if (redHex.length < 2) {
        redHex = "0" + redHex;
      }

      var greenHex = green.toString(16);
      if (greenHex.length < 2) {
        greenHex = "0" + greenHex;
      }

      var blueHex = blue.toString(16);
      if (blueHex.length < 2) {
        blueHex = "0" + blueHex;
      }

      var newHex = "#";
      newHex = newHex.concat(redHex, greenHex, blueHex).toUpperCase();

      newColors.push(newHex);

      this.setState({
        red: red,
        green: green,
        blue: blue,
        hex: newHex,
      });
    }

    this.setState({
      colors: newColors,
    });
  }

  render() {
    return (
      <>
        <h1>Colors</h1>
        <p>
          Generate a random color or a color palette. Choose from different
          palettes to customize the feel.
        </p>

        <div className="resultContainer">
          <div className="result">
            {this.state.colors.map((item) => (
              <ColorDisplay hex={item} />
            ))}

            {/* <ColorDisplay hex={this.state.hex} />*/}
            <p id="colorNumResult">
              <b>
                R: {this.state.red} G: {this.state.green} B: {this.state.blue}
              </b>
              <br />
              <b>Hex: {this.state.hex}</b>
            </p>
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
          <Collapse in={this.state.settingsShow} fluid>
            <Form></Form>
          </Collapse>
        </div>
      </>
    );
  }
}

export default Colors;
