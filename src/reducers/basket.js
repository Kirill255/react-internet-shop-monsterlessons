import * as R from "ramda";

import { ADD_PHONE_TO_BASKET, REMOVE_PHONE_FROM_BASKET, CLEAN_BASKET } from "../constants";

// ids телефонов которые добавили в корзину
const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_PHONE_TO_BASKET:
      // добавляем id в state
      return R.append(payload, state);

    case REMOVE_PHONE_FROM_BASKET:
      // удаляем все ids равные id из стейта(массива)
      return R.without(R.of(payload), state); // R.of(payload) превращает значение в массив, это равнозначно [payload]

    case CLEAN_BASKET:
      return [];

    default:
      return state;
  }
};
