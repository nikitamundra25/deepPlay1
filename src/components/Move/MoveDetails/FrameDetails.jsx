import React, { Component } from "react";

class FrameDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { frames } = this.props;
    return (
      <>
        {frames.map((frame, index) => {
          return (
            <div
              key={index}
              style={{
                float: "left"
              }}
            >
              <img src={frame.img} alt={`Frame ${index + 1}`} width={100} />
              <br />
              <div className={"text-center"}>{frame.time}</div>
            </div>
          );
        })}
      </>
    );
  }
}

export default FrameDetails;
