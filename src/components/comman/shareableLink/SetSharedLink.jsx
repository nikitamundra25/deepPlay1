import React from "react";
import { connect } from "react-redux";
import { Card, CardBody, Container, Col, CardHeader, Button } from "reactstrap";
import {
  sharedSetInfoRequest,
  publicUrlMoveDetailsRequest
} from "../../../actions";
import Slider from "react-slick";
import { AppConfig } from "../../../config/Appconfig";
import "./index.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import emptySetIc from "../../../assets/img/empty-sets.png";
import { AppRoutes } from "../../../config/AppRoutes";

import qs from "query-string";

var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};
// core components
class SetSharedLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moveListItem: []
    };
  }
  componentDidMount() {
    let parsed = qs.parse(this.props.location.search);
    this.props.encryptedQuery(parsed);
    this.props.publicUrlSetDetails(parsed);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.shareLinkReducer &&
      prevProps.shareLinkReducer.publicUrlMoveDetails !==
        this.props.shareLinkReducer.publicUrlMoveDetails
    ) {
      const setList = this.props.shareLinkReducer.publicUrlMoveDetails;
      this.setState({
        moveListItem: setList
      });
    }
  }

  render() {
    const { shareLinkReducer } = this.props;
    const { moveListItem } = this.state;
    const { decryptedSetDetails } = shareLinkReducer;

    return (
      <div className="dashboard-full-section">
      
          <Container >
          <div className="content-header">
          <span className="content-title">
           <div className="main-title">        {decryptedSetDetails ? decryptedSetDetails.title : "No Title"}</div>
            <div className="sub-title">
            3 Moves
        </div>
          </span>
         
        </div>
        <div className="create-set-section mt-2 w-100">
                  <Card className="set-content-wrap">
                    <div className="set-content-block w-100 empty-folder-wrap">
                      <CardHeader className="empty-folder-header">
                        <img src={emptySetIc} alt={"Folder"} />
                        <div className="content-header set-header">
                          <span className="content-title">
                            {" "}
                            <h3>You haven't created any set yet</h3>
                            <p>Create a Set to Organize your Moves.</p>
                          </span>
                        </div>
                      </CardHeader>
                      <CardBody className="">
                        <div className="create-set-tile"></div>
                        <div className="text-center">
                          <Button
                            color=" "
                            type="button"
                            className="btn-black btn mt-3 folder-create-btn"
                            onClick={() =>
                              this.props.redirectTo(AppRoutes.CREATE_SET.url)
                            }
                          >
                            <i className="fas fa-plus mr-1"></i>
                            Create a Set
                          </Button>
                        </div>
                      </CardBody>
                    </div>
                  </Card>
                </div>
            <Card className="w-100">
              <CardBody>
                <div className={"pt-3 d-flex justify-content-center"}>
                  <Col md={"10"}>
                    <Slider {...settings}>
                      {moveListItem && moveListItem.length ? (
                        moveListItem.map((video, index) => {
                          return (
                            <div>
                              <video width={"100%"} controls>
                                <source
                                  src={`${AppConfig.API_ENDPOINT}${video.videoUrl}`}
                                  type="video/mp4"
                                />
                              </video>
                            </div>
                          );
                        })
                      ) : (
                        <div className={"text-center"}>
                          <div>No move availabe for this set</div>
                        </div>
                      )}
                    </Slider>
                  </Col>
                </div>
              </CardBody>
            </Card>
          </Container>
        
      </div>
    );
  }
}

const mapStateToProps = state => ({
  shareLinkReducer: state.shareLinkReducer
});
const mapDispatchToProps = dispatch => ({
  encryptedQuery: data => dispatch(sharedSetInfoRequest(data)),
  publicUrlSetDetails: data => dispatch(publicUrlMoveDetailsRequest(data))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetSharedLink);
