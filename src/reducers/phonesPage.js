import * as R from "ramda";

import { FETCH_PHONES_SUCCESS, LOAD_MORE_PHONES_SUCCESS } from "../constants";

// ids телефонов которые будут отображаться только на странице телефонов
const initialState = {
  ids: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_PHONES_SUCCESS:
      // вытаскиваем все ids из объектов
      return R.merge(state, {
        ids: R.pluck("id", payload)
      });

    case LOAD_MORE_PHONES_SUCCESS:
      const ids = R.pluck("id", payload);
      // мержим старые ids и новые
      return R.merge(state, {
        ids: R.concat(state.ids, ids)
      });

    default:
      return state;
  }
};
