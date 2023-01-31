import React from "react";
import "./Loading.css";
import { BounceLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="background">
      <BounceLoader color="#6da0f7" />
    </div>
  );
};

export default Loading;
