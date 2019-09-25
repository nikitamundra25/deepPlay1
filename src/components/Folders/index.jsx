import React from "react";
import { Row, Col, UncontrolledTooltip } from "reactstrap";
import FolderModal from "./createFolderModal";
// core components
class FolderComponent extends React.Component {
  render() {
    const { modelInfoReducer, modelOperate } = this.props;
    return (
      <div className="page-body">
        <div className="content-header">
          <span className="content-title">Your Folders</span>
          <span onClick={this.props.handleFolderModel} id="move">
            <i className="fas fa-plus-circle fa-2x  "></i>
          </span>
          <UncontrolledTooltip placement="bottom" target="move">
            Create a New Folder
          </UncontrolledTooltip>
        </div>
        <Col></Col>
        <p>4 folders total</p>{" "}
        <div className="wrap-folder">
          <Row className="set-wrap">
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
          </Row>
          <FolderModal
            modelOperate={modelOperate}
            modelInfoReducer={modelInfoReducer}
            createFolder={this.props.createFolder}
          />
        </div>
      </div>
    );
  }
}

export default FolderComponent;
