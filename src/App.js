import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Main from "./Main";
import Header from "./Header";
import Footer from "./Footer";
import Card from "react-bootstrap/Card";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: "",
      error: false,
      errorMessage: "",
      location: {},
      forecast: [],
    };
  }
  handleChange = (e) => {
    e.preventDefault();
    this.setState({ cityName: e.target.value });
  };

  hideError = () => {
    this.setState({ error: false });
  };

  handleClick = async (e) => {
    e.preventDefault();
    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_EXPLORER_KEY}&q=${this.state.cityName}&format=json`;
    console.log(this.state.cityName);
    try {
      let response = await axios.get(url);
      this.setState({ location: response.data[0] });
    } catch (e) {
      this.setState({ error: true });
      let modifiedResponse = e.response.status;
      this.setState({ errorMessage: modifiedResponse });
      console.log(e.response);
      console.log(this.state.errorMessage);
    }
  };

  requestForecast = async () => {
    let cityName = this.state.cityName;
    try {
      let url = `http://localhost:3001/weather?city_name=${cityName}&lat=${this.state.location.lat}&lon=${this.state.location.lon}`;
      let response = await axios.get(url);
      let forecastData = response.data;
      this.setState({ forecast: forecastData });
    } catch (e) {
      if (e) {
        let modifiedResponse = e.response.status;
        this.setState({ error: true });
        this.setState({ errorStatus: modifiedResponse });
      }
    }
  };

  render() {
    return (
      <>
        <Header />
        <Main
          handleClick={this.handleClick}
          handleChange={this.handleChange}
          cityName={this.state.cityName}
          location={this.location}
          error={this.state.error}
          hideError={this.hideError}
          errorMessage={this.state.errorMessage}
        ></Main>

        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Img
              src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_EXPLORER_KEY}&center=${this.state.location.lat},${this.state.location.lon}&zoom=14`}
            />
            <Card.Title>
              <h1>{this.state.location.display_name}</h1>
            </Card.Title>
            <Card.Text>
              <p>
                Latitude:{this.state.location.lat} Longitude:
                {this.state.location.lon}
              </p>
            </Card.Text>
          </Card.Body>
        </Card>
        <Button variant="secondary" onClick={this.requestForecast}>
          View Forecast
        </Button>
        <div>
          {this.state.forecast.map((element) => {
            return (
              <p>
                {element.date} , {element.description}
              </p>
            );
          })}
        </div>
        <Footer />
      </>
    );
  }
}

export default App;
