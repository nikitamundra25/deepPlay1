import React from "react";
import { connect } from "react-redux";
import {
  Card,
  CardBody,
  Button,
  Col,
  UncontrolledTooltip,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";
import {
  getSetDetailsRequest,
  modelOpenRequest,
  publicAccessRequest,
  shareableLinkRequest,
  deleteSetRequest
} from "../../../actions";
import SharableLinkModal from "../../comman/shareableLink/SharableLink";
import Slider from "react-slick";
import { AppConfig } from "../../../config/Appconfig";
import { AppRoutes } from "../../../config/AppRoutes";
import "./index.scss";
import Loader from "../../comman/Loader/Loader";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ConfirmBox } from "../../../helper/SweetAleart";

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

  handleDeleteSet = async id => {
    const { value } = await ConfirmBox({
      text: "You want to delete this set.!! "
    });
    if (value) {
      this.props.onDeleteSets(id);
    }
  };

  editSet = id => {
    this.props.redirectTo(
      AppRoutes.CREATE_SET.url + `?setId=${id}&isEdit=${true}`
    );
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
        <div className="create-set-section step-2 mt-2">
          <Card className="w-100">
            <CardBody>
              {!isSetDetailsLoading ? (
                <>
                  <div className={"d-flex justify-content-between"}>
                    <div className="content-header">
                      <span className="content-title">
                        {setDetails ? setDetails.title : "MyFolder"}
                      </span>
                    </div>{" "}
                    <div>
                      <span
                        className="dashboard-right-content cursor_pointer ml-4"
                        onClick={() =>
                          this.props.redirectTo(AppRoutes.MOVE.url)
                        }
                        id="move"
                      >
                        <i className="fas fa-plus-circle icon-font"></i>
                      </span>
                      <UncontrolledTooltip placement="top" target="move">
                        Add new move
                      </UncontrolledTooltip>
                      <span
                        id="share"
                        onClick={this.handleSharableLink}
                        className="cursor_pointer ml-4"
                      >
                        <i className="fas fa-share icon-font"></i>
                      </span>
                      <UncontrolledTooltip placement="top" target="share">
                        Get Shareable Link
                      </UncontrolledTooltip>
                      <UncontrolledDropdown className="header-manu-wrap ">
                        <DropdownToggle>
                          <span id="edit" className="cursor_pointer ml-4">
                            <i className="fas fa-sliders-h icon-font"></i>
                          </span>
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem
                            onClick={() => this.editSet(setDetails._id)}
                          >
                            Edit
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => this.handleDeleteSet(setDetails._id)}
                          >
                            Delete
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>

                      <UncontrolledTooltip placement="top" target="edit">
                        Edit & Delete
                      </UncontrolledTooltip>
                    </div>
                  </div>
                  <div className={"pt-2"}> {setDetails ? setDetails.moveCount : 0} Moves</div>
                </>
              ) : (
                  <div>
                    <Col sm={12} className="loader-col">
                      <Loader />
                    </Col>
                  </div>
                )}
              <div className={"pt-3 d-flex justify-content-center"}>
                <Col md={"10"}>
                  <Slider {...settings}>
                    {movesOfSet && movesOfSet.length ? (
                      movesOfSet.map((video, index) => {
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
                          <div onClick={this.handleMoveAdd}>
                            <Button>Click To Add +</Button>
                          </div>
                        </div>
                      )}
                  </Slider>
                </Col>
              </div>
            </CardBody>
          </Card>
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
  onDeleteSets: data => {
    dispatch(deleteSetRequest(data));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetDetails);
