import React, { Component } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityValue: "",
    };
  }

  handleClick = async () => {
    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_EXPLORER_KEY}&q=${this.state.cityValue}&format=json`;

    let response = await axios.get(url);
    this.setState({ location: response.data[0] });
  };

  handleChange = (e) => {
    this.setState({ cityValue: e.target.value });
  };

  render() {
    return (
      <div>
        <input onChange={this.handleChange} value={this.state.cityValue} />
        <p>{this.state.cityValue}</p>
        <Button variant="success" onClick={this.handleClick}>
          Explore!
        </Button>
        <ToastContainer>
          <Toast>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Bootstrap</strong>
              <small className="text-muted">just now</small>
            </Toast.Header>
            <Toast.Body>See? Just like this.</Toast.Body>
          </Toast>
          <Toast>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Bootstrap</strong>
              <small className="text-muted">2 seconds ago</small>
            </Toast.Header>
            <Toast.Body>Heads up, toasts will stack automatically</Toast.Body>
          </Toast>
        </ToastContainer>
        {this.state.location && <h1>{this.state.location.display_name}</h1>}
        {this.state.location && <h1>{this.state.location.lat}</h1>}
        {this.state.location && <h1>{this.state.location.lon}</h1>}
      </div>
    );
  }
}
