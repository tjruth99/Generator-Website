import React from "react";

import { Button, Collapse, Form, Row, Col } from "react-bootstrap";

import "../generator.css";

class DungeonGenerator extends React.Component {
  constructor() {
    super();
    this.state = {
      image: null,
      settings: { cells: 5, ignore: 25 },
      settingsShow: false,
    };
  }

  handleSettingsChange = (event) => {
    let s = this.state.settings;
    let newValue = parseInt(event.target.value);

    if (event.target.id === "cells") {
      if (newValue < 2) {
        newValue = 2;
      } else if (newValue > 15) {
        newValue = 15;
      }

      s.cells = parseInt(newValue);
    } else if (event.target.id === "ignore") {
      if (newValue > 100) {
        newValue = 100;
      } else if (newValue < 0) {
        newValue = 0;
      }

      s.ignore = parseInt(newValue);
    }

    console.log(s);
    this.setState({
      settings: s,
    });
  };

  setSettingsShow = (visibility) => {
    this.setState({
      settingsShow: visibility,
    });
  };

  generateDungeon() {
    let settings = this.state.settings;
    fetch("http://127.0.0.1:5000/dungeon", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        mode: "cors",
      },
      body: JSON.stringify(settings),
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
        <div className="result-background">
          <div className="result-container">
            {this.state.image === null ? (
              <div className="result" id="result-string">
                Press Generate
              </div>
            ) : (
              <img src={this.state.image} alt="map" id="result-image" />
            )}
          </div>
        </div>

        <Button
          className="generate-button"
          size="lg"
          onClick={() => this.generateDungeon()}
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
          <Collapse in={this.state.settingsShow} fluid>
            <Form>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Size of dungeon:
                </Form.Label>
                <Col>
                  <Form.Control
                    type="number"
                    id="cells"
                    value={this.state.settings.cells}
                    onChange={this.handleSettingsChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Percent chance to remove a room:
                </Form.Label>
                <Col>
                  <Form.Control
                    type="number"
                    id="ignore"
                    value={this.state.settings.ignore}
                    onChange={this.handleSettingsChange}
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
