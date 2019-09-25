import React from "react";
import { UncontrolledTooltip, Button } from "reactstrap";
import { connect } from "react-redux";
import {
  getFolderRequest,
  modelOpenRequest,
  getAllSetRequest
} from "../../../actions";
import AddSetModal from "./addSet";

// core components
class RecentFolderComponent extends React.Component {
  componentDidMount() {
    const loaction = this.props.location;
    const pathName = loaction.pathname.split("/");
    this.props.getFolderRequest({ id: pathName[2] });
  }

  openAddSetModel = () => {
    this.props.getSetList();
    const { modelInfoReducer } = this.props;
    const { modelDetails } = modelInfoReducer;
    this.props.modelOperate({
      modelDetails: {
        addSetModalOpen: !modelDetails.addSetModalOpen
      }
    });
  };

  render() {
    const {
      modelOperate,
      modelInfoReducer,
      getFolder,
      getAllSetReducer
    } = this.props;

    return (
      <div className="page-body">
        <div className="content-header">
          <span className="content-title">
            {getFolder.title ? getFolder.title : "MyFolder"}
          </span>
          <div>
            <span
              className="dashboard-right-content"
              onClick={this.openAddSetModel}
              id="move"
            >
              <i className="fas fa-plus-circle fa-2x  "></i>
            </span>
            <UncontrolledTooltip placement="bottom" target="move">
              Add Sets
            </UncontrolledTooltip>

            <span id="share">
              <i className="fas fa-share fa-2x"></i>
            </span>
            <UncontrolledTooltip placement="bottom" target="share">
              Share
            </UncontrolledTooltip>
            <span id="edit">
              <i className="fas fa-sliders-h fa-2x"></i>
            </span>
            <UncontrolledTooltip placement="bottom" target="edit">
              Edit & Delete
            </UncontrolledTooltip>
          </div>
        </div>{" "}
        <span className="content-title">{getFolder.description}</span>
        <p>0 Sets</p>{" "}
        <div className="inner-wrap">
          <h3>This folder has no Sets yet</h3>
          <p>Organize your Sets for you or your students</p>
          <Button
            color="default"
            type="button"
            className="btn-btn-right"
            onClick={this.openAddSetModel}
          >
            Add a Set
          </Button>
          {/* <Row className="set-wrap">
            <Col md="12">
              <div className="tile-wrap card">
                <div className="cotent-tile d-flex">
                  <div className="cotent-text-tile">
                    <div className="content-number-tile"> 4 sets</div>
                    <div className="content-heading-tile"> Salsa Footwork</div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <div className="tile-wrap card">
                <div className="cotent-tile d-flex">
                  <div className="cotent-text-tile">
                    <div className="content-number-tile"> 8 sets</div>
                    <div className="content-heading-tile"> Group dance</div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <div className="tile-wrap card">
                <div className="cotent-tile d-flex">
                  <div className="cotent-text-tile">
                    <div className="content-number-tile"> 3 sets</div>
                    <div className="content-heading-tile"> Zumba </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <div className="tile-wrap card">
                <div className="cotent-tile d-flex">
                  <div className="cotent-text-tile">
                    <div className="content-number-tile"> 7 sets</div>
                    <div className="content-heading-tile">
                      {" "}
                      Salsa Partnerwork
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row> */}
        </div>
        <AddSetModal
          openAddSetModel={this.openAddSetModel}
          modelInfoReducer={modelInfoReducer}
          modelOperate={modelOperate}
          getAllSet={getAllSetReducer.allSetList}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    getFolder: state.getFolderReducer.getFolder,
    modelInfoReducer: state.modelInfoReducer,
    getAllSetReducer: state.getAllSetReducer
  };
};
const mapDispatchToProps = dispatch => ({
  getFolderRequest: data => dispatch(getFolderRequest(data)),
  modelOperate: data => dispatch(modelOpenRequest(data)),
  getSetList: () => {
    dispatch(getAllSetRequest());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecentFolderComponent);
