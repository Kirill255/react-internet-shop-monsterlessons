import {
  FETCH_PHONES_START,
  FETCH_PHONES_SUCCESS,
  FETCH_PHONES_FAIL,
  LOAD_MORE_PHONES_START,
  LOAD_MORE_PHONES_SUCCESS,
  LOAD_MORE_PHONES_FAIL
} from "../constants";
import { fetchPhones as fetchPhonesApi, loadMorePhones as loadMorePhonesApi } from "../api";
import { getRenderedPhonesLength } from "../selectors";

// thunk
export const fetchPhones = () => async (dispatch) => {
  dispatch({ type: FETCH_PHONES_START });

  try {
    const phones = await fetchPhonesApi();
    dispatch({ type: FETCH_PHONES_SUCCESS, payload: phones });
  } catch (err) {
    dispatch({ type: FETCH_PHONES_FAIL, payload: err, error: true });
  }
};

export const loadMorePhones = () => async (dispatch, getState) => {
  const offset = getRenderedPhonesLength(getState()); // получаем кол-во имеющихся записей
  dispatch({ type: LOAD_MORE_PHONES_START });

  try {
    const phones = await loadMorePhonesApi({ offset }); // запрашиваем новые записи с учётом смещения, например `offset = 6`, поэтому нужно вернуть не первые 6 записей, а следующие
    dispatch({ type: LOAD_MORE_PHONES_SUCCESS, payload: phones });
  } catch (err) {
    dispatch({ type: LOAD_MORE_PHONES_FAIL, payload: err, error: true });
  }
};
