import React, { Component } from "react";
import axios from "axios";
import Header from "./Header.js";
import SearchForm from "./SearchForm.js";
import CityCard from "./CityCard.js";
import Alert from "react-bootstrap/Alert";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      location: {},
    };
  }

  getLocation = async (city) => {
    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_EXPLORER_KEY}&q=${city}&format=json`;

    try {
      let response = await axios.get(url);

      console.log(response.data[0]);
      this.setState({ location: response.data[0] }, this.getMapUrl);
    } catch (e) {
      console.error(e);
      this.setState({ error: true });
    }
  };

  getMapUrl = () => {
    let url = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_EXPLORER_KEY}&center=${this.state.location.lat},${this.state.location.lon}&zoom=13`;
    this.setState({
      location: { ...this.state.location, map: url },
    });
  };

  render() {
    return (
      <div>
        <Header />
        <SearchForm getLocation={this.getLocation} />
        {this.state.location.map && <CityCard location={this.state.location} />}
        {this.state.error && <Alert variant="danger">Error!!!</Alert>}
      </div>
    );
  }
}
