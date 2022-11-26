import "antd/dist/antd.min.css";

import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

import { Recognizer } from "./recognizer";
import { Affectiva } from "./affectiva";

ReactDOM.render(
  <React.StrictMode>
    <div className="wrapper">
      <Affectiva />
      <Recognizer />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
