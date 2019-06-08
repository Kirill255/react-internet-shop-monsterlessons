import * as R from "ramda";

import { ADD_PHONE_TO_BASKET } from "../constants";

// ids телефонов которые добавили в корзину
const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_PHONE_TO_BASKET:
      // добавляем id в state
      return R.append(payload, state);

    default:
      return state;
  }
};
