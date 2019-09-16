import React, { Component } from "react";
import { Button, FormGroup, Form, Input, Label, Row, Col } from "reactstrap";
import userProfile from "../../assets/img/icons/common/boy.svg";
class SettingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="col-md-12 col-sm-12 dashboard-right-wrap">
        <h1>Settings</h1>
        <div className="dashboard-right-profile">
          <h6>PROFILE </h6>
          <Button
            color="default"
            outline
            type="button"
            size="sm"
            className="btn-btn-right"
          >
            Edit Profile
          </Button>
        </div>
        <div className="user-profile">
          <div className="profileAvtar">
            <img alt="..." src={require("assets/img/icons/common/boy.svg")} />
          </div>
        </div>
        <div className="settingForm">
          <Form>
            <Row>
              <Col md="6">
                <FormGroup>
                  <Label for="firstName">First Name</Label>
                  <Input
                    id="exampleFormControlInput1"
                    placeholder="firstName"
                    type="text"
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label for="lastName">Last Name</Label>
                  <Input
                    id="exampleFormControlInput1"
                    placeholder="lastName"
                    type="text"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    id="exampleFormControlInput1"
                    placeholder="name@example.com"
                    type="email"
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    id="exampleFormControlInput1"
                    placeholder="*******"
                    type="password"
                  />
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </div>
        <div className="setting-account-type">
          <h6>ACCOUNT TYPE</h6>
        </div>
        <h4>
          <b>Teacher or Student account </b>
        </h4>
        <div className="custom-control custom-radio mb-3 control">
          <input
            className="custom-control-input"
            id="customRadio5"
            name="custom-radio-2"
            type="radio"
          />
          <label className="custom-control-label" htmlFor="customRadio5">
            Teacher
          </label>
        </div>
        <div className="custom-control custom-radio mb-3 control ">
          <input
            className="custom-control-input"
            defaultChecked
            id="customRadio6"
            name="custom-radio-2"
            type="radio"
          />
          <label className="custom-control-label" htmlFor="customRadio6">
            Student
          </label>
        </div>
        <Button color="default" type="button" className="btn-btn-save">
          Save
        </Button>
        <div className="setting-account-type">
          <h6>DELETE ACCOUNT</h6>
        </div>
        <h4>
          <b>Permanently delete this account </b>
          <p>Be careful- this will delete your data and cannot be undone.</p>
        </h4>
        <Button color="default" type="button" className="btn-btn-save">
          Delete
        </Button>
      </div>
    );
  }
}

export default SettingComponent;
