import React from "react";
import { connect } from "react-redux";
import { Row, Col, Badge } from "reactstrap";

// core components
class Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboard-right-wrap">
        <div className="dashboard-right-section">

          <div className="page-body">
            <div className="content-header">
              <span className="content-title">RECENT</span> 
              <a className="dashboard-right-content" href="#">View all</a>
            </div>
            <Row>
              <Col md="6">
                <div className="tile-wrap card">
                  <div className="badge-wrap">
                    <Badge variant="secondary" className="draft-wrap">
                      DRAFT
                    </Badge>
                  </div>
                  <div className="cotent-tile d-flex">
                    <div className="cotent-text-tile">
                      <div className="content-heading-tile"> Academy Word List AWL - Sublist</div>
                      <div className="content-number-tile"> 4 items</div>
                    </div>
                    <div className="cotent-img-tile" style={{ backgroundImage: 'url("' + "https://content3.jdmagicbox.com/comp/mangalore/n5/0824px824.x824.161117105721.j6n5/catalogue/maruthi-hi-tech-gym-mangalore-ee6a9z8iv5.jpg" + '")' }}>
                    </div>
                  </div>
                  <div className="bottom-content-tile">

                    <div className="cotent-img-tile teacher-profile-img" style={{ backgroundImage: 'url("' + "https://content3.jdmagicbox.com/comp/mangalore/n5/0824px824.x824.161117105721.j6n5/catalogue/maruthi-hi-tech-gym-mangalore-ee6a9z8iv5.jpg" + '")' }}>

                    </div>
                    <span className="bottom-text-tile"> Mastershipclass</span>
                    <span className="bottom-light-tile"> Mastershipclass</span>
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div className="tile-wrap card">
                  <div className="badge-wrap">
                    <Badge variant="secondary" className="draft-wrap">
                      DRAFT
                    </Badge>
                  </div>
                  <div className="cotent-tile d-flex">
                    <div className="cotent-text-tile">
                      <div className="content-heading-tile"> Academy Word List AWL - Sublist</div>
                      <div className="content-number-tile"> 4 items</div>
                    </div>
                    <div className="cotent-img-tile" style={{ backgroundImage: 'url("' + "https://content3.jdmagicbox.com/comp/mangalore/n5/0824px824.x824.161117105721.j6n5/catalogue/maruthi-hi-tech-gym-mangalore-ee6a9z8iv5.jpg" + '")' }}>
                    </div>
                  </div>
                  <div className="bottom-content-tile">

                    <div className="cotent-img-tile teacher-profile-img" style={{ backgroundImage: 'url("' + "https://content3.jdmagicbox.com/comp/mangalore/n5/0824px824.x824.161117105721.j6n5/catalogue/maruthi-hi-tech-gym-mangalore-ee6a9z8iv5.jpg" + '")' }}>

                    </div>
                    <span className="bottom-text-tile"> Mastershipclass</span>
                    <span className="bottom-light-tile"> Mastershipclass</span>
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div className="tile-wrap card">
                  <div className="badge-wrap">
                    <Badge variant="secondary" className="draft-wrap">
                      DRAFT
                    </Badge>
                  </div>
                  <div className="cotent-tile d-flex">
                    <div className="cotent-text-tile">
                      <div className="content-heading-tile"> Academy Word List AWL - Sublist</div>
                      <div className="content-number-tile"> 4 items</div>
                    </div>
                    <div className="cotent-img-tile" style={{ backgroundImage: 'url("' + "https://content3.jdmagicbox.com/comp/mangalore/n5/0824px824.x824.161117105721.j6n5/catalogue/maruthi-hi-tech-gym-mangalore-ee6a9z8iv5.jpg" + '")' }}>
                    </div>
                  </div>
                  <div className="bottom-content-tile">

                    <div className="cotent-img-tile teacher-profile-img" style={{ backgroundImage: 'url("' + "https://content3.jdmagicbox.com/comp/mangalore/n5/0824px824.x824.161117105721.j6n5/catalogue/maruthi-hi-tech-gym-mangalore-ee6a9z8iv5.jpg" + '")' }}>

                    </div>
                    <span className="bottom-text-tile"> Mastershipclass</span>
                    <span className="bottom-light-tile"> Mastershipclass</span>
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div className="tile-wrap card">
                  <div className="badge-wrap">
                    <Badge variant="secondary" className="draft-wrap">
                      DRAFT
                    </Badge>
                  </div>
                  <div className="cotent-tile d-flex">
                    <div className="cotent-text-tile">
                      <div className="content-heading-tile"> Academy Word List AWL - Sublist</div>
                      <div className="content-number-tile"> 4 items</div>
                    </div>
                    <div className="cotent-img-tile" style={{ backgroundImage: 'url("' + "https://content3.jdmagicbox.com/comp/mangalore/n5/0824px824.x824.161117105721.j6n5/catalogue/maruthi-hi-tech-gym-mangalore-ee6a9z8iv5.jpg" + '")' }}>
                    </div>
                  </div>
                  <div className="bottom-content-tile">

                    <div className="cotent-img-tile teacher-profile-img" style={{ backgroundImage: 'url("' + "https://content3.jdmagicbox.com/comp/mangalore/n5/0824px824.x824.161117105721.j6n5/catalogue/maruthi-hi-tech-gym-mangalore-ee6a9z8iv5.jpg" + '")' }}>

                    </div>
                    <span className="bottom-text-tile"> Mastershipclass</span>
                    <span className="bottom-light-tile"> Mastershipclass</span>
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div className="tile-wrap card">
                  <div className="badge-wrap">
                    <Badge variant="secondary" className="draft-wrap">
                      DRAFT
                    </Badge>
                  </div>
                  <div className="cotent-tile d-flex">
                    <div className="cotent-text-tile">
                      <div className="content-heading-tile"> Academy Word List AWL - Sublist</div>
                      <div className="content-number-tile"> 4 items</div>
                    </div>
                    <div className="cotent-img-tile" style={{ backgroundImage: 'url("' + "https://content3.jdmagicbox.com/comp/mangalore/n5/0824px824.x824.161117105721.j6n5/catalogue/maruthi-hi-tech-gym-mangalore-ee6a9z8iv5.jpg" + '")' }}>
                    </div>
                  </div>
                  <div className="bottom-content-tile">

                    <div className="cotent-img-tile teacher-profile-img" style={{ backgroundImage: 'url("' + "https://content3.jdmagicbox.com/comp/mangalore/n5/0824px824.x824.161117105721.j6n5/catalogue/maruthi-hi-tech-gym-mangalore-ee6a9z8iv5.jpg" + '")' }}>

                    </div>
                    <span className="bottom-text-tile"> Mastershipclass</span>
                    <span className="bottom-light-tile"> Mastershipclass</span>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
