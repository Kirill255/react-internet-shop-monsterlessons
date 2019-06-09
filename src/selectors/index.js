import * as R from "ramda";

export const getPhoneById = (state, id) => R.prop(id, state.phones);

export const getPhones = (state) => {
  // const phones = R.map((id) => getPhoneById(state, id), state.phonesPage.ids);
  // return phones;

  // теперь нам нужно дополнительно к map применить ещё и filter(search)
  const applySearch = (item) => R.contains(state.phonesPage.search, R.prop("name", item)); // ищем искомую подстроку в имени телефона(item)
  const phones = R.compose(
    R.filter(applySearch), // фильтруем массив по критерию поиска
    R.map((id) => getPhoneById(state, id)) // получили массив объектов телефонов
  )(state.phonesPage.ids); // вот у нас есть айдишники

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

export const getCategories = (state) => R.values(state.categories); // R.values берёт все значения из объекта и засовывает в массив
