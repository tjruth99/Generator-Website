import React from "react";

import {
  Button,
  Col,
  Collapse,
  Form,
  OverlayTrigger,
  Tooltip,
  Row,
} from "react-bootstrap";

import "../generator.css";

let paletteList = [
  "None (Completely Random)",
  "Selected Saturation (One Hue)",
  "Complementary (Two Hues)",
  "Triadic (Three Hues)",
  "Neon",
  "Pastel",
];

class ColorDisplay extends React.Component {
  constructor() {
    super();
    this.state = { hex: "#000000", show: true, animate: false };
  }

  componentDidMount() {
    this.setState({
      hex: this.props.hex,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.hex !== this.props.hex) {
      this.setState({
        animate: true,
        hex: this.props.hex,
      });
    }
  }

  HexToHSL() {
    var r = parseInt(this.state.hex.substring(1, 3), 16);
    var g = parseInt(this.state.hex.substring(3, 5), 16);
    var b = parseInt(this.state.hex.substring(5, 7), 16);

    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

    if (delta === 0) h = 0;
    else if (cmax === r) h = ((g - b) / delta) % 6;
    else if (cmax === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0) h += 360;

    l = (cmax + cmin) / 2;
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = Math.floor(s * 100);
    l = Math.floor(l * 100);

    return "hsl(" + h + ", " + s + "%, " + l + "%)";
  }

  HexToRGB() {
    var r = parseInt(this.state.hex.substring(1, 3), 16);
    var g = parseInt(this.state.hex.substring(3, 5), 16);
    var b = parseInt(this.state.hex.substring(5, 7), 16);
    return "R: " + r + " G: " + g + " B: " + b;
  }

  render() {
    return (
      <>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 100, hide: 500 }}
          overlay={
            <Tooltip id="tooltip-color">
              {this.state.hex}
              <br />
              {this.HexToRGB()}
              <br />
              {this.HexToHSL()}
            </Tooltip>
          }
        >
          <div
            id="result-color"
            className={
              this.state.show
                ? "result-color-animation-show"
                : this.state.animate
                ? "result-color-animation-change"
                : ""
            }
            style={{ background: this.state.hex }}
            onAnimationEnd={() =>
              this.setState({ show: false, animate: false })
            }
          ></div>
        </OverlayTrigger>
      </>
    );
  }
}

class Colors extends React.Component {
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
    if (newSize < 1) {
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

  RGBtoHex(r, g, b) {
    var redHex = r.toString(16);
    if (redHex.length < 2) {
      redHex = "0" + redHex;
    }

    var greenHex = g.toString(16);
    if (greenHex.length < 2) {
      greenHex = "0" + greenHex;
    }

    var blueHex = b.toString(16);
    if (blueHex.length < 2) {
      blueHex = "0" + blueHex;
    }

    var hex = "#";
    return hex.concat(redHex, greenHex, blueHex).toUpperCase();
  }

  HSLtoHex(h, s, l) {
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
      m = l - c / 2,
      r = 0,
      g = 0,
      b = 0;

    if (0 <= h && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (60 <= h && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (120 <= h && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (180 <= h && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (240 <= h && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (300 <= h && h < 360) {
      r = c;
      g = 0;
      b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return this.RGBtoHex(r, g, b);
  }

  generateRandomColor() {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);

    return this.RGBtoHex(red, green, blue);
  }

  generateSingleHue(h, range, min) {
    let hue = Math.floor(Math.random() * 10) + (h - 5);
    let saturation = Math.floor(Math.random() * range) + min;
    let lightness = Math.floor(Math.random() * range) + min;

    return this.HSLtoHex(hue, saturation, lightness);
  }

  generateNeon() {
    let hue = Math.floor(Math.random() * 360);
    let saturation = Math.floor(Math.random() * 10) + 90;
    let lightness = 50;

    return this.HSLtoHex(hue, saturation, lightness);
  }

  generatePastel() {
    let hue = Math.floor(Math.random() * 360);
    let saturation = Math.floor(Math.random() * 20) + 80;
    let lightness = Math.floor(Math.random() * 25) + 75;

    return this.HSLtoHex(hue, saturation, lightness);
  }

  generateColor() {
    var newColors = [];
    let rH = Math.floor(Math.random() * 360);

    for (var i = 0; i < this.state.size; i++) {
      var hex = "";

      switch (this.state.paletteType) {
        case 0:
          // Completely Random Case
          hex = this.generateRandomColor();
          break;
        case 1:
          // One hue
          hex = this.generateSingleHue(rH, 100, 0);
          break;
        case 2:
          // Two Hues
          hex = this.generateSingleHue(
            (rH + (360 / 2) * (i % 2)) % 360,
            50,
            25
          );
          break;
        case 3:
          // Three hues
          hex = this.generateSingleHue(
            (rH + (360 / 3) * (i % 3)) % 360,
            50,
            25
          );
          break;
        case 4:
          // Neon
          hex = this.generateNeon();
          break;
        case 5:
          // Pastel
          hex = this.generatePastel();
          break;
        default:
          hex = this.generateRandomColor();
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
        <p>
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

export default Colors;
