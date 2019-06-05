import * as R from "ramda";

import { FETCH_PHONES_SUCCESS, LOAD_MORE_PHONES_SUCCESS } from "../constants";

const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_PHONES_SUCCESS:
      // трансформируем массив объектов в -> объект с key: object_id, value: object
      const newValues = R.indexBy(R.prop("id"), payload);
      return R.merge(state, newValues);

    case LOAD_MORE_PHONES_SUCCESS:
      // в данный момент у нас фейк-запрос, который возвращает такой же ответ, обрабатываем также
      const moreValues = R.indexBy(R.prop("id"), payload);
      return R.merge(state, moreValues);

    default:
      return state;
  }
};
