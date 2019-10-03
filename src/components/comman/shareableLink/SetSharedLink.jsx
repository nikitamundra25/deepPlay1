import React from "react";
import { connect } from "react-redux";
import { Card, CardBody, Container, Button, Col } from "reactstrap";
import {
  sharedSetInfoRequest,
  publicUrlMoveDetailsRequest
} from "../../../actions";
import Slider from "react-slick";
import { AppConfig } from "../../../config/Appconfig";
import { AppRoutes } from "../../../config/AppRoutes";
import "./index.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
      <>
        <div className={"mt-5 "}>
          <Container className={"mt-5"}>
            <Card className="w-100">
              <CardBody>
                <div className={"d-flex justify-content-between"}>
                  <div>
                    <h2 className={"capitalise"}>
                      {decryptedSetDetails.title}
                    </h2>
                    <span className={"pt-2"}> 3 Moves</span>
                  </div>
                </div>
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
      </>
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
