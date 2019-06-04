import * as R from "ramda";

import { FETCH_PHONES_SUCCESS } from "../constants";

const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_PHONES_SUCCESS:
      // трансформируем массив объектов в -> объект с key: object_id, value: object
      const newValues = R.indexBy(R.prop("id"), payload);
      return R.merge(state, newValues);

    default:
      return state;
  }
};
