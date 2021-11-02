import React, { Component } from "react";

export default class Map extends Component {
  render() {
    return (
      <div>
        {this.props.mapValue && (
          <img id="map" src={this.props.mapValue.url} alt="Map"></img>
        )}
      </div>
    );
  }
}
