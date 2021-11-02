import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default class Main extends Component {
  render() {
    return (
      <div>
        <Form onchange={this.props.handleChange} value={this.props.cityValue}>
          <Form.Group className="mb-3">
            <Form.Label>Enter City</Form.Label>
            <Form.Control type="text" placeholder="Enter city" />
            <Form.Text className="text-muted">
              Find any city with a click of a button.
            </Form.Text>
          </Form.Group>
          <Button
            onClick={this.props.handleClick}
            variant="secondary"
            type="click"
          >
            Explore!
          </Button>
        </Form>
        {this.props.location && <h1>{this.props.location.display_name}</h1>}
      </div>
    );
  }
}
