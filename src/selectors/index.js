import * as R from "ramda";

export const getPhoneById = (state, id) => R.prop(id, state.phones);

export const getPhones = (state) => {
  const phones = R.map((id) => getPhoneById(state, id), state.phonesPage.ids);
  return phones;
};

export const getRenderedPhonesLength = (state) => R.length(state.phonesPage.ids);

export const getTotalBasketCount = (state) => R.length(state.basket);

export const getTotalBasketPrice = (state) => {
  // R.compose выполняет функции справа налево, ну или в этом форматировании снизу вверх
  const totalPrice = R.compose(
    R.sum, // суммировали цены
    R.pluck("price"), // оставили только цены
    R.map((id) => getPhoneById(state, id)) // получили телефоны
  )(state.basket);

  return totalPrice;
};
