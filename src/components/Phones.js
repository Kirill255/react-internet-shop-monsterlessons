import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as R from "ramda";

import { fetchPhones } from "../actions";
import { getPhones } from "../selectors";

// const shortDescription = (desc) => R.take(60, desc);
const shortDescription = (desc) => `${R.take(60, desc)}...`;

const renderPhone = (phone, index) => (
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
          <button className="btn btn-primary" type="button">
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

const Phones = ({ fetchPhones, phones }) => {
  useEffect(() => {
    fetchPhones();
  }, [fetchPhones]);
  return (
    <div>
      <div className="books row">{phones.map((phone, index) => renderPhone(phone, index))}</div>
    </div>
  );
};

export default connect(
  (state) => ({
    phones: getPhones(state)
  }),
  { fetchPhones }
)(Phones);
