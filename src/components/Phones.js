import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as R from "ramda";

import { fetchPhones, fetchCategories, loadMorePhones, addPhoneToBasket } from "../actions";
import { getPhones } from "../selectors";

// const shortDescription = (desc) => R.take(60, desc);
const shortDescription = (desc) => `${R.take(60, desc)}...`;

const renderPhone = (phone, index, addPhoneToBasket) => (
  <div key={index} className="col-sm-4 col-lg-4 col-md-4 book-list">
    <div className="thumbnail">
      <img src={phone.image} alt={phone.name} className="img-thumbnail" />
      <div className="caption">
        <h4 className="pull-right">$ {phone.price}</h4>
        <h4>
          <Link to={`/phones/${phone.id}`}>{phone.name}</Link>
        </h4>
        <p>{shortDescription(phone.description)}</p>
        <p className="itemButton">
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => addPhoneToBasket(phone.id)}
          >
            Buy now!
          </button>
          <Link to={`/phones/${phone.id}`} className="btn btn-default">
            More info
          </Link>
        </p>
      </div>
    </div>
  </div>
);

const Phones = ({ fetchPhones, fetchCategories, loadMorePhones, addPhoneToBasket, phones }) => {
  useEffect(() => {
    fetchPhones();
    fetchCategories();
  }, [fetchPhones, fetchCategories]);
  return (
    <div>
      <div className="books row">
        {phones.map((phone, index) => renderPhone(phone, index, addPhoneToBasket))}
      </div>
      <div className="row">
        <div className="col-md-12">
          <button className="pull-right btn btn-primary" type="button" onClick={loadMorePhones}>
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};

// тут ownProps доступны сразу без withRouter (как в Categories компоненте), так как компонент Phones сам по себе является компонентом роутом
export default connect(
  (state, ownProps) => ({
    phones: getPhones(state, ownProps)
  }),
  { fetchPhones, fetchCategories, loadMorePhones, addPhoneToBasket }
)(Phones);
