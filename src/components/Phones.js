import React, { useEffect } from "react";
import { connect } from "react-redux";

import { fetchPhones } from "../actions";

const Phones = ({ fetchPhones }) => {
  useEffect(() => {
    fetchPhones();
  }, [fetchPhones]);
  return (
    <div>
      <h2>Phones</h2>
    </div>
  );
};

export default connect(
  null,
  { fetchPhones }
)(Phones);
