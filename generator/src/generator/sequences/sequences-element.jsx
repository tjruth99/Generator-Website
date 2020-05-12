import React from "react";

class SequencesElement extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <>
        <h1>Random Element</h1>
        <p>
          Give a list of words and we will select a random element from the
          list.
        </p>
      </>
    );
  }
}

export default SequencesElement;
