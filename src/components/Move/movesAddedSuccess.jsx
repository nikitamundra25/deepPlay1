import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
} from "reactstrap";
import "./index.scss";

// core components
class MoveAddedSuccess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      errors: "",
      isPaste: false
    };
  }

  render() {
    return (
      <>
        <div className="create-set-section step-2 ">
          <Card className="w-100 set-content-wrap">
            <div className="set-content-block w-100">
              <CardHeader className="">
                <div className="content-header set-header flex-column">
                  <span className="content-title"> your move has been created!</span>
                </div>
              </CardHeader>
              <CardBody className="">
                <div className="d-flex vieos-add-section video-add-banner justify-content-center align-items-center">
                  <span className="play-ic-wrap">
                    <i className="fa fa-play" aria-hidden="true"></i>
                  </span>
                </div>
                <p className="font-weight-bold mt-3 text-center h5">Would you like to create another Move from the same video?</p>
                <div className="text-center mt-4">
                  <Button className="btn-line-black">Yes create another</Button>
                  <Button className="btn-black">No i'am done</Button>
                </div>
              </CardBody>
            </div>
          </Card>
        </div>
      </>
    );
  }
}

export default MoveAddedSuccess
