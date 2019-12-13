import React from "react";
import { Row, Col, Card, CardHeader, Container, Button } from "reactstrap";
import { connect } from "react-redux";
import {
  sharedFolderInfoRequest,
  publicUrlSetDetailsRequest,
  shareableLinkRequest,
  redirectTo,
  encryptSetRequest
} from "../../../actions";
import emptyFolderIc from "../../../assets/img/empty-folder.png";
import qs from "query-string";
// import { isEqual } from "../../../helper/Object";
import { AppRoutes } from "../../../config/AppRoutes";
import PaginationHelper from "helper/Pagination";
import { AppConfig } from "../../../config/Appconfig";
import "./index.scss";
import Loader from "../Loader/Loader";
import imgNotfound from "../../../assets/img/icons/lock.svg";
import { Link } from "react-router-dom";

// core components

class FolderSharedLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setListItem: [],
      page: 1,
      parsedUrl: ""
    };
  }

  componentDidMount() {
    let parsed = qs.parse(this.props.location.search);
    this.setState({
      parsedUrl: parsed
    });
    this.props.encryptedQuery(parsed);
    this.props.publicUrlSetDetails(parsed);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.shareLinkReducer &&
      prevProps.shareLinkReducer.publicUrlSetDetails !==
        this.props.shareLinkReducer.publicUrlSetDetails
    ) {
      const setList = this.props.shareLinkReducer.publicUrlSetDetails;
      this.setState({
        setListItem: setList
      });
    }
  }

  onPageChange = page => {
    const { parsedUrl } = this.state;
    this.props.onGoPage(
      `${AppRoutes.FOLDER_SHARED_LINK.url +
        `?userId=${parsedUrl.userId}&folderId=${parsedUrl.folderId}&isPublic=${parsedUrl.isPublic}`}?${qs.stringify(
        { page: page }
      )}`
    );
    const parsed = {
      ...parsedUrl,
      page: page
    };
    this.props.publicUrlSetDetails(parsed);
  };

  handleSetDetails = id => {
    let parsed = qs.parse(this.props.location.search);
    this.props.encryptSetRequest({
      setId: id,
      userId: parsed.userId,
      isPublic: parsed.isPublic,
      fromFolder: true
    });
  };

  render() {
    const { shareLinkReducer } = this.props;
    const { setListItem, page } = this.state;
    const {
      decryptedDetails,
      isSetDetailsLoading,
      totalSets,
      accessDenied
    } = shareLinkReducer;
    const token = localStorage.getItem("token");
    let isLoggedIn = false;
    if (token) {
      isLoggedIn = true;
    } else {
      isLoggedIn = false;
    }

    return (
      <div className={"dashboard-full-section without-sidebar"}>
        {/* <div className="p-3">
          <span
            onClick={() => {
              window.history.back();
            }}
            className={"cursor_pointer back-arrow"}
          >
            {" "}
            <i className="fas fa-long-arrow-alt-left" /> Back
          </span>
        </div> */}
        {!accessDenied ? (
          <Container>
            {/* <div className="text-center h3">
            <b> Folder Details</b>
          </div>{" "} */}
            <div className="content-header mt-3">
              <span className="content-title">
                <div className="main-title">
                  {decryptedDetails ? decryptedDetails.title : "MyFolder"}
                </div>
                <div className="sub-title">
                  {" "}
                  {decryptedDetails ? decryptedDetails.description : ""}
                </div>
                <div className="sub-title pt-2">
                  Total sets: {totalSets ? totalSets : 0}
                </div>
              </span>
            </div>

            <Row className="set-wrap">
              {!isSetDetailsLoading ? (
                setListItem && setListItem.length ? (
                  // eslint-disable-next-line
                  setListItem.map((list, i) => {
                    return (
                      <Col
                        md="6"
                        key={i}
                        onClick={() => this.handleSetDetails(list._id)}
                        className={"cursor_pointer"}
                      >
                        <div className="tile-wrap card">
                          <div className="cotent-tile ">
                            <div className="d-flex content-with-img w-100">
                              <div className="cotent-text-tile">
                                <div className="content-heading-tile">
                                  <span>{list.title}</span>
                                </div>
                                <div className="content-heading-tile">
                                  <small>
                                    {" "}
                                    {list.description
                                      ? list.description.length > 100
                                        ? list.description.substring(0, 80) +
                                          "..."
                                        : list.description
                                      : ""}
                                  </small>
                                </div>

                                <div className="content-number-tile">
                                  {" "}
                                  {list.moveCount} sets
                                </div>
                              </div>
                              {list.recentlyAddMoveImg ? (
                                <div className="d-flex img-tile-wrap cursor_pointer">
                                  <div className="cotent-img-tile">
                                    <img
                                      src={`${list.recentlyAddMoveImg}`}
                                      alt=""
                                      width="100%"
                                      height="100%"
                                    />
                                  </div>
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </Col>
                    );
                  })
                ) : (
                  <>
                    <Col>
                      <div className="create-set-section w-100 empty-folder-section">
                        <Card className="set-content-wrap empty-folder-card mb-4">
                          <div className="set-content-block w-100 empty-folder-wrap">
                            <CardHeader className="empty-folder-header ">
                              <img src={emptyFolderIc} alt={"Images"} />
                              <div className="content-header set-header">
                                <span className="content-title">
                                  {" "}
                                  <h3>This folder has no Sets yet</h3>
                                  {/* <p>Organize your Sets for you or your students</p> */}
                                </span>
                              </div>
                            </CardHeader>
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
            {totalSets && !isSetDetailsLoading ? (
              <div className={"d-flex justify-content-center pt-3"}>
                <PaginationHelper
                  totalRecords={totalSets}
                  currentPage={page}
                  onPageChanged={page => {
                    this.setState({ page });
                    this.onPageChange(page);
                  }}
                  pageLimit={AppConfig.ITEMS_PER_PAGE}
                />
              </div>
            ) : null}
          </Container>
        ) : (
          <div className="app flex-row pt-5">
            <Container>
              <Card className="home-video-section my-4 py-5">
                <Row className="">
                  <Col md="6">
                    {/* <iframe width="560" title={"Dance"} height="315" src="https://www.youtube.com/embed/nrDtcsyd-U4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
                    <div className="d-flex video-add-banner justify-content-center align-items-center">
                      <img
                        src={imgNotfound}
                        alt={""}
                        className="w-100"
                        width="200"
                        height="250"
                      />
                    </div>
                  </Col>
                  <Col
                    md="6"
                    className="d-flex flex-column justify-content-between "
                  >
                    <div className="banner-text">
                      <h1 className="banner-heading">Oops !</h1>
                      <p className="banner-subheading mt-4 mt-0 h3 font-weight-bold">
                        Access denied...
                      </p>
                      <p className="banner-content  mt-0 ">
                        You didn't have permission to access this page. Maybe
                        our FAQ or Community can help?
                      </p>
                    </div>
                    <div className="text-left">
                      <Link to={"/"}>
                        <Button
                          className="fill-btn btn w-75 m-auto white-color get-stated-btn"
                          onClick={
                            isLoggedIn
                              ? this.handleDashboardOpen
                              : this.handleLoginModalOpen
                          }
                        >
                          Back To Home page
                        </Button>
                      </Link>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Container>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    shareLinkReducer: state.shareLinkReducer
  };
};

const mapDispatchToProps = dispatch => ({
  encryptedQuery: data => dispatch(sharedFolderInfoRequest(data)),
  publicUrlSetDetails: data => dispatch(publicUrlSetDetailsRequest(data)),
  shareableLink: data => {
    dispatch(shareableLinkRequest(data));
  },
  onGoPage: data => {
    dispatch(redirectTo({ path: data }));
  },
  encryptSetRequest: data => {
    dispatch(encryptSetRequest(data));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FolderSharedLink);
