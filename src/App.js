import React, { Component } from "react";
import axios from "axios";
import Header from "./Header.js";
import Map from "./Map.js";
import Main from "./Main.js";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityValue: "",
      mapValue: "",
    };
  }

  handleClick = async (e) => {
    try {
      e.preventDefault();
      await this.handleCoordinates();
      this.handleMap();
    } catch (error) {
      this.setState({ error: true });
    }
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ cityValue: e.target.value });
    this.setState({ mapValue: e.target.value });
  };

  handleCoordinates = async () => {
    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_EXPLORER_KEY}&q=${this.state.cityValue}&format=json`;

    let response = await axios.get(url);
    this.setState({ location: response.data[0] });
  };

  handleMap = async () => {
    const map = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_EXPLORER_KEY}&center=${this.state.location.lat},${this.state.location.lon}&zoom=15`;

    let response = await axios.get(map);
    this.setState({ mapValue: response });
  };

  render() {
    return (
      <div>
        <Header />
        <Main
          handleClick={this.handleClick}
          handleChange={this.handleChange}
          cityValue={this.state.cityValue}
        />
        <Map mapValue={this.state.mapValue} />
      </div>
    );
  }
}
