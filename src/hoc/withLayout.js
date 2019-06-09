import React from "react";
import Sidebar from "../components/Sidebar";

const withLayout = (Component) => (props) => (
  <div className="view-container">
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <Component {...props} />
        </div>
      </div>
    </div>
  </div>
);
export default withLayout;
