import React from "react";
import { connect } from "react-redux";
import { Row, Col, Badge, Card } from "reactstrap";
import { profileRequest } from "../../actions"
// core components
class Dashboard extends React.Component {
    componentDidMount() {
      this.props.getProfile()
    }
    render() {
      return (
        <>
          <div className="page-body">
            <div className="content-header">
              <span className="content-title">RECENT SETS</span>
              <span className="dashboard-right-content">View All</span>
            </div>
            <Row>
              <Col md="6">
                <Card className="tile-wrap">
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
                    <div className="cotent-img-tile">
                    </div>
                  </div>
                  <div className="bottom-content-tile">

                    <div className="cotent-img-tile teacher-profile-img">

                    </div>
                    <span className="bottom-text-tile"> Mastershipclass</span>
                    <span className="bottom-light-tile"> Mastershipclass</span>
                  </div>
                </Card>
              </Col>
              <Col md="6">
                <Card className="tile-wrap">
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
                    <div className="cotent-img-tile" /* style={{ backgroundImage: 'url("' + "https://content3.jdmagicbox.com/comp/mangalore/n5/0824px824.x824.161117105721.j6n5/catalogue/maruthi-hi-tech-gym-mangalore-ee6a9z8iv5.jpg" + '")' }} */>
                    </div>
                  </div>
                  <div className="bottom-content-tile">

                    <div className="cotent-img-tile teacher-profile-img">

                    </div>
                    <span className="bottom-text-tile"> Mastershipclass</span>
                    <span className="bottom-light-tile"> Mastershipclass</span>
                  </div>
                </Card>
              </Col>
              <Col md="6">
                <Card className="tile-wrap">
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
                    <div className="cotent-img-tile">
                    </div>
                  </div>
                  <div className="bottom-content-tile">

                    <div className="cotent-img-tile teacher-profile-img">

                    </div>
                    <span className="bottom-text-tile"> Mastershipclass</span>
                    <span className="bottom-light-tile"> Mastershipclass</span>
                  </div>
                </Card>
              </Col>
              <Col md="6">
                <Card className="tile-wrap">
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
                    <div className="cotent-img-tile">
                    </div>
                  </div>
                  <div className="bottom-content-tile">

                    <div className="cotent-img-tile teacher-profile-img">

                    </div>
                    <span className="bottom-text-tile"> Mastershipclass</span>
                    <span className="bottom-light-tile"> Mastershipclass</span>
                  </div>
                </Card>
              </Col>

            </Row>
          </div>
          <div className="page-body mt-4">
            <div className="content-header">
              <span className="content-title">RECENT FOLDERS</span>
              <span className="dashboard-right-content">View All</span>
            </div>
            <Row>

              <Col md="6">
                <Card className="tile-wrap">
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
                    <div className="cotent-img-tile" /* style={{ backgroundImage: 'url("' + "https://content3.jdmagicbox.com/comp/mangalore/n5/0824px824.x824.161117105721.j6n5/catalogue/maruthi-hi-tech-gym-mangalore-ee6a9z8iv5.jpg" + '")' }} */>
                    </div>
                  </div>
                  <div className="bottom-content-tile">

                    <div className="cotent-img-tile teacher-profile-img" /* style={{ backgroundImage: 'url("' + "https://content3.jdmagicbox.com/comp/mangalore/n5/0824px824.x824.161117105721.j6n5/catalogue/maruthi-hi-tech-gym-mangalore-ee6a9z8iv5.jpg" + '")' }} */>

                    </div>
                    <span className="bottom-text-tile"> Mastershipclass</span>
                    <span className="bottom-light-tile"> Mastershipclass</span>
                  </div>
                </Card>
              </Col>
              <Col md="6">
                <Card className="tile-wrap">
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
                    <div className="cotent-img-tile" /* style={{ backgroundImage: 'url("' + "https://content3.jdmagicbox.com/comp/mangalore/n5/0824px824.x824.161117105721.j6n5/catalogue/maruthi-hi-tech-gym-mangalore-ee6a9z8iv5.jpg" + '")' }} */>
                    </div>
                  </div>
                  <div className="bottom-content-tile">

                    <div className="cotent-img-tile teacher-profile-img" /* style={{ backgroundImage: 'url("' + "https://content3.jdmagicbox.com/comp/mangalore/n5/0824px824.x824.161117105721.j6n5/catalogue/maruthi-hi-tech-gym-mangalore-ee6a9z8iv5.jpg" + '")' }} */>

                    </div>
                    <span className="bottom-text-tile"> Mastershipclass</span>
                    <span className="bottom-light-tile"> Mastershipclass</span>
                  </div>
                </Card>
              </Col>
              <Col md="6">
                <Card className="tile-wrap">
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
                    <div className="cotent-img-tile" /* style={{ backgroundImage: 'url("' + "https://content3.jdmagicbox.com/comp/mangalore/n5/0824px824.x824.161117105721.j6n5/catalogue/maruthi-hi-tech-gym-mangalore-ee6a9z8iv5.jpg" + '")' }} */>
                    </div>
                  </div>
                  <div className="bottom-content-tile">

                    <div className="cotent-img-tile teacher-profile-img" /* style={{ backgroundImage: 'url("' + "https://content3.jdmagicbox.com/comp/mangalore/n5/0824px824.x824.161117105721.j6n5/catalogue/maruthi-hi-tech-gym-mangalore-ee6a9z8iv5.jpg" + '")' }} */>

                    </div>
                    <span className="bottom-text-tile"> Mastershipclass</span>
                    <span className="bottom-light-tile"> Mastershipclass</span>
                  </div>
                </Card>
              </Col>
              <Col md="6">
                <Card className="tile-wrap">
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
                    <div className="cotent-img-tile">
                    </div>
                  </div>
                  <div className="bottom-content-tile">

                    <div className="cotent-img-tile teacher-profile-img">

                    </div>
                    <span className="bottom-text-tile"> Mastershipclass</span>
                    <span className="bottom-light-tile"> Mastershipclass</span>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </>
      );
    }
  }

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  getProfile: () => {
    dispatch(profileRequest());
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
