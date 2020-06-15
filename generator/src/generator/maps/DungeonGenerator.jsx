import React from "react";

import { Button, Collapse, Form, Row, Col } from "react-bootstrap";

import "../generator.css";

class DungeonGenerator extends React.Component {
  constructor() {
    super();
    this.state = { image: null, cells: 5, settingsShow: false };
  }

  handleCellsChange = (event) => {
    var newCells = parseInt(event.target.value);
    if (newCells < 2) {
      newCells = 2;
    } else if (newCells > 15) {
      newCells = 15;
    }

    this.setState({
      cells: newCells,
    });
  };

  setSettingsShow = (visibility) => {
    this.setState({
      settingsShow: visibility,
    });
  };

  generateDungeon() {
    let cellsToGenerate = this.state.cells;
    fetch("http://127.0.0.1:5000/dungeon", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        mode: "cors",
      },
      body: JSON.stringify({
        cells: cellsToGenerate,
      }),
    })
      .then((response) => {
        return response.blob();
      })
      .then((data) => {
        let imgUrl = URL.createObjectURL(data);
        this.setState({ image: imgUrl });
      })
      .catch((error) => {
        console.log(error);
        alert("Server Timeout");
      });
  }

  render() {
    return (
      <>
        <h1>Dungeon Generator</h1>
        <p className="description-text">Get a random dungeon map</p>
        <div className="result-container">
          {this.state.image === null ? (
            <div id="result-string">Press Generate</div>
          ) : (
            <img src={this.state.image} alt="map" id="result-image" />
          )}
        </div>

        <Button onClick={() => this.generateDungeon()}>Generate</Button>
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
            <Form>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Size of dungeon:
                </Form.Label>
                <Col>
                  <Form.Control
                    type="number"
                    value={this.state.cells}
                    onChange={this.handleCellsChange}
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

export default DungeonGenerator;
