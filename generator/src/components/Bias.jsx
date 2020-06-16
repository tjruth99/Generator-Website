import React from "react";

import {} from "react-bootstrap";

class Cell extends React.Component {
  constructor() {
    super();
    this.state = { hex: "#ffffff" };
  }

  componentDidMount = () => {
    let h = 0;
    let s = 0;
    let l = this.props.value * 100;

    let hex = this.HSLtoHex(h, s, l);

    this.setState({ hex: hex });
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

  render() {
    return (
      <>
        <div className="bias-cell" style={{ background: this.state.hex }}></div>
      </>
    );
  }
}

class Bias extends React.Component {
  constructor() {
    super();
    this.state = { bias: [], num: 0 };
  }

  componentDidMount = () => {
    console.log(window.innerWidth);
    let width = Math.ceil(window.innerWidth / 25);
    let height = Math.ceil(window.innerHeight / 25);

    let numOfBias = width * height;

    console.log(numOfBias);

    let b = [];
    for (let i = 0; i < numOfBias; i++) {
      b[i] = Math.random();
    }

    this.setState({ bias: b, num: numOfBias });
  };

  render() {
    return (
      <>
        <p>
          Here are {this.state.num} randomly generated numbers to show if there
          is any bias in the number generator
        </p>
        <p>Perfectly random numbers will show up as random noise</p>
        <p>
          Any noticeable pattern is evidence that the random function being used
          is not totally random
        </p>
        <div className="bias-container">
          {this.state.bias.map((o) => (
            <Cell value={o} />
          ))}
        </div>
      </>
    );
  }
}

export default Bias;
