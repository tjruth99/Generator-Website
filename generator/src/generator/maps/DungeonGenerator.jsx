import React from "react";

import { Button, Collapse, Form } from "react-bootstrap";

import "../generator.css";

class DungeonGenerator extends React.Component {
  constructor() {
    super();
    this.state = { image: null, settingsShow: false };
  }

  setSettingsShow = (visibility) => {
    this.setState({
      settingsShow: visibility,
    });
  };

  generateTemplate() {
    fetch("http://127.0.0.1:5000/dungeon", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        mode: "cors",
      },
      body: JSON.stringify({
        cells: 5,
      }),
    })
      .then((response) => {
        console.log(response);
        return response.blob();
      })
      .then((data) => {
        let imgUrl = URL.createObjectURL(data);
        console.log(imgUrl);
        this.setState({ image: imgUrl });
      });
  }

  render() {
    return (
      <>
        <h1>Dungeon Generator</h1>
        <p className="description-text">Get a random dungeon map</p>
        <div className="result-container">
          <img src={this.state.image} alt="map" />
        </div>

        <Button onClick={() => this.generateTemplate()}>Generate</Button>
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

export default DungeonGenerator;
