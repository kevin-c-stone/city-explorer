import { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class DisplayModal extends Component {
  thisClick = () => {
    this.props.hideError();
  };

  render() {
    return (
      <>
        <Modal show={this.props.error} onHide={this.props.hideError}>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>AN ERROR HAS OCCURED</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>{this.props.errorMessage}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.thisClick} variant="secondary">
                Close
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal>
      </>
    );
  }
}

export default DisplayModal;
