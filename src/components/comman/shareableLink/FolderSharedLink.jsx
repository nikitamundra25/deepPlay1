import React from "react";
import { Row, Col, Card, CardHeader, Container } from "reactstrap";
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
      totalSets
    } = shareLinkReducer;

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
              <div className="sub-title">
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
                                {" "}
                                {list.description}
                              </div>

                              <div className="content-number-tile">
                                {" "}
                                {list.moveCount} items
                              </div>
                            </div>
                            {list.recentlyAddMoveImg ? (
                              <div className="d-flex img-tile-wrap cursor_pointer">
                                <div className="cotent-img-tile">
                                  <video width={"100%"} id="webm-video">
                                    <source
                                      src={`${list.recentlyAddMoveImg}`}
                                      type="video/webm"
                                    />
                                  </video>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FolderSharedLink);
