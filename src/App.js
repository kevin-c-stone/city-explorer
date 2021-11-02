import React, { Component } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";

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
    console.log(response.data[0]);
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
        {this.state.location && <h1>{this.state.location.display_name}</h1>}
      </div>
    );
  }
}
