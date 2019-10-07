import React from "react";
import { connect } from "react-redux";
import {
  Card,
  CardBody,
  Button,
  Col,
  Row,
  CardHeader,
  UncontrolledTooltip,
  DropdownToggle,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import {
  getSetDetailsRequest,
  modelOpenRequest,
  publicAccessRequest,
  shareableLinkRequest,
  getMovesOfSetRequest
} from "../../../actions";
import SharableLinkModal from "../../comman/shareableLink/SharableLink";
import Slider from "react-slick";
import { AppConfig } from "../../../config/Appconfig";
import { AppRoutes } from "../../../config/AppRoutes";
import "./index.scss";
import Loader from "../../comman/Loader/Loader";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import emptySetIc from "../../../assets/img/empty-sets.png";
const homePageImage = [
  "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg",
  "https://images.pexels.com/photos/462118/pexels-photo-462118.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg",
  "https://i.pinimg.com/originals/26/94/93/269493fbeb10e31ad3867248e3f68b94.jpg"
];
var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};
// core components
class SetDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      errors: "",
      isPaste: false
    };
  }
  componentDidMount = () => {
    const location = this.props.location;
    const pathName = location.pathname.split("/");
    this.props.getSetDetailsRequest({ setId: pathName[2] });
    this.props.getMovesOfSetRequest({ setId: pathName[2] })
  };
  /*
  /*  
  */

  handleMoveAdd = () => {
    this.props.redirectTo(AppRoutes.MOVE.url);
  };

  onTogglePublicAccess = isPublic => {
    const location = this.props.location;
    const pathName = location.pathname.split("/");
    const data = {
      isFolderId: null,
      isSetId: pathName[2],
      isMoveId: null,
      isPublic: isPublic
    };
    this.props.publicAccess(data);
  };

  handleSharableLink = () => {
    const location = this.props.location;
    const pathName = location.pathname.split("/");
    this.props.shareableLink({
      setId: pathName[2],
      linkOf: "set"
    });
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    this.props.modelOperate({
      modelDetails: {
        sharableLinkModalOpen: !modelDetails.sharableLinkModalOpen
      }
    });
  };

  render() {
    const {
      setReducer,
      moveReducer,
      shareLinkReducer,
      modelInfoReducer
    } = this.props;
    const { setDetails, isSetDetailsLoading } = setReducer;
    const { modelDetails } = modelInfoReducer;
    const { movesOfSet } = moveReducer;
    const { userEncryptedInfo } = shareLinkReducer;
    const { sharableLinkModalOpen } = modelDetails;
    return (
      <>
        <div className="set-main-section">
          <div className="content-header">
        
              {
                setDetails && setDetails.folderId ?
                  <span className="content-title">
                    {
                      setDetails && setDetails.folderId ? setDetails.folderId.isCopy ?
                        `Copy of ${setDetails.folderId.title}` :
                        setDetails.folderId.title : null
                    }/
                              <span className={"text-light"}>{setDetails.title}</span>
                  </span> :
                  <span className="content-title">
                    {setDetails ? setDetails.title : "MyFolder"}
                  </span>
              }
        
            <div>
              <span id="UncontrolledTooltipExample" className={"cursor_pointer"} onClick={() => this.props.redirectTo(AppRoutes.CREATE_SET.url)}>
                <i className="fas fa-plus-circle icon-font"></i>
              </span>
              <span
                id="share"
                onClick={this.handleSharableLink}
                className="cursor_pointer ml-4"
              >
                <i className="fas fa-share icon-font"></i>
              </span>
              <UncontrolledDropdown className="header-dropdown  custom-dropdown">
                <DropdownToggle color={" "}>
                  <span id="edit" className="cursor_pointer ml-4">
                    <i className="fas fa-sliders-h icon-font"></i>
                  </span>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={this.handleFolderModel}>
                    Edit
                </DropdownItem>
                  <DropdownItem
                  // onClick={() => this.handleDeleteFolder(folderDetails._id)}
                  >
                    Delete
                </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </div>
          <div className="create-set-section step-2 w-100">
            <Slider {...settings} className="w-100">
              {movesOfSet && movesOfSet.length ? (
                movesOfSet.map((video, index) => {
                  return (
                    <div className="w-100">
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
                  <div className="create-set-section w-100 empty-folder-section">
                    <Card className="w-100 set-content-wrap empty-folder-card">
                      <div className="set-content-block w-100 empty-folder-wrap">
                        <CardHeader className="empty-folder-header text-center">
                          <img src={emptySetIc} alt={"Images"} />
                          <div className="content-header set-header">
                            <span className="content-title">
                              {" "}
                              <h3>You have add atleast one</h3>
                              <p>No move availabe for this set</p>
                            </span>
                          </div>
                        </CardHeader>
                        <CardBody className="">
                          <div className="create-set-tile"></div>
                          <div className="text-center">
                            <Button
                              color=" "
                              type="button"
                              className="btn-black btn "
                              onClick={this.handleMoveAdd}
                            >
                              <i className="fas fa-plus mr-1"></i>
                              Add a Set
                          </Button>
                          </div>
                        </CardBody>
                      </div>
                    </Card>
                  </div>

                )}
            </Slider>

          </div>
          <section className="play-list-collection ">
            <Row>
              <Col md="12">
                <div class="content-header mt-3 mb-2">
                    <span class="content-title">
                      Chapter business 247
                  </span>
                </div>
              </Col>
              <Col md="4">
                <div className="play-list-block  d-flex h-100">
                  <div className="add-play-list-block d-flex  justify-content-center align-items-center text-center flex-column">
                    <div className="h5 font-dark-bold">
                      Create your own set to learn or teach
                  </div>
                    <Button color={" "} className="fill-btn btn mt-4"> Create Now</Button>
                  </div>
                </div>
              </Col>
              {homePageImage.map((images, index) => {
                return (
                  <Col md="4" key={index}>
                    <div className="play-list-block ">
                      <div className="play-sub-block ">
                        
                        <div
                          className="play-list-img blur-img-wrap"
                        >
                          <img src={images} />
                          <div
                            className="blur-img"
                            style={{ backgroundImage: 'url("' + images + '")' }}
                          >

                          </div>
                        </div>

                        <div className="play-list-text">

                          <div className="play-list-number">25 Moves</div>
                          <div className="play-list-heading h6 ">
                            Salsa Footwork
                      </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </section>
        </div>
        <SharableLinkModal
          modal={sharableLinkModalOpen}
          handleOpen={this.handleSharableLink}
          onTogglePublicAccess={this.onTogglePublicAccess}
          isPublic={setDetails ? setDetails.isPublic : ""}
          userEncryptedInfo={userEncryptedInfo ? userEncryptedInfo : ""}
          shareComponent="Sets"
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  setReducer: state.setReducer,
  moveReducer: state.moveReducer,
  modelInfoReducer: state.modelInfoReducer,
  shareLinkReducer: state.shareLinkReducer
});
const mapDispatchToProps = dispatch => ({
  modelOperate: data => dispatch(modelOpenRequest(data)),
  getSetDetailsRequest: data => dispatch(getSetDetailsRequest(data)),
  publicAccess: data => {
    dispatch(publicAccessRequest(data));
  },
  shareableLink: data => {
    dispatch(shareableLinkRequest(data));
  },
  getMovesOfSetRequest: data => dispatch(getMovesOfSetRequest(data))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetDetails);
