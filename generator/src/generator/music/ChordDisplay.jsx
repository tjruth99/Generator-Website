import React from "react";

import { Tooltip, OverlayTrigger } from "react-bootstrap";

import * as music from "./music_functions.js";

import "../generator.css";

class ChordDisplay extends React.Component {
  constructor() {
    super();
    this.state = {
      root: 0,
      tonality: 0,
      name: "",
      notesInChord: "",
      is7th: false,
      show: true,
      animate: false,
    };
  }

  updateState() {
    let crdRoot = this.props.info.root,
      crdTonality = this.props.info.tonality,
      crdName = this.props.info.name,
      seventh = this.props.seventh;

    let arr = [];
    switch (crdTonality) {
      case 0: // major
        arr = music.getMajorNotes(crdRoot, this.state.is7th);
        break;
      case 1: // minor
        arr = music.getMinorNotes(crdRoot, this.state.is7th);
        break;
      case 2: // diminished
        arr = music.getDiminishedNotes(crdRoot, this.state.is7th);
        break;
      default:
        arr = music.getMajorNotes(crdRoot, this.state.is7th);
    }

    let noteString = "";

    arr.map((n) => (noteString = noteString.concat(n, ", ")));
    noteString = noteString.slice(0, noteString.length - 2);

    this.setState({
      root: crdRoot,
      tonality: crdTonality,
      name: crdName,
      notesInChord: noteString,
      is7th: seventh ? true : false,
    });
  }

  componentDidMount = () => {
    this.updateState();
  };

  componentDidUpdate(prevProps) {
    if (prevProps.info !== this.props.info) {
      this.updateState();
      this.setState({ animate: true });
    }
  }

  render() {
    return (
      <>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 100, hide: 500 }}
          overlay={
            <Tooltip id="tooltip-chord">
              Notes in chord: <br />
              {this.state.notesInChord}
            </Tooltip>
          }
        >
          <div
            id="result-chord"
            className={
              this.state.show
                ? "result-chord-animation-show"
                : this.state.animate
                ? "result-chord-animation-change"
                : ""
            }
            onAnimationEnd={() =>
              this.setState({ show: false, animate: false })
            }
          >
            {this.state.name}
          </div>
        </OverlayTrigger>
      </>
    );
  }
}

export default ChordDisplay;
