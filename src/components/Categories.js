import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getCategories } from "../selectors";

const Categories = ({ categories }) => {
  const renderCategory = (category, index) => (
    <Link to={`/categories/${category.id}`} key={index} className="list-group-item">
      {category.name}
    </Link>
  );

  return (
    <div className="well">
      <h4>Brand</h4>
      <div className="list-group">
        {categories.map((category, index) => renderCategory(category, index))}
      </div>
    </div>
  );
};

export default connect((state) => ({
  categories: getCategories(state)
}))(Categories);
