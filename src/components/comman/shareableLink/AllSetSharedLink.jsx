import React from "react";
import { connect } from "react-redux";
import { Card, Container, Col, CardHeader, Row } from "reactstrap";
import {
  getAllSetRequest,
  shareableLinkRequest,
  redirectTo
} from "../../../actions";
import "./index.scss";
import emptySetIc from "../../../assets/img/empty-sets.png";
import PaginationHelper from "helper/Pagination";
import { AppConfig } from "../../../config/Appconfig";
import { AppRoutes } from "../../../config/AppRoutes";
import qs from "query-string";
import Loader from "../Loader/Loader";
import { isEqual } from "../../../helper/Object";

// core components
class AllSetSharedLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1
    };
  }

  componentDidMount() {
    let parsed = qs.parse(this.props.location.search);
    this.props.getSetList({ isSetNoLimit: false, parsed });
  }

  componentDidUpdate({ location }) {
    const prevQuery = qs.parse(location.search);
    const currQuery = qs.parse(this.props.location.search);
    if (!isEqual(prevQuery, currQuery)) {
      this.props.getSetList({
        ...currQuery,
        page: currQuery.page || 1,
        isSetNoLimit: false
      });
    }
  }

  handleSetDetails = id => {
    this.props.shareableLink({
      setId: id,
      linkOf: "set",
      publicAccess: "set",
      isPublic: true,
      fromFolder: true
    });
  };

  onPageChange = page => {
    this.props.onGoPage(
      `${AppRoutes.ALL_SET_SHARED_LINK.url}?${qs.stringify({ page: page })}`
    );
  };

  render() {
    const { setReducer } = this.props;
    const { allSetList, isSetListLoading, totalSets } = setReducer;
    const { page } = this.state;

    return (
      <div className="dashboard-full-section without-sidebar">
        <Container>
          <div className="content-header mt-3 mb-3">
            <span className="content-title">
              <div className="main-title"> {" Your Sets"}</div>
              <div className="sub-title">
                Total sets {totalSets ? totalSets : "0"}
              </div>
            </span>
          </div>
          <Row className="set-wrap">
            {!isSetListLoading ? (
              allSetList && allSetList.length ? (
                // eslint-disable-next-line
                allSetList.map((list, i) => {
                  return (
                    <Col
                      md="6"
                      key={i}
                      onClick={() => this.handleSetDetails(list._id)}
                      className={"cursor_pointer"}
                    >
                      <div className="tile-wrap card">
                        <div className="cotent-tile d-flex">
                          <div className="cotent-text-tile">
                            <div className="content-heading-tile">
                              <span
                                onClick={() => this.handleSetDetails(list._id)}
                                className={"cursor_pointer"}
                              >
                                {list.title}
                              </span>
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
                          <div
                            className="cotent-img-tile"
                            style={{
                              backgroundImage:
                                'url("' +
                                "https://res.cloudinary.com/fleetnation/image/private/c_fit,w_1120/g_south,l_text:style_gothic2:%C2%A9%20Nikita%20Buida,o_20,y_10/g_center,l_watermark4,o_25,y_50/v1469756538/dd3acf4nzzavkv4rf2ji.jpg" +
                                '")'
                            }}
                          ></div>
                        </div>
                      </div>
                    </Col>
                  );
                })
              ) : (
                <>
                  <div className="create-set-section w-100 empty-folder-section">
                    <Card className="set-content-wrap empty-folder-card">
                      <div className="set-content-block w-100 empty-folder-wrap">
                        <CardHeader className="empty-folder-header ">
                          <img src={emptySetIc} alt={"Images"} />
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
                </>
              )
            ) : (
              <Row>
                <Col sm={12} className="loader-col">
                  <Loader />
                </Col>
              </Row>
            )}
          </Row>
          {totalSets && !isSetListLoading ? (
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

const mapStateToProps = state => ({
  setReducer: state.setReducer
});
const mapDispatchToProps = dispatch => ({
  getSetList: data => {
    dispatch(getAllSetRequest(data));
  },
  shareableLink: data => {
    dispatch(shareableLinkRequest(data));
  },
  onGoPage: data => {
    dispatch(redirectTo({ path: data }));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllSetSharedLink);
