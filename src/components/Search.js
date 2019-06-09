import React, { useState } from "react";
import { connect } from "react-redux";

import { searchPhone } from "../actions";

const Search = ({ searchPhone }) => {
  const [text, setText] = useState("");

  const handleChange = (e) => setText(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    searchPhone(text);
  };

  return (
    <div className="well blosd">
      <h3 className="lead">Quick shop</h3>
      <div className="input-group">
        <form onSubmit={handleSubmit}>
          <input type="text" className="form-control" value={text} onChange={handleChange} />
        </form>
        <span className="input-group-btn">
          <button type="button" className="btn btn-default" onClick={handleSubmit}>
            <span className="glyphicon glyphicon-search" />
          </button>
        </span>
      </div>
    </div>
  );
};

export default connect(
  null,
  { searchPhone }
)(Search);
