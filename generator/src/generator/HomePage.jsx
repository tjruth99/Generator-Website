import React from "react";

import { Button, Card, CardColumns } from "react-bootstrap";

import { Link } from "react-router-dom";

const listOfGenerators = [
  {
    name: "Number",
    link: "/numbers",
    description: "Generate a set of numbers",
  },
  {
    name: "Color",
    link: "/colors",
    description: "Generate a color palette",
  },
  {
    name: "Element",
    link: "/sequences/element",
    description: "Generate a random element from a list",
  },
  {
    name: "Shuffle",
    link: "/sequences/randomize",
    description: "Get a random element from a list",
  },
  {
    name: "String",
    link: "/words/string",
    description: "Generate a series of alphanumeric strings",
  },
  {
    name: "Name",
    link: "/words/name",
    description: "Generate a name",
  },
];

const GeneratorCard = (input) => {
  let item = input.obj;

  return (
    <Card className="home-card" border="secondary" bg="dark">
      <Card.Header>
        <Card.Title>{item.name} Generator</Card.Title>
      </Card.Header>
      <Card.Body>{item.description}</Card.Body>
      <Button
        as={Link}
        to={item.link}
        variant="secondary"
        id="home-card-footer"
      >
        Goto Page
      </Button>
    </Card>
  );
};

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <>
        <div className="card-container">
          <CardColumns>
            {listOfGenerators.map((gen) => (
              <GeneratorCard obj={gen} />
            ))}
          </CardColumns>
        </div>
        <br />
        Last Updated: 5/29/2020 1:52 AM
      </>
    );
  }
}

export default HomePage;
