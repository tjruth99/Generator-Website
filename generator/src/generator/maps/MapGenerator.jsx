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

  handleRandomWalkChange = (event) => {
    let settings = this.state.randomWalkSettings;
    let newValue = event.target.value;

    if (event.target.id === "n") {
      if (newValue > 1000) {
        newValue = 1000;
      }
      settings.n = parseInt(newValue);
    } else if (event.target.id === "steps") {
      if (newValue > 1000000) {
        newValue = 1000000;
      }
      settings.steps = parseInt(newValue);
    } else if (event.target.id === "ranges") {
      if (newValue > 1000) {
        newValue = 1000;
      }
      settings.ranges = parseInt(newValue);
    } else if (event.target.id === "rangeLength") {
      if (newValue > 1000) {
        newValue = 1000;
      }
      settings.rangeLength = parseInt(newValue);
    } else if (event.target.id === "brush") {
      if (newValue > 3) {
        newValue = 3;
      } else if (newValue < 1) {
        newValue = 1;
      }
      settings.brush = parseInt(newValue);
    }

    this.setState({ randomWalkSettings: settings });
  };

  handleMapTypeChange = (event) => {
    let t = 0;
    if (event.target.value === mapTypes[1]) {
      t = 1;
    }
    this.setState({ mapType: t });
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

              <Collapse in={this.state.mapType === 0}>
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
              <Collapse in={this.state.mapType === 1}>
                <Form>
                  <Form.Group as={Row}>
                    <Form.Label column sm={3}>
                      Size of map:
                    </Form.Label>
                    <Col>
                      <Form.Control
                        type="number"
                        id="n"
                        value={this.state.randomWalkSettings.n}
                        onChange={this.handleRandomWalkChange}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm={3}>
                      Number of steps to walk:
                    </Form.Label>
                    <Col>
                      <Form.Control
                        type="number"
                        id="steps"
                        value={this.state.randomWalkSettings.steps}
                        onChange={this.handleRandomWalkChange}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm={3}>
                      Number of mountain ranges:
                    </Form.Label>
                    <Col>
                      <Form.Control
                        type="number"
                        id="ranges"
                        value={this.state.randomWalkSettings.ranges}
                        onChange={this.handleRandomWalkChange}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm={3}>
                      Maximum size of a mountain range:
                    </Form.Label>
                    <Col>
                      <Form.Control
                        type="number"
                        id="rangeLength"
                        value={this.state.randomWalkSettings.rangeLength}
                        onChange={this.handleRandomWalkChange}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm={3}>
                      Thickness of brush to draw the map
                    </Form.Label>
                    <Col>
                      <Form.Control
                        type="number"
                        id="brush"
                        value={this.state.randomWalkSettings.brush}
                        onChange={this.handleRandomWalkChange}
                      />
                    </Col>
                  </Form.Group>
                </Form>
              </Collapse>
            </Form>
          </Collapse>
        </div>
      </>
    );
  }
}

export default MapGenerator;
