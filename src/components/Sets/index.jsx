import React from "react";
import {
  Row,
  Col,
} from "reactstrap";
import "./index.scss";
// core components
class SetComponent extends React.Component {
  render() {
    console.log(">>", this.props.getAllSet);

    return (
      <div className="set-main-section">
        <div className="content-header">
          <span className="content-title">YOUR SETS</span>
          <span className="dashboard-right-content">4 Sets total</span>
        </div>
        <Row className="set-wrap">
          <Col md="6">
            <div className="tile-wrap card">
              <div className="cotent-tile d-flex">
                <div className="cotent-text-tile">
                  <div onClick={this.props.handleSetComponent}>Create Set</div>
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
