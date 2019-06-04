import React from "react";

const withLayout = (Component) => () => (
  <div>
    <Component />
  </div>
);
export default withLayout;
