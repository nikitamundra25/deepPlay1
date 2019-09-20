import React from "react";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal,
  FormFeedback,
  ModalBody,
  ModalHeader
} from "reactstrap";
import Validator from "js-object-validation";
import { ForgetPasswordValidations, ForgetPasswordValidationsMessaages } from "../../validations";
import { logger } from "helper/Logger";

// core components
class ForgotPasswordComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      errors: {}
    }
  }

  componentDidUpdate = ({ openForgotPasswordModel }) => {
    if (openForgotPasswordModel !== this.props.openForgotPasswordModel) {
      this.setState({
        email: "",
        errors: {}
      })
    }
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }
  handleForgotPasswardRequest = e => {
    e.preventDefault();
    this.setState({
      errors: {}
    });
    try {
      const { isValid, errors } = Validator(
        this.state,
        ForgetPasswordValidations,
        ForgetPasswordValidationsMessaages
      );
      if (!isValid) {
        this.setState({
          errors
        });
        return;
      }
      const { email } = this.state;
      this.props.forgotPasswordRequest({
        email
      });
    } catch (error) {
      logger(error);
    }
  }
  /*
  /* 
  */
  render() {
    const { openForgotPasswordModel, handleForgotPasswordModel, loginReducer } = this.props
    const { isSendingLink } = loginReducer
    const { email, errors } = this.state;
    return (
      <>
        <Modal
          className="modal-dialog-centered"
          size="sm"
          isOpen={openForgotPasswordModel}
          toggle={handleForgotPasswordModel}
          backdrop={"static"}
        >
          <ModalHeader toggle={handleForgotPasswordModel}>Forgot Password</ModalHeader>
          <ModalBody className="modal-body p-0">
            <Card className="bg-secondary shadow border-0">
              <CardBody className="px-lg-5">
                <Form onSubmit={this.handleForgotPasswardRequest}>
                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        className={errors.email ? "is-invalid" : ""}
                        onChange={this.handleChange}
                        name={"email"}
                        value={email}
                        type="text" />
                      <FormFeedback>
                        {errors.email ? errors.email : null}
                      </FormFeedback>
                    </InputGroup>
                  </FormGroup>
                  <div className="text-center">
                    <Button
                      className="my-4"
                      color="primary"
                      type="submit"
                      disabled={isSendingLink ? true : false}
                    >
                      {
                        isSendingLink ?
                          "Plaese Wait..." :
                          "Send Link"
                      }
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

export default ForgotPasswordComponent;
