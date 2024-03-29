import * as R from "ramda";

import {
  FETCH_PHONES_SUCCESS,
  LOAD_MORE_PHONES_SUCCESS,
  FETCH_PHONE_BY_ID_SUCCESS
} from "../constants";

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

    case FETCH_PHONE_BY_ID_SUCCESS:
      // хотим добавить в state по ключу payload.id объект payload
      return R.assoc(payload.id, payload, state);

    default:
      return state;
  }
};
