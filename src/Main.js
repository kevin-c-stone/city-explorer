import { Component } from "react";
import FormLocation from "./FormLocation.js";
import ErrorModal from "./ErrorModal.js";

class Main extends Component {
  render() {
    return (
      <>
        <FormLocation
          handleClick={this.props.handleClick}
          handleChange={this.props.handleChange}
          cityName={this.props.cityName}
        ></FormLocation>

        <ErrorModal
          error={this.props.error}
          hideError={this.props.hideError}
          errorMessage={this.props.errorMessage}
        ></ErrorModal>
      </>
    );
  }
}

export default Main;
