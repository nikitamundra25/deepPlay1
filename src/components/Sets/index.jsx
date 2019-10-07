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
import emptySetIc from "../../assets/img/empty-sets.png";
import Loader from "../comman/Loader/Loader";
import PaginationHelper from "helper/Pagination";
import qs from "query-string";
import { AppConfig } from "../../config/Appconfig";

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

  render() {
    const { setReducer } = this.props;
    const { allSetList, isSetListLoading, totalSets } = setReducer;
    const { show, setIndex, page } = this.state;

    return (
      <div className="set-main-section">
        <div className="content-header">
          <span className="content-title">YOUR SETS</span>
          <span
            id="UncontrolledTooltipExample"
            className={"cursor_pointer"}
            onClick={() => this.props.redirectTo(AppRoutes.CREATE_SET.url)}
          >
            <i className="fas fa-plus-circle icon-font"></i>
          </span>
          <UncontrolledTooltip
            placement="bottom"
            target="UncontrolledTooltipExample"
          >
            Create New Set
          </UncontrolledTooltip>
        </div>
        <p className="m-0">
          Total sets {allSetList && allSetList.length ? allSetList.length : "0"}
        </p>{" "}
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
                      <div className="cotent-tile d-flex content-with-tip">
                        <div
                          className="cotent-text-tile cursor_pointer "
                          onClick={() => this.handleSetDetails(setList._id)}
                        >
                          <div className="content-heading-tile d-flex">
                            {" "}
                            <span
                            // onClick={() => this.handleSetDetails(setList._id)}
                             className={" text-capitalize"}
                            >
                              <span>{setList.title}</span>
                            </span>
                          </div>
                          {setList.description ? setList.description : ""}
                          <div className="content-number-tile">
                            {" "}
                            {setList.moveCount} moves
                          </div>
                        </div>
                        <div
                          className="d-flex img-tile-wrap cursor_pointer"
                          onClick={() => this.handleSetDetails(setList._id)}
                        >
                          <div
                            className="cotent-img-tile "
                            style={{
                              backgroundImage:
                                'url("' +
                                "https://res.cloudinary.com/fleetnation/image/private/c_fit,w_1120/g_south,l_text:style_gothic2:%C2%A9%20Nikita%20Buida,o_20,y_10/g_center,l_watermark4,o_25,y_50/v1469756538/dd3acf4nzzavkv4rf2ji.jpg" +
                                '")'
                            }}
                          />
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
                                  Delete
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
              </>
            )
          ) : (
            <div>
              <Col sm={12} className="loader-col">
                <Loader />
              </Col>
            </div>
          )}
        
        </Row>
        {totalSets && !isSetListLoading ? (
          <PaginationHelper
            totalRecords={totalSets}
            currentPage={page}
            onPageChanged={page => {
              this.setState({ page });
              this.props.onPageChange(page);
            }}
            pageLimit={AppConfig.ITEMS_PER_PAGE}
          />
        ) : null}
      </div>
    );
  }
}

export default SetComponent;
