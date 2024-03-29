import {
  FETCH_PHONES_START,
  FETCH_PHONES_SUCCESS,
  FETCH_PHONES_FAIL,
  LOAD_MORE_PHONES_START,
  LOAD_MORE_PHONES_SUCCESS,
  LOAD_MORE_PHONES_FAIL,
  FETCH_PHONE_BY_ID_START,
  FETCH_PHONE_BY_ID_SUCCESS,
  FETCH_PHONE_BY_ID_FAIL,
  ADD_PHONE_TO_BASKET,
  SEARCH_PHONE,
  FETCH_CATEGORIES_START,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAIL,
  REMOVE_PHONE_FROM_BASKET,
  CLEAN_BASKET
} from "../constants";
import {
  fetchPhones as fetchPhonesApi,
  loadMorePhones as loadMorePhonesApi,
  fetchPhoneById as fetchPhoneByIdApi,
  fetchCategories as fetchCategoriesApi
} from "../api";
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

export const fetchPhoneById = (id) => async (dispatch, getState) => {
  dispatch({ type: FETCH_PHONE_BY_ID_START });

  try {
    const phone = await fetchPhoneByIdApi(id);
    dispatch({ type: FETCH_PHONE_BY_ID_SUCCESS, payload: phone });
  } catch (err) {
    dispatch({ type: FETCH_PHONE_BY_ID_FAIL, payload: err, error: true });
  }
};

export const addPhoneToBasket = (id) => (dispatch) => {
  dispatch({ type: ADD_PHONE_TO_BASKET, payload: id });
};

export const searchPhone = (text) => (dispatch) => {
  dispatch({ type: SEARCH_PHONE, payload: text });
};

export const fetchCategories = () => async (dispatch) => {
  dispatch({ type: FETCH_CATEGORIES_START });

  try {
    const categories = await fetchCategoriesApi();
    dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: categories });
  } catch (err) {
    dispatch({ type: FETCH_CATEGORIES_FAIL, payload: err, error: true });
  }
};

export const removePhoneFromBasket = (id) => (dispatch) => {
  dispatch({ type: REMOVE_PHONE_FROM_BASKET, payload: id });
};

export const cleanBasket = () => (dispatch) => {
  dispatch({ type: CLEAN_BASKET });
};

// fake action, просто выведем заказ в alert
export const basketCheckout = (phones) => (dispatch) => {
  alert(JSON.stringify(phones));
};
