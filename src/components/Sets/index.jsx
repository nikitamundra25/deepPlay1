import React from "react";
import {
  Row,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Col,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input
} from "reactstrap";
import { Link } from "react-router-dom";
import "./index.css";
// core components
class SetComponent extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Col>
            <Row>
              <Col>
                <UncontrolledDropdown>
                  <DropdownToggle caret color="default">
                    <i className="fas fa-plus-square"></i> &nbsp; Create
                  </DropdownToggle>
                  <DropdownMenu>
                    <li>
                      <DropdownItem tag={Link} to="/setting">
                        Create Move
                      </DropdownItem>
                    </li>
                    <DropdownItem divider />
                    <li>
                      <DropdownItem onClick={this.props.handleSetComponent}>
                        Create Set
                      </DropdownItem>
                    </li>
                    <DropdownItem divider />
                    <li>
                      <DropdownItem tag={Link} to="/setting">
                        Create Folder
                      </DropdownItem>
                    </li>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Col>
              <Col md="6">
                <FormGroup>
                  <InputGroup className="mb-4">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-zoom-split-in" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Search" type="text" />
                  </InputGroup>
                </FormGroup>
              </Col>
            </Row>
          </Col>
          <Col>
            <div className="profileimg-wrap">
              <div className="profilepic">
                <i className="fas fa-user fa-2x"></i>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Your Sets</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            {" "}
            <p>4 Sets total</p>{" "}
          </Col>
        </Row>
        <Row className="set-wrap">
          <Col md="6">
            <div className="tile-wrap card">
              <div className="cotent-tile d-flex">
                <div className="cotent-text-tile">
                  <div className="content-heading-tile"> Salsa Footwork</div>
                  <div className="content-number-tile"> 46 moves</div>
                </div>
                <div
                  className="cotent-img-tile"
                  style={{
                    backgroundImage:
                      'url("' +
                      "https://res.cloudinary.com/fleetnation/image/private/c_fit,w_1120/g_south,l_text:style_gothic2:%C2%A9%20Nikita%20Buida,o_20,y_10/g_center,l_watermark4,o_25,y_50/v1469756538/dd3acf4nzzavkv4rf2ji.jpg" +
                      '")'
                  }}
                ></div>
              </div>
            </div>
          </Col>
          <Col md="6">
            <div className="tile-wrap card">
              <div className="cotent-tile d-flex">
                <div className="cotent-text-tile">
                  <div className="content-heading-tile"> Group dance</div>
                  <div className="content-number-tile"> 40 moves</div>
                </div>
                <div
                  className="cotent-img-tile"
                  style={{
                    backgroundImage:
                      'url("' +
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPtCwfp2TotKrO5VthyxubNKkui_WGf5bAeYAWRg_Qj5_gfgTEAQ" +
                      '")'
                  }}
                ></div>
              </div>
            </div>
          </Col>
          <Col md="6">
            <div className="tile-wrap card">
              <div className="cotent-tile d-flex">
                <div className="cotent-text-tile">
                  <div className="content-heading-tile" onClick={this.handlech}>
                    {" "}
                    Zumba
                  </div>
                  <div className="content-number-tile"> 34 moves</div>
                </div>
                <div
                  className="cotent-img-tile"
                  style={{
                    backgroundImage:
                      'url("' +
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT26mdx_6-HmFvSY7TunwaEXFqpOY-6oRO77hT_yK7j-N7o69xw" +
                      '")'
                  }}
                ></div>
              </div>
            </div>
          </Col>
          <Col md="6">
            <div className="tile-wrap card">
              <div className="cotent-tile d-flex">
                <div className="cotent-text-tile">
                  <div className="content-heading-tile"> Salsa Partnerwork</div>
                  <div className="content-number-tile"> 77 moves</div>
                </div>
                <div
                  className="cotent-img-tile"
                  style={{
                    backgroundImage:
                      'url("' +
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR083Dj0YzQRjeDHwNIABYxI87JyQ8wJWoYPfvl9ALr4WR_mVEy" +
                      '")'
                  }}
                ></div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SetComponent;
