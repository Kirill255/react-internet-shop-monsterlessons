import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import * as R from "ramda";
import classNames from "classnames";

import { getCategories, getActiveCategoryId } from "../selectors";

const Categories = ({ categories, activeCategoryId }) => {
  const renderCategory = (category, index) => {
    const getActiveState = R.propEq("id", activeCategoryId); // проверяет что category.id === activeCategoryId

    const linkClass = classNames({
      "list-group-item": true, // всегда true
      active: getActiveState(category) // true or false
    });

    return (
      <Link to={`/categories/${category.id}`} key={index} className={linkClass}>
        {category.name}
      </Link>
    );
  };

  const renderAllCategory = () => {
    const linkClass = classNames({
      "list-group-item": true,
      active: R.isNil(activeCategoryId) // active если свойство activeCategoryId пустое, тоесть undefined
    });

    return (
      <Link to="/" className={linkClass}>
        All
      </Link>
    );
  };

  return (
    <div className="well">
      <h4>Brand</h4>
      <div className="list-group">
        {renderAllCategory()}
        {categories.map((category, index) => renderCategory(category, index))}
      </div>
    </div>
  );
};

// export default connect((state) => ({
//   categories: getCategories(state)
// }))(Categories);

// https://stackoverflow.com/questions/46485056/withrouter-connect-and-react-compose

// === можно завернуть как в hoc ===
// export default withRouter(connect(mapStateToProps)(Component))

// export default withRouter(
//   connect((state) => ({
//     categories: getCategories(state)
//   }))(Categories)
// );

// === можно с compose из redux ===
// export default compose(
//   withRouter,
//   connect(mapStateToProps)
// )(Component);

// export default compose(
//   withRouter,
//   connect((state) => ({
//     categories: getCategories(state)
//   }))
// )(Categories);

export default compose(
  withRouter,
  connect((state, ownProps) => ({
    categories: getCategories(state),
    activeCategoryId: getActiveCategoryId(ownProps)
  }))
)(Categories);
