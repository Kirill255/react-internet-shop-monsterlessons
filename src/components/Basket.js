import React from "react";
import { connect } from "react-redux";
import * as R from "ramda";

import { getBasketPhonesWithCount, getTotalBasketPrice } from "../selectors";

const Basket = ({ phones, totalBasketPrice }) => {
  const isBasketEmpty = R.isEmpty(phones); // пустая корзина или нет

  const renderContent = () => (
    <div>
      {isBasketEmpty && <div>Your shopping cart is empty</div>}

      <div className="table-responsive">
        <table className="table-bordered table-striped table-condensed cf">
          <tbody>
            {phones.map((phone, index) => (
              <tr key={index} className="item-checout">
                <td className="first-column-checkout">
                  <img className="img-thumbnail" src={phone.image} alt={phone.name} />
                </td>
                <td>{phone.name}</td>
                <td>$ {phone.price}</td>
                <td>{phone.count}</td>
                <td>
                  <span className="delete-cart" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {R.not(isBasketEmpty) && (
        <div className="row">
          <div className="pull-right total-user-checkout">
            <b>Total:</b>$ {totalBasketPrice}
          </div>
        </div>
      )}
    </div>
  );

  const renderSidebar = () => <div>Sidebar</div>;

  return (
    <div className="view-container">
      <div className="container">
        <div className="row">
          <div className="col-md-9">{renderContent()}</div>
          <div className="col-md-3 btn-user-checkout">{renderSidebar()}</div>
        </div>
      </div>
    </div>
  );
};

export default connect((state) => ({
  phones: getBasketPhonesWithCount(state),
  totalBasketPrice: getTotalBasketPrice(state)
}))(Basket);
