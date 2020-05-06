import { useEffect, Component } from "react";
import { withRouter, useRouter } from "next/router";


import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      modal: false,

    };
  }


  render() {
    return (

        <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
          <ModalHeader toggle={this.props.toggle}>{this.props.header}</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for={this.props.name}>{this.props.labelName}</Label>
                <Input
                  type="input"
                  name={this.props.name}
                  id={this.props.id}
                  placeholder={this.props.placeholder}
                  value={this.props.value}
                  onChange={this.props.onChange}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color={this.props.color} onClick={this.props.onClick}>
            {this.props.buttonName}
            </Button>{" "}
            <Button color="secondary" onClick={this.props.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

    );
  }
}
export default withRouter(Quiz);
