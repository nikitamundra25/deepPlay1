import React from "react";
import { connect } from "react-redux";
import {
  Card,
  CardBody,
  Button,
  Col,
  Row,
  CardHeader,
  DropdownToggle,
  UncontrolledDropdown,
  DropdownMenu,
  UncontrolledTooltip,
  DropdownItem,
  ButtonGroup
} from "reactstrap";
import {
  getSetDetailsRequest,
  modelOpenRequest,
  publicAccessRequest,
  shareableLinkRequest,
  deleteSetRequest,
  getMovesOfSetRequest,
  UpdateSetRequest
} from "../../../actions";
import SharableLinkModal from "../../comman/shareableLink/SharableLink";
import Slider from "react-slick";
import { AppConfig } from "../../../config/Appconfig";
import { AppRoutes } from "../../../config/AppRoutes";
import "./index.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import emptySetIc from "../../../assets/img/empty-sets.png";
import addPlusIc from "../../../assets/img/add_plus.png";
import { ConfirmBox } from "../../../helper/SweetAleart";
import Loader from "../../comman/Loader/Loader";
import CreateSetComponent from "../../Sets/createSet";

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
    this.props.getSetDetailsRequest({ setId: pathName[3] });
    this.props.getMovesOfSetRequest({ setId: pathName[3] });
  };
  /*
  /*  
  */
  componentDidUpdate = ({ location }) => {
    const oldLoaction = location;
    const oldpathName = oldLoaction.pathname.split("/");
    const newLocation = this.props.location;
    const pathName = newLocation.pathname.split("/");
    if (oldpathName[3] !== pathName[3]) {
      this.props.getSetDetailsRequest({ setId: pathName[3] });
      this.props.getMovesOfSetRequest({ setId: pathName[3] });
    }
  };

  handleMoveAdd = () => {
    const location = this.props.location;
    const pathName = location.pathname.split("/");
    this.props.redirectTo(AppRoutes.MOVE.url + `?setId=${pathName[3]}`);
  };

  onTogglePublicAccess = isPublic => {
    const location = this.props.location;
    const pathName = location.pathname.split("/");
    const data = {
      isFolderId: null,
      isSetId: pathName[3],
      isPublic: isPublic
    };
    this.props.publicAccess(data);
  };

  handleSharableLink = () => {
    const location = this.props.location;
    const pathName = location.pathname.split("/");
    this.props.shareableLink({
      setId: pathName[3],
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

  handleDeleteSet = async id => {
    const { value } = await ConfirmBox({
      text: "You want to delete this set!"
    });
    if (value) {
      this.props.onDeleteSets(id);
    }
  };

  handleSetModal = () => {
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    this.props.modelOperate({
      modelDetails: {
        createSetModalOpen: !modelDetails.createSetModalOpen
      }
    });
  };

  updateSet = data => {
    this.props.UpdateSetRequest(data);
  };

  render() {
    const {
      setReducer,
      moveReducer,
      shareLinkReducer,
      modelInfoReducer
    } = this.props;
    const { setDetails } = setReducer;
    const { modelDetails } = modelInfoReducer;
    const { movesOfSet, isMoveofSetLoading } = moveReducer;
    const { userEncryptedInfo } = shareLinkReducer;
    const { sharableLinkModalOpen, createSetModalOpen } = modelDetails;
    return (
      <>
        <div className="set-main-section">
          <div className="content-header">
            {setDetails && setDetails.folderId ? (
              <span className="content-title">
                <div className="main-title">
                  {/* {setDetails && setDetails.folderId
                    ? setDetails.folderId.isCopy
                      ? `Copy of ${setDetails.folderId.title}`
                      : setDetails.folderId.title
                    : null} */}
                  {setDetails.title ? setDetails.title : "MySet"}
                  {/* <span className={"text-light"}>{setDetails.title}</span> */}
                </div>
              </span>
            ) : (
              <span className="content-title">
                <div className="main-title">
                  {setDetails ? setDetails.title : "MySet"}
                </div>
                <div className="sub-title">
                  {setDetails ? setDetails.description : ""}
                </div>
              </span>
            )}

            <div>
              <span
                id="move"
                className={"cursor_pointer"}
                onClick={this.handleMoveAdd}
              >
                <i className="fas fa-plus-circle icon-font"></i>
              </span>
              <UncontrolledTooltip placement="bottom" target="move">
                Add new move
              </UncontrolledTooltip>
              <span
                id="share"
                onClick={this.handleSharableLink}
                className="cursor_pointer ml-4"
              >
                <i className="fas fa-share icon-font"></i>
              </span>
              <UncontrolledTooltip placement="bottom" target="share">
                Get Shareable Link
              </UncontrolledTooltip>
              <UncontrolledDropdown
                className="header-dropdown  custom-dropdown"
                direction="bottom"
              >
                <DropdownToggle color={" "}>
                  <span id="edit" className="cursor_pointer ml-4">
                    <i className="fas fa-sliders-h icon-font"></i>
                  </span>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => this.handleSetModal()}>
                    Edit
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => this.handleDeleteSet(setDetails._id)}
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledTooltip placement="bottom" target="edit">
                Edit & Delete
              </UncontrolledTooltip>
            </div>
          </div>
          {!isMoveofSetLoading ? (
            <>
              <Card className="video-slider-section">
                <div className="create-set-section step-2 w-100 video-slider-wrap">
                  <Slider {...settings} className="w-100">
                    {movesOfSet && movesOfSet.length ? (
                      movesOfSet.map((video, index) => {
                        return (
                          <div className="w-100">
                            <div className="video-slider-text">
                              <div className="video-slider-title">
                                {" "}
                                title of webM{" "}
                              </div>
                              <div className="video-slider-dropDown">
                                <div>
                                  <UncontrolledDropdown
                                    className="header-dropdown  custom-dropdown"
                                    direction="left"
                                  >
                                    <DropdownToggle color={" "}>
                                      <span
                                        id="edit"
                                        className="cursor_pointer ml-4"
                                      >
                                        <i
                                          class="fa fa-ellipsis-v"
                                          aria-hidden="true"
                                        ></i>
                                      </span>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                      <DropdownItem>Edit</DropdownItem>
                                      <DropdownItem>View Info</DropdownItem>
                                      <DropdownItem>Tranfer</DropdownItem>
                                      <DropdownItem>Delete</DropdownItem>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </div>
                              </div>
                            </div>
                            <div className="video-slider-img">
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
                      <div className="create-set-section w-100 empty-folder-section">
                        <div className="set-content-wrap empty-folder-card">
                          <div className="set-content-block w-100 empty-folder-wrap">
                            <CardHeader className="empty-folder-header text-center">
                              <img src={emptySetIc} alt={"Images"} />
                              <div className="content-header set-header">
                                <span className="content-title">
                                  {" "}
                                  <h3>You haven't add any move yet!</h3>
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
                                  Add a Move
                                </Button>
                              </div>
                            </CardBody>
                          </div>
                        </div>
                      </div>
                    )}
                  </Slider>
                </div>
              </Card>
              <section className="play-list-collection set-detail-section">
                <Row>
                  <Col md="12">
                    <div class="content-header mt-3 mb-2">
                      <span class="content-title">Chapter business 247</span>
                    </div>
                  </Col>
                  <Col md="4">
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
                  </Col>
                  {homePageImage.map((images, index) => {
                    return (
                      <Col md="4" key={index}>
                        <div className="play-list-block ">
                          <div className="play-sub-block ">
                            <div className="play-list-img blur-img-wrap">
                              <img src={images} alt="" />
                              <div
                                className="blur-img"
                                style={{
                                  backgroundImage: 'url("' + images + '")'
                                }}
                              ></div>
                            </div>

                            <div className="play-list-text">
                              <div className="play-list-number">25 Moves</div>
                              <div className="play-list-heading h6 ">
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
                                  <Button>Transfer</Button>
                                  <Button>Remove</Button>
                                </ButtonGroup>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
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
        </div>
        <SharableLinkModal
          modal={sharableLinkModalOpen}
          handleOpen={this.handleSharableLink}
          onTogglePublicAccess={this.onTogglePublicAccess}
          isPublic={setDetails ? setDetails.isPublic : ""}
          userEncryptedInfo={userEncryptedInfo ? userEncryptedInfo : ""}
          shareComponent="Sets"
        />
        <CreateSetComponent
          modal={createSetModalOpen}
          handleOpen={this.handleSetModal}
          createSet={this.updateSet}
          editSet="true"
          setDetails={setDetails ? setDetails : null}
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
  onDeleteSets: data => {
    dispatch(deleteSetRequest(data));
  },
  getMovesOfSetRequest: data => dispatch(getMovesOfSetRequest(data)),
  UpdateSetRequest: data => dispatch(UpdateSetRequest(data))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetDetails);
