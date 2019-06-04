import React from "react";

const withLayout = (Component) => () => (
  <div className="view-container">
    <div className="container">
      <div className="row">
        <div className="col-md-3">Sidebar</div>
        <div className="col-md-9">
          <Component />
        </div>
      </div>
    </div>
  </div>
);
export default withLayout;
