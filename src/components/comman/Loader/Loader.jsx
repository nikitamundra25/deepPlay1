import React from "react";
import loader from "../../../assets/img/loder/loader.svg";
import "./index.scss";

const Loader = ({props}) => {
  console.log("props", props);
  return (
    <div className={"loader-wrap"}>
      {/* {props.innerLoader ? ""} */}
      <div className={"loader-block"}>
        <img src={loader} alt={"loader"} />
      </div>
    </div>
  );
};

export default Loader;
