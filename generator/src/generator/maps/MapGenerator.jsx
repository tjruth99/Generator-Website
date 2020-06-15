import React from "react";

import { Button, Collapse, Form, Row, Col } from "react-bootstrap";

import "../generator.css";

const mapTypes = ["Perlin Noise", "Random Walk"];

class MapGenerator extends React.Component {
  constructor() {
    super();
    this.state = {
      image: null,
      mapType: 0,
      perlinNoiseSettings: { scale: 100, octaves: 5 },
      randomWalkSettings: {
        n: 250,
        steps: 25000,
        ranges: 0,
        rangeLength: 0,
        island: 0.0,
        brush: 2,
      },
      settingsShow: false,
    };
  }

  handlePerlinSettingsChange = (event) => {
    let settings = this.state.perlinNoiseSettings;
    let newValue = event.target.value;

    if (event.target.id === "scale") {
      if (newValue < 10) {
        newValue = 10;
      } else if (newValue > 500) {
        newValue = 500;
      }

      settings.scale = parseInt(newValue);
    } else if (event.target.id === "octaves") {
      if (newValue < 1) {
        newValue = 1;
      } else if (newValue > 10) {
        newValue = 10;
      }

      settings.octaves = parseInt(newValue);
    }

    this.setState({ perlinNoiseSettings: settings });
  };

  setSettingsShow = (visibility) => {
    this.setState({
      settingsShow: visibility,
    });
  };

  generatePerlinNoise() {
    let settings = this.state.perlinNoiseSettings;
    fetch("http://127.0.0.1:5000/perlin_noise", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        mode: "cors",
      },
      body: JSON.stringify(settings),
    })
      .then((response) => {
        console.log(response);
        return response.blob();
      })
      .then((data) => {
        let imgUrl = URL.createObjectURL(data);
        console.log(imgUrl);
        this.setState({ image: imgUrl });
      })
      .catch((error) => {
        console.log(error);
        alert("Server Timeout");
      });
  }

  generateRandomWalk() {
    let settings = this.state.randomWalkSettings;
    fetch("http://127.0.0.1:5000/random_walk", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        mode: "cors",
      },
      body: JSON.stringify(settings),
    })
      .then((response) => {
        console.log(response);
        return response.blob();
      })
      .then((data) => {
        let imgUrl = URL.createObjectURL(data);
        console.log(imgUrl);
        this.setState({ image: imgUrl });
      })
      .catch((error) => {
        console.log(error);
        alert("Server Timeout");
      });
  }

  generateMap() {
    this.state.mapType === 0
      ? this.generatePerlinNoise()
      : this.generateRandomWalk();
  }

  render() {
    return (
      <>
        <h1>Map Generator</h1>
        <p className="description-text">
          Get a random topological map. Choose between Perlin Noise, which gives
          a smooth transition between different elevations, or a random walk
          which generates more variable continents
        </p>
        <div className="result-container">
          {this.state.image === null ? (
            <div id="result-string">Press Generate</div>
          ) : (
            <img src={this.state.image} alt="map" id="result-image" />
          )}
        </div>

        <Button onClick={() => this.generateMap()}>Generate</Button>
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
                  Which map type to generate?
                </Form.Label>
                <Col>
                  <Form.Control as="select" onChange={this.handleMapTypeChange}>
                    {mapTypes.map((i) => (
                      <option key={i}>{i}</option>
                    ))}
                  </Form.Control>
                </Col>
              </Form.Group>
              {/* Form for Perlin Noise Settings*/}

              <Collapse in={true}>
                <Form>
                  <Form.Group as={Row}>
                    <Form.Label column sm={3}>
                      Map Scale:
                    </Form.Label>
                    <Col>
                      <Form.Control
                        type="number"
                        id="scale"
                        value={this.state.perlinNoiseSettings.scale}
                        onChange={this.handlePerlinSettingsChange}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm={3}>
                      Level of Detail:
                    </Form.Label>
                    <Col>
                      <Form.Control
                        type="number"
                        id="octaves"
                        value={this.state.perlinNoiseSettings.octaves}
                        onChange={this.handlePerlinSettingsChange}
                      />
                    </Col>
                  </Form.Group>
                </Form>
              </Collapse>

              {/* Form for Random Walk Settings*/}
            </Form>
          </Collapse>
        </div>
      </>
    );
  }
}

export default MapGenerator;
