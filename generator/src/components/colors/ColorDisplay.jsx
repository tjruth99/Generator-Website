import React from "react";

import { OverlayTrigger, Tooltip } from "react-bootstrap";

import * as Colors from "./color_functions.js";

import "../generator.css";

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
              {Colors.HexToRGB(this.state.hex)}
              <br />
              {Colors.HexToHSL(this.state.hex)}
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

export default ColorDisplay;
