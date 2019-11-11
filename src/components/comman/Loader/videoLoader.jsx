import React from "react";
import loader from "../../../assets/img/loder/new-resize.gif";
import "./index.scss";

const VideoLoader = props => {
  console.log("props", props);
  return (
    <div
      className={
        "loader-video-wrap " +
        (props.fullLoader ? "full-loader" : "inner-loader")
      }
    >
      <div className={"loader-block flex-column"}>
        <div className="video-loader-wrap">
          <div className="video-loader-img text-center ">
            <img src={loader} alt={"loader"} width={"100%"} height={"auto"} />
          </div>
          <div className="h4 videos-loader-text">
            Your move is preparing please wait...
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoLoader;
