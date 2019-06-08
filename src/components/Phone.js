import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as R from "ramda";
import { Link } from "react-router-dom";

import BasketCart from "./BasketCart";

import { fetchPhoneById, addPhoneToBasket } from "../actions";
import { getPhoneById } from "../selectors";

const renderFields = (phone) => {
  // R.compose -> позволяет комбинировать несколько функций, выполняет их справа налево, тоесть берём нужные поля, составляем пары ключ-значение, R.compose вызываем на phone
  // например R.compose(Math.abs, R.add(1), R.multiply(2))(-4) // => 7, берём -4 умножаем на 2, прибавляем 1 к -8, получаем модуль числа -7 => 7
  const columnFields = R.compose(
    R.toPairs, // сделать массив массивов [["cpu", "1.3GHz Apple A6"], ["camera", "8mp (3264x2448)"], ...]
    R.pick(["cpu", "camera", "size", "weight", "display", "battery", "memory"]) // взять только эти поля
  )(phone);
  // console.log(columnFields);
  return columnFields.map(([key, value]) => (
    <div className="column" key={key}>
      <div className="ab-details-title">
        <p>{key}</p>
      </div>
      <div className="ab-details-info">
        <p>{value}</p>
      </div>
    </div>
  ));
};

const renderContent = (phone) => (
  <div className="thumbnail">
    <div className="row">
      <div className="col-md-6">
        <img src={phone.image} alt={phone.name} className="img-thumbnail" />
      </div>
      <div className="col-md-6">{renderFields(phone)}</div>
    </div>
    <div className="caption-full">
      <h4 className="pull-right">$ {phone.price}</h4>
      <h4>{phone.name}</h4>
      <p>{phone.description}</p>
    </div>
  </div>
);

const renderSidebar = (phone, addPhoneToBasket) => (
  <div>
    <p className="lead">Quick shop</p>
    <BasketCart />
    <div className="form-group">
      <h1>{phone.name}</h1>
      <h2>$ {phone.price}</h2>
    </div>
    <Link to="/" className="btn btn-info btn-block">
      Back to store
    </Link>
    <button
      type="button"
      className="btn btn-success btn-block"
      onClick={() => addPhoneToBasket(phone.id)}
    >
      Add to cart
    </button>
  </div>
);

// форматирование пропсов говно -> prettier
// match приходит из роута
const Phone = ({
  fetchPhoneById,
  addPhoneToBasket,
  match: {
    params: { id }
  },
  phone
}) => {
  useEffect(() => {
    fetchPhoneById(id);
  }, [fetchPhoneById, id]);
  return (
    <div className="view-container">
      <div className="container">
        <div className="row">
          <div className="col-md-9">{phone && renderContent(phone)}</div>
          <div className="col-md-3">{phone && renderSidebar(phone, addPhoneToBasket)}</div>
        </div>
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    phone: getPhoneById(state, state.phonePage.id)
  }),
  { fetchPhoneById, addPhoneToBasket }
)(Phone);
