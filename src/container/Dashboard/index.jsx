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
        <div className="page-body">
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
                      className=" cursor_pointer "
                      onClick={() => this.handleSetDetails(set._id)}
                    >
                      <div className="tile-wrap card">
                        <div className="badge-wrap mb-2">
                          <Badge variant="secondary" className="draft-wrap">
                            DRAFT
                          </Badge>
                        </div>
                        <div className="cotent-tile d-flex">
                          <div className="cotent-text-tile">
                            <div className="content-heading-tile text-capitalize">
                              {" "}
                              {set.title}
                            </div>
                            <div className="content-heading-tile text-capitalize">
                              {" "}
                              {set.description ? set.description : ""}
                            </div>
                            <div className="content-number-tile"> 4 items</div>
                          </div>
                          <div
                            className="cotent-img-tile" /* style={{ backgroundImage: 'url("' + "https://content3.jdmagicbox.com/comp/mangalore/n5/0824px824.x824.161117105721.j6n5/catalogue/maruthi-hi-tech-gym-mangalore-ee6a9z8iv5.jpg" + '")' }} */
                          ></div>
                        </div>
                        <div className="bottom-content-tile">
                          <div
                            className="cotent-img-tile teacher-profile-img" /* style={{ backgroundImage: 'url("' + "https://content3.jdmagicbox.com/comp/mangalore/n5/0824px824.x824.161117105721.j6n5/catalogue/maruthi-hi-tech-gym-mangalore-ee6a9z8iv5.jpg" + '")' }} */
                          ></div>
                          <span className="bottom-text-tile">
                            {" "}
                            Mastershipclass
                          </span>
                          <span className="bottom-light-tile">
                            {" "}
                            Mastershipclass
                          </span>
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
                </>
              )
            ) : (
              <Col sm={12} className="loader-col">
                <Loader />
              </Col>
            )}
          </Row>
        </div>
        <div className="page-body mt-4">
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
                      md="6"
                      key={i}
                      className=" cursor_pointer "
                      onClick={() => this.handleFolderdetails(folder._id)}
                    >
                      <div className="tile-wrap card">
                        <div className="badge-wrap">
                          <Badge variant="secondary" className="draft-wrap">
                            DRAFT
                          </Badge>
                        </div>
                        <div className="cotent-tile d-flex">
                          <div className="cotent-text-tile">
                            <div className="content-heading-tile">
                              {" "}
                              {folder.title}
                            </div>
                            <div className="content-sub-heading-tile">
                              {" "}
                              {folder.description ? folder.description : ""}
                            </div>
                            <div className="content-number-tile"> 4 items</div>
                          </div>
                          <div
                            className="cotent-img-tile" /* style={{ backgroundImage: 'url("' + "https://content3.jdmagicbox.com/comp/mangalore/n5/0824px824.x824.161117105721.j6n5/catalogue/maruthi-hi-tech-gym-mangalore-ee6a9z8iv5.jpg" + '")' }} */
                          ></div>
                        </div>
                        <div className="bottom-content-tile">
                          <div
                            className="cotent-img-tile teacher-profile-img" /* style={{ backgroundImage: 'url("' + "https://content3.jdmagicbox.com/comp/mangalore/n5/0824px824.x824.161117105721.j6n5/catalogue/maruthi-hi-tech-gym-mangalore-ee6a9z8iv5.jpg" + '")' }} */
                          ></div>
                          <span className="bottom-text-tile">
                            {" "}
                            Mastershipclass
                          </span>
                          <span className="bottom-light-tile">
                            {" "}
                            Mastershipclass
                          </span>
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
                </>
              )
            ) : (
              <Col sm={12} className="loader-col">
                <Loader />
              </Col>
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
    setReducer: state.setReducer
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
