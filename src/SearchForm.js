import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: "",
    };
  }

  handleChange = (e) => {
    this.setState({ cityName: e.target.value });
  };

  handleClick = () => {
    this.props.getLocation(this.state.cityName);
  };

  render() {
    return (
      <div>
        <Form>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>Search a city here!</Form.Label>
            <Form.Control
              onChange={this.handleChange}
              type="text"
              value={this.state.cityName}
            />
          </Form.Group>

          <Button onClick={this.handleClick} variant="primary">
            Explore!
          </Button>
        </Form>
      </div>
    );
  }
}
