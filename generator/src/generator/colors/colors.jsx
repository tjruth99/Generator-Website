import React from "react";

class Colors extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <>
        <h1>Colors</h1>
        <p>
          Generate a random color or a color palatte. Choose from different
          palattes to customize the feel.
        </p>
      </>
    );
  }
}

export default Colors;
