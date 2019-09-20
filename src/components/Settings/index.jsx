import React, { Component } from "react";
import {
  Button, FormGroup, Form, Input, Label, Row, Col, Card, CardText, CardBody,
  CardTitle, CardSubtitle, CardHeader
} from "reactstrap";

class SettingComponent extends Component {
  render() {
    return (
      <>
        <div className="dashboard-right-wrap">
          <div className="dashboard-right-section setting-section">
            <div className="page-body">
              <div className="content-header mb-3">
                <span className="content-title">SETTINGS</span>
              </div>
              <Card className="card-wrap">
                <CardHeader clas>
                  <CardTitle className="card-heading mb-0 h5">Profile</CardTitle>
                  <div className="heading-divider">
                  </div>
                  <Button className="dashboard-right-content btn-line-black">Edit Profile</Button>
                </CardHeader>
                <CardBody>
                  <div className="profile-wrap">
                    <div className="profile-img-tile">
                      <div className="profile-img" style={{ backgroundImage: 'url("' + "https://content3.jdmagicbox.com/comp/mangalore/n5/0824px824.x824.161117105721.j6n5/catalogue/maruthi-hi-tech-gym-mangalore-ee6a9z8iv5.jpg" + '")' }} alt="profile-img">
                      </div>
                    </div>
                    <div className="profile-text-tile color-black">
                      <div className="h3 font-weight-bold text-center mt-2">JOHN DIE</div>
                    </div>
                  </div>

                  <Form className="form-wrap settingForm">
                    <Row >
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
                      <Col md="6" >
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
                      <Col md="12" className="text-center pt-3">
                        <FormGroup>
                          <Button className="btn-black ">Save Info</Button>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>

                </CardBody>
              </Card>
              <Card className="card-wrap mt-4">
                <CardHeader >
                  <CardTitle className="card-heading mb-0 h5">Account Type</CardTitle>
                  <div className="heading-divider mr-0">
                  </div>
                </CardHeader>
                <CardBody>

                  <div className="account-type-wrap">
                    <Form className="form-wrap settingForm ">
                      <Row >
                        <Col md="6">
                          <FormGroup className="custom-control custom-radio mb-3 ">
                            <Input
                              className="custom-control-input"

                              id="customRadio6"
                              name="custom-radio-2"
                              type="radio"
                            />
                            <Label className="custom-control-label" htmlFor="customRadio6">
                              Teacher
          </Label>
                          </FormGroup>
                        </Col>
                        <Col md="6" className="text">
                          <FormGroup className="custom-control custom-radio mb-3 ">
                            <Input
                              className="custom-control-input"
                              defaultChecked
                              id="customRadio64"
                              name="custom-radio-2"
                              type="radio"
                            />
                            <Label className="custom-control-label" htmlFor="customRadio64">
                              Student
          </Label>
                          </FormGroup>
                        </Col>
                        <Col md="12" className="pt-3">
                          <FormGroup>
                            <Button className="btn-black ">Save Info</Button>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>

          {/* <div className="col-md-12 col-sm-12">


            <div className="setting-account-type">
              <h6>ACCOUNT TYPE</h6>
            </div>
            <h4>
              <b>Teacher or Student account </b>
            </h4>

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
            <Button color="danger" type="button" className="btn-btn-save">
              Delete Account
        </Button>
          </div> */}
        </div>
      </>
    );
  }
}

export default SettingComponent;
