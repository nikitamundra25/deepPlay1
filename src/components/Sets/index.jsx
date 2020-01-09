import React from "react";
import {
  Row,
  Col,
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  UncontrolledTooltip
} from "reactstrap";
import { AppRoutes } from "../../config/AppRoutes";
import "./index.scss";
import emptySetIc from "../../assets/img/play-list-ic.svg";
import Loader from "../comman/Loader/Loader";
import PaginationHelper from "helper/Pagination";
import qs from "query-string";
import { AppConfig } from "../../config/Appconfig";
import SharableLinkModal from "components/comman/shareableLink/SharableLink";
import CreateSetComponent from "../Sets/createSet";
import emptyImg from "../../assets/img/empty-img.svg";
// core components
class SetComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      setIndex: -1,
      page: 1
    };
  }

  componentDidMount() {
    const { location } = this.props;
    const lSearch = location.search;
    const { page } = qs.parse(lSearch);
    this.setState({
      page: parseInt(page) || 1
    });
  }

  showPopOver = index => {
    this.setState({
      show: true,
      setIndex: index
    });
  };
  closePopOver = () => {
    this.setState({
      show: false,
      setIndex: -1
    });
  };

  handleSetDetails = setId => {
    this.props.handleRecentTime(setId);
    this.props.redirectTo(AppRoutes.SET_DETAILS.url.replace(":id", setId));
  };

  openTransferToModal = (id, folderId) => {
    this.props.allFolders();
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    this.setState({
      setToTransfer: id,
      folderId: folderId
    });
    this.props.modelOperate({
      modelDetails: {
        transferToModalOpen: !modelDetails.transferToModalOpen
      }
    });
  };

  handleSharableLink = () => {
    this.props.shareableLink({
      linkOf: "yourSet"
    });
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    this.props.modelOperate({
      modelDetails: {
        sharableLinkModalOpen: !modelDetails.sharableLinkModalOpen
      }
    });
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

  createSet = data => {
    this.props.onSetsCreation(data);
  };

  render() {
    const {
      setReducer,
      modelInfoReducer,
      userEncryptedInfo,
      location
    } = this.props;
    const { allSetList, isSetListLoading, totalSets } = setReducer;
    const { modelDetails } = modelInfoReducer;
    const { sharableLinkModalOpen, createSetModalOpen } = modelDetails;
    const { show, setIndex, page } = this.state;
    const lSearch = location.search;
    const temp = qs.parse(lSearch);

    return (
      <div className="set-main-section">
        <div className="content-header">
          <span className="content-title">
            <div className="main-title"> {" Sets"}</div>
            <div className="sub-title">
              Total sets: {totalSets ? totalSets : "0"}
            </div>
          </span>
          <div className="d-flex  justify-content-center align-items-between ">
            {temp && temp.search ? (
              <>
                <span
                  id="reset"
                  className={"cursor_pointer reset-search text-center mr-2"}
                  onClick={this.props.handleResetSearch}
                >
                  <i className="fas fa-undo-alt"></i>
                </span>
                <UncontrolledTooltip placement="top" target="reset">
                  Reset search results
                </UncontrolledTooltip>
              </>
            ) : null}
            <span
              id="set"
              className={"cursor_pointer"}
              onClick={this.handleSetModal}
            >
              <i className="fas fa-plus icon-font"></i>
            </span>
            <UncontrolledTooltip placement="top" target="set">
              Create New Set
            </UncontrolledTooltip>
          </div>
        </div>
        <Row className="set-wrap">
          {!isSetListLoading ? (
            allSetList && allSetList.length ? (
              // eslint-disable-next-line
              allSetList.map((setList, i) => {
                return (
                  <Col md="6" key={i}>
                    <div
                      className="tile-wrap card"
                      onMouseLeave={() => this.closePopOver()}
                    >
                      <div className="cotent-tile d-flex content-with-tip cursor_pointer">
                        <div
                          className="d-flex content-with-img w-100"
                          onClick={() => this.handleSetDetails(setList._id)}
                        >
                          <div className="cotent-text-tile cursor_pointer ">
                            <div className="content-heading-tile  ">
                              {" "}
                              <span
                                className={
                                  " text-capitalize content-heading-tile d-flex h5  w-100 mb-1"
                                }
                              >
                                {setList.isCopy
                                  ? `${setList.title} ${
                                      setList.copyCount > 0
                                        ? `(${setList.copyCount})`
                                        : ""
                                    }`
                                  : setList.title}
                              </span>
                              <small className="">
                                {setList.description
                                  ? setList.description.length > 100
                                    ? setList.description.substring(0, 80) +
                                      "..."
                                    : setList.description
                                  : ""}
                              </small>
                            </div>

                            <div className="content-number-tile">
                              {" "}
                              {setList.moveCount} moves
                            </div>
                          </div>
                          <div
                            className="d-flex img-tile-wrap cursor_pointer justify-content-center"
                            onClick={() => this.handleSetDetails(setList._id)}
                          >
                            {setList.recentlyAddMoveImg ? (
                              <div className="cotent-img-tile">
                                <img
                                  src={`${setList.recentlyAddMoveImg}`}
                                  alt=""
                                  width="100%"
                                  height="100%"
                                />
                              </div>
                            ) : (
                              <div className={""}>
                                <img
                                  src={emptyImg}
                                  alt=""
                                  width="60"
                                  height="60"
                                />
                              </div>
                            )}

                            {/* <div
                            className="cotent-img-tile "
                            style={{
                              backgroundImage:
                                'url("' +
                                "https://res.cloudinary.com/fleetnation/image/private/c_fit,w_1120/g_south,l_text:style_gothic2:%C2%A9%20Nikita%20Buida,o_20,y_10/g_center,l_watermark4,o_25,y_50/v1469756538/dd3acf4nzzavkv4rf2ji.jpg" +
                                '")'
                            }}
                          /> */}
                          </div>
                        </div>
                        <div
                          onMouseOver={() => this.showPopOver(i, show)}
                          className="tooltip-btn-wrap right-btn-tip"
                        >
                          <span className="cursor_pointer">
                            {" "}
                            <i className="fas fa-ellipsis-v setting-icon "></i>
                            {show && setIndex === i ? (
                              <ButtonGroup
                                onMouseOver={() => this.showPopOver(i, show)}
                                size="sm"
                              >
                                <Button
                                  onClick={() =>
                                    this.props.OnCreateSetCopy(setList)
                                  }
                                  color=" "
                                  disabled={setList.isVideoProcessing.length}
                                >
                                  Copy
                                </Button>
                                <Button
                                  onClick={() =>
                                    this.props.openTransferToModal(
                                      setList._id,
                                      setList.folderId
                                    )
                                  }
                                  color=" "
                                  disabled={setList.isVideoProcessing.length}
                                >
                                  Transfer
                                </Button>
                                <Button
                                  onClick={() =>
                                    this.props.onRemoveSets(
                                      setList._id,
                                      "remove"
                                    )
                                  }
                                >
                                  Remove
                                </Button>
                              </ButtonGroup>
                            ) : null}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Col>
                );
              })
            ) : (
              <>
                <Col>
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
                              onClick={this.handleSetModal}
                            >
                              <i className="fas fa-plus mr-1"></i>
                              Create New Set
                            </Button>
                          </div>
                        </CardBody>
                      </div>
                    </Card>
                  </div>
                </Col>
              </>
            )
          ) : (
            <Col sm={12} className="loader-col">
              <Loader />
            </Col>
          )}
        </Row>

        <SharableLinkModal
          modal={sharableLinkModalOpen}
          handleOpen={this.handleSharableLink}
          userEncryptedInfo={userEncryptedInfo ? userEncryptedInfo : ""}
          shareComponent="yourSets"
        />
        <CreateSetComponent
          modal={createSetModalOpen}
          handleOpen={this.handleSetModal}
          createSet={this.createSet}
        />

        {totalSets && !isSetListLoading ? (
          <div className={"d-flex justify-content-center pt-3"}>
            <PaginationHelper
              totalRecords={totalSets}
              currentPage={page}
              onPageChanged={page => {
                this.setState({ page });
                this.props.onPageChange(page);
              }}
              pageLimit={AppConfig.ITEMS_PER_PAGE}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default SetComponent;
