import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import {} from "bootstrap";

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="jumbotron">
          <h1 className="display-4">JUMBO TEXT</h1>
          <p className="lead">Neki neki</p>
          <hr className="my-4" />
          <p>Test text </p>
          <a className="btn btn-primary" href="#" role="button">
            Button
          </a>
        </div>
      </div>
    );
  }
}
export default App;
