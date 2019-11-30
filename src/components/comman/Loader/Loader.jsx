import React from "react";
import loader from "../../../assets/img/loder/loader.svg";
import "./index.scss";

const Loader = (props) => {
  return (
    <div className={  "loader-wrap " + (props.fullLoader ? 'full-loader' : 'inner-loader')}>
    
      <div className={"loader-block"}>
        <img src={loader} alt={"loader"} />
      </div>
    </div>
  );
};

export default Loader;
