import React from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Badge,
  Card,
  CardBody,
  CardHeader,
  Button
} from "reactstrap";
import { AppRoutes } from "../../config/AppRoutes";
import {
  profileRequest,
  recentFolderRequest,
  recentSetRequest
} from "../../actions";
import emptyFolderIc from "../../assets/img/empty-folder.png";
import emptySetIc from "../../assets/img/empty-sets.png";
import Loader from "../../components/comman/Loader/Loader";
// import defaultProfileImage from "../../assets/img/profile-ic.png";
// import { AppConfig } from "../../config/Appconfig";

// core components
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getProfile();
    this.props.getRecentFolders();
    this.props.getrecentSets();
  }
  handleViewAll = name => {
    if (name === "sets") {
      this.props.redirectTo(AppRoutes.SETS.url);
    } else {
      this.props.redirectTo(AppRoutes.FOLDERS.url);
    }
  };

  handleSetDetails = setId => {
    this.props.redirectTo(AppRoutes.SET_DETAILS.url.replace(":id", setId));
  };

  handleFolderdetails = folderId => {
    this.props.redirectTo(
      AppRoutes.FOLDER_DETAILS.url.replace(":id", folderId)
    );
  };

  render() {
    const { folderReducer, setReducer } = this.props;
    const { isRecentFolderLoading, recentFolders } = folderReducer;
    const { isRecentSetLoading, recentSets } = setReducer;
    
    return (
      <>
        <div className="page-body dashboard-recent-section">
          {/* <div className="content-header">
            <span className="content-title">RECENT</span>
          </div> */}
          <div className="content-header">
            <span className="content-title ">RECENT SETS</span>
            {recentSets && recentSets.length > 4 ? (
              <span
                className="dashboard-right-content cursor_pointer"
                onClick={() => this.handleViewAll("sets")}
              >
                View all
              </span>
            ) : (
              " "
            )}
          </div>
          <Row>
            {!isRecentSetLoading ? (
              recentSets && recentSets.length ? (
                recentSets.slice(0, 4).map((set, i) => {
                  return (
                    <Col
                      md="6"
                      key={i}
                      onClick={() => this.handleSetDetails(set._id)}
                      className="cursor_pointer"
                    >
                      <div className="tile-wrap card">
                     
                        <div className="cotent-tile d-flex content-with-tip content-with-img">
                       
                          <div className="cotent-text-tile ">
                          <div className="badge-wrap mb-2">
                          <Badge variant="secondary" className="draft-wrap">
                            DRAFT
                          </Badge>
                        </div>
                            <div className="content-heading-tile d-flex">
                              {" "}
                              <span className={" text-capitalize"}>
                                <span>
                                  {set.isCopy
                                    ? `Copy of ${set.title}`
                                    : set.title}
                                </span>
                              </span>
                            </div>
                            {set.description ? set.description : ""}
                            <div className="content-number-tile">
                              {" "}
                              {set.moveCount || 0} moves
                            </div>
                          </div>
                          <div
                            className="d-flex img-tile-wrap cursor_pointer"
                            onClick={() => this.handleSetDetails(set._id)}
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
                        </div>
                        {/* <div className="bottom-content-tile">
                          <div
                            className="cotent-img-tile teacher-profile-img"
                            style={{
                              backgroundImage: `url(${
                                profileInfo && profileInfo.profileImage
                                  ? splitedImage[0] === "uploads"
                                    ? `${AppConfig.API_ENDPOINT}${profileInfo.profileImage}`
                                    : profileInfo.profileImage
                                  : defaultProfileImage
                              })`
                            }}
                          ></div>
                          <span className="bottom-text-tile">
                            {" "}
                            {profileInfo
                              ? `${profileInfo.firstName} ${" "} ${
                                  profileInfo.lastName
                                }`
                              : ""}
                          </span>
                        </div> */}
                      </div>
                    </Col>
                  );
                })
              ) : (
                <>
                <Col>
                  <div className="create-set-section w-100 empty-folder-section sjp">
                    <Card className="set-content-wrap empty-folder-card">
                      <div className="set-content-block w-100 empty-folder-wrap">
                        <CardHeader className="empty-folder-header">
                          <img src={emptySetIc} alt={"Folder"} />
                          <div className="content-header set-header">
                            <span className="content-title">
                              {" "}
                              <h3>You haven't visited any set yet</h3>
                            </span>
                          </div>
                        </CardHeader>
                        <CardBody className="">
                          <div className="create-set-tile"></div>
                          <div className="text-center">
                            <Button
                              color=" "
                              type="button"
                              className="btn-black btn folder-create-btn"
                              onClick={() =>
                                this.props.redirectTo(AppRoutes.SETS.url)
                              }
                            >
                              View Set
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
        </div>
        <div className="page-body mt-4 dashboard-recent-section">
          <div className="content-header">
            <span className="content-title">RECENT FOLDERS</span>
            {recentFolders && recentFolders.length > 4 ? (
              <span
                className="dashboard-right-content cursor_pointer"
                onClick={() => this.handleViewAll("folders")}
              >
                View all
              </span>
            ) : (
              ""
            )}
          </div>
          <Row>
            {!isRecentFolderLoading ? (
              recentFolders && recentFolders.length ? (
                recentFolders.slice(0, 4).map((folder, i) => {
                  return (
                    <Col
                      key={i}
                      md={"6"}
                      onClick={() => this.handleFolderdetails(folder._id)}
                      className="cursor_pointer"
                    >
                      <div className="tile-wrap card">
                        <div className="badge-wrap">
                          <Badge variant="secondary" className="draft-wrap">
                            DRAFT
                          </Badge>
                        </div>
                        <div className="cotent-tile d-flex content-with-tip ">
                          <div className="cotent-text-tile pt-2">
                            <div className="content-heading-tile d-flex">
                              {" "}
                              <span className={"cursor_pointer"}>
                                {folder.isCopy
                                  ? `Copy of ${folder.title}`
                                  : folder.title}
                              </span>
                            </div>
                            <div className="content-number-tile">
                              {" "}
                              {folder.setCount || 0} sets
                            </div>
                          </div>
                        </div>
                        {/* <div className="bottom-content-tile pt-3">
                          <div
                            className="cotent-img-tile teacher-profile-img"
                            style={{
                              backgroundImage: `url(${
                                profileInfo && profileInfo.profileImage
                                  ? splitedImage[0] === "uploads"
                                    ? `${AppConfig.API_ENDPOINT}${profileInfo.profileImage}`
                                    : profileInfo.profileImage
                                  : defaultProfileImage
                              })`
                            }}
                          ></div>
                          <span className="bottom-text-tile">
                            {" "}
                            {profileInfo
                              ? `${profileInfo.firstName} ${" "} ${
                                  profileInfo.lastName
                                }`
                              : ""}
                          </span>
                        </div> */}
                      </div>
                    </Col>
                  );
                })
              ) : (
                <>
                <Col>
                  <div className="create-set-section w-100 empty-folder-section">
                    <Card className="set-content-wrap empty-folder-card">
                      <div className="set-content-block w-100 empty-folder-wrap">
                        <CardHeader className="empty-folder-header">
                          <img src={emptyFolderIc} alt={"folder"} />
                          <div className="content-header set-header">
                            <span className="content-title">
                              {" "}
                              <h3>You haven't visited any folder yet</h3>
                            </span>
                          </div>
                        </CardHeader>
                        <CardBody className="">
                          <div className="create-set-tile"></div>
                          <div className="text-center">
                            <Button
                              color=" "
                              type="button"
                              className="btn-black btn folder-create-btn"
                              onClick={() =>
                                this.props.redirectTo(AppRoutes.FOLDERS.url)
                              }
                            >
                              View Folder
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
              <Row>
                <Col sm={12} className="loader-col">
                  <Loader />
                </Col>
              </Row>
            )}
          </Row>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    folderReducer: state.getFolderReducer,
    setReducer: state.setReducer,
    profileInfoReducer: state.profileInfoReducer
  };
};
const mapDispatchToProps = dispatch => ({
  getProfile: () => {
    dispatch(profileRequest());
  },
  getRecentFolders: () => {
    dispatch(recentFolderRequest());
  },
  getrecentSets: () => {
    dispatch(recentSetRequest());
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
