import * as R from "ramda";

import { FETCH_PHONE_BY_ID_SUCCESS } from "../constants";

// id телефона на страницу которого зашли
const initialState = {
  id: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_PHONE_BY_ID_SUCCESS:
      // получаем id из payload
      return R.merge(state, {
        id: R.prop("id", payload) // тоже самое что payload.id
      });

    default:
      return state;
  }
};
