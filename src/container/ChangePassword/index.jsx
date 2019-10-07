import React, { Component } from "react";
import { connect } from "react-redux";
import { FormGroup, Form, Input, Label, Row, Col, Button } from "reactstrap";
import {
  ChangePasswordValidations,
  ChangePasswordValidationsMessaages
} from "../../validations";
import { logger } from "../../helper/Logger";
import Validator from "js-object-validation";
import { changePasswordRequest } from "../../actions";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      errors: {}
    };
  }

  handleChange = e => {
    const { target } = e;
    const { value, name } = target;
    this.setState({
      [name]: value,
      errors: {
        ...this.state.errors,
        [name]: null
      }
    });
  };

  changePassword = e => {
    console.log("fgkfjgkf");

    e.preventDefault();
    this.setState({
      errors: {}
    });
    try {
      const { isValid, errors } = Validator(
        this.state,
        ChangePasswordValidations,
        ChangePasswordValidationsMessaages
      );
      if (!isValid) {
        this.setState({
          errors
        });
        return;
      }
      const { oldPassword, newPassword } = this.state;
      this.props.changePasswordRequest({
        oldPassword: oldPassword,
        newPassword: newPassword
      });
    } catch (error) {
      logger(error);
    }
  };

  render() {
    const { newPassword, oldPassword, confirmPassword, errors } = this.state;
    const { loginReducer } = this.props;
    const { isChangePasswordSuccess } = loginReducer;

    return (
      <div className="setting-section">
        <div className="page-body">
          <div className="content-header mb-3">
            <span className="content-title">CHANGE PASSWORD</span>
          </div>
          <Form
            className="form-wrap settingForm"
            onSubmit={this.changePassword}
          >
            <Row>
              <Col md="12">
                <FormGroup>
                  <Label for="oldPassword">
                    Old Password <span className="text-danger">*</span>
                  </Label>
                  <Input
                    value={oldPassword}
                    name="oldPassword"
                    onChange={this.handleChange}
                    placeholder="Old Password"
                    type="password"
                  />
                  {errors.oldPassword ? (
                    <p className="text-danger"> {errors.oldPassword}</p>
                  ) : null}
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <FormGroup>
                  <Label for="newPassword">
                    New Password <span className="text-danger">*</span>
                  </Label>
                  <Input
                    id="newPassword"
                    placeholder="New Password"
                    type="password"
                    onChange={this.handleChange}
                    value={newPassword}
                    name="newPassword"
                  />
                  {errors.newPassword ? (
                    <p className="text-danger"> {errors.newPassword}</p>
                  ) : null}
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <FormGroup>
                  <Label for="confirmPassword">
                    Confirm Password <span className="text-danger">*</span>
                  </Label>
                  <Input
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    type="password"
                    onChange={this.handleChange}
                    value={confirmPassword}
                    name="confirmPassword"
                  />
                  {errors.confirmPassword ? (
                    <p className="text-danger"> {errors.confirmPassword}</p>
                  ) : null}
                </FormGroup>
              </Col>
            </Row>
            <div className="text-center">
              <Button
                className="btn-black btn mt-3"
                color=""
                type="submit"
                disabled={isChangePasswordSuccess ? true : false}
              >
                {isChangePasswordSuccess ? "Please Wait..." : "Change Password"}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loginReducer: state.loginReducer
});

const mapDispatchToProps = dispatch => ({
  changePasswordRequest: data => {
    dispatch(changePasswordRequest(data));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassword);
