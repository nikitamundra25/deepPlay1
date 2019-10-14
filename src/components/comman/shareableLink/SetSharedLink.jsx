import React from "react";
import { connect } from "react-redux";
import {
  Card,
  CardBody,
  Container,
  Col,
  CardHeader,
  Button,
  Input,
  Row,
  ButtonGroup
} from "reactstrap";
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
//import { AppRoutes } from "../../../config/AppRoutes";
import addPlusIc from "../../../assets/img/add_plus.png";
import starIc from "../../../assets/img/star.svg";
import qs from "query-string";
import Loader from "../Loader/Loader";

var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

const homePageImage = [
  "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg",
  "https://images.pexels.com/photos/462118/pexels-photo-462118.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg",
  "https://i.pinimg.com/originals/26/94/93/269493fbeb10e31ad3867248e3f68b94.jpg"
];
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
      prevProps.shareLinkReducer.publicUrlmoveDetails !==
        this.props.shareLinkReducer.publicUrlmoveDetails
    ) {
      const setList = this.props.shareLinkReducer.publicUrlmoveDetails;
      this.setState({
        moveListItem: setList
      });
    }
  }

  render() {
    const { shareLinkReducer } = this.props;
    const { moveListItem } = this.state;
    const { decryptedSetDetails, isMoveDetailsLoading } = shareLinkReducer;

    return (
      <div className="dashboard-full-section without-sidebar">
        <div className="p-3">
          <span
            onClick={() => {
              window.history.back();
            }}
            className={"cursor_pointer back-arrow"}
          >
            {" "}
            <i className="fas fa-long-arrow-alt-left" /> Back
          </span>
        </div>
        <Container>
          <div className="content-header mt-3 mb-3">
            <span className="content-title">
              <div className="main-title">
                {" "}
                {decryptedSetDetails ? decryptedSetDetails.title : "No Title "}
              </div>
              <div className="sub-title">
                {decryptedSetDetails ? decryptedSetDetails.moveCount : 0} Moves
              </div>
            </span>
          </div>
          {!isMoveDetailsLoading ? (
            <>
              <Card className="w-100 mb-4">
                <div className={"d-flex justify-content-center"}>
                  <Col md={"10"}>
                    <Slider {...settings}>
                      {moveListItem && moveListItem.length ? (
                        moveListItem.map((video, index) => {
                          return (
                            <div className="w-100">
                              <div className="video-slider-title">
                                {" "}
                                title of webM{" "}
                              </div>
                              <div className="video-slider-img ">
                                <video width={"100%"} controls>
                                  <source
                                    src={`${AppConfig.API_ENDPOINT}${video.videoUrl}`}
                                    type="video/mp4"
                                  />
                                </video>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="create-set-section mt-2 w-100">
                          <div className="set-content-wrap w-100">
                            <div className="set-content-block w-100 empty-folder-wrap">
                              <CardHeader className="empty-folder-header">
                                <img src={emptySetIc} alt={"Folder"} />
                                <div className="content-header set-header">
                                  <span className="content-title">
                                    {" "}
                                    <h3>You haven't created any set yet</h3>
                                    <p>No move availabe for this set</p>
                                  </span>
                                </div>
                              </CardHeader>
                              <CardBody className="">
                                <div className="create-set-tile"></div>
                                {/* <div className="text-center">
                                  <Button
                                    color=" "
                                    type="button"
                                    className="btn-black btn mt-3 folder-create-btn"
                                    onClick={() =>
                                      this.props.redirectTo(
                                        AppRoutes.CREATE_SET.url
                                      )
                                    }
                                  >
                                    <i className="fas fa-plus mr-1"></i>
                                    Create a Set
                                  </Button>
                                </div> */}
                              </CardBody>
                            </div>
                          </div>
                        </div>
                      )}
                    </Slider>
                  </Col>
                </div>
              </Card>
              <section className="play-list-collection set-detail-section">
            <Row>
              <Col md="12">
                <div class="content-header mt-3 mb-2">
                  <span class="content-title">Chapter business 247</span>
                </div>
              </Col>
              <div className="play-list-tile" >
                <div className="play-list-block  d-flex h-100 ">
                  <div className="add-play-list-block d-flex w-100 justify-content-center align-items-center text-center flex-column">
                    <div className="h5 font-dark-bold add-img">
                      <img src={addPlusIc} alt="" />
                    </div>
                    <Button color={" "} className="fill-btn btn mt-4">
                      {" "}
                      Create Now
                    </Button>
                  </div>
                </div>
                </div>
              {homePageImage.map((images, index) => {
                return (
                  <div className="play-list-tile" key={index}>
                    <div className="play-list-block">
                      <div className="play-sub-block">
                        <div className="play-list-img blur-img-wrap checked-wrap">
                          <div className="custom-control custom-control-alternative custom-checkbox set-img-thumnail">
                            <Input
                              className="custom-control-input"
                              id="customCheckRegister"
                              name={"roleType"}
                              type="checkbox"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheckRegister"
                            ></label>
                          </div>
                          <div className="star-wrap">
                            <img src={starIc} alt={"star"} />
                          </div>
                          <img src={images} alt="" />
                          <div
                            className="blur-img"
                            style={{ backgroundImage: 'url("' + images + '")' }}
                          ></div>
                        </div>

                        <div className="play-list-text">
                          <div className="play-list-number">25 Moves</div>
                          <div className="play-list-heading h6 m-0">
                            Salsa Footwork
                          </div>
                          <div
                            // onMouseOver={() => this.showPopOver(i, show)}
                            className={"tooltip-btn-wrap right-btn-tip"}
                          >
                            <span className="cursor_pointer">
                              {" "}
                              <i className="fas fa-ellipsis-v setting-icon "></i>
                            </span>

                            <ButtonGroup size="sm">
                              <Button
                              // onClick={() => this.OnCreateSetCopy(list)}
                              >
                                Copy
                              </Button>
                              <Button >Transfer</Button>
                              <Button>Remove</Button>
                            </ButtonGroup>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Row>
          </section>
            </>
          ) : (
            <Row>
              <Col sm={12} className="loader-col">
                <Loader />
              </Col>
            </Row>
          )}
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
