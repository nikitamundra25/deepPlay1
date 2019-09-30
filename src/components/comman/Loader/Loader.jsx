import React from "react";
import loader from "../../../assets/img/loder/loader.svg"
import "./index.scss";

const Loader = () => {
  return (
    <div className={"text-center"}>
      <div className={"text-center"}>
        <img src={loader} alt={"loader"}/>
      </div>
    </div>
  );
};

export default Loader;