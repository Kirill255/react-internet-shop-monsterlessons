import * as R from "ramda";

export const getPhoneById = (state, id) => R.prop(id, state.phones);

/*
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
*/

// переписали чтобы фильтрация происходила не только по search а ещё и по категориям
export const getPhones = (state, ownProps) => {
  // R.when принимает первую ф-цию, которая возвращает true/false и в зависимости от этого выполняет или нет вторую ф-цию, тоесть мы применяем фильтр только тогда, когда есть активная категория
  // R.always возвращает функцию которая возвращает то что мы туда передадим, пример: R.always(activeCategoryId) тоже что и () => activeCategoryId

  const activeCategoryId = getActiveCategoryId(ownProps);
  const applySearch = (item) => R.contains(state.phonesPage.search, R.prop("name", item)); // ищем искомую подстроку в имени телефона(item)
  const applyCategory = (item) => R.equals(activeCategoryId, R.prop("categoryId", item)); // берём из item поле categoryId и проверяем равно ли оно activeCategoryId

  const phones = R.compose(
    R.filter(applySearch), // фильтруем массив по критерию поиска
    R.when(R.always(activeCategoryId), R.filter(applyCategory)), // когда у нас есть activeCategoryId, мы фильтруем по категории
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

export const getActiveCategoryId = (ownProps) => R.path(["match", "params", "id"], ownProps); // тоже что и ownProps.match.params.id, но R.path проверяет все вложенные свойства в пути на undefined и наш код не сломается, если какого-то свойства не будет

export const getBasketPhonesWithCount = (state) => {
  const uniqueIds = R.uniq(state.basket); // берём только уникальные ids
  const phoneCount = (id) =>
    R.compose(
      R.length, // берём длину массива, тоесть в нашем случае 2, это и будет кол-во(шт) телефонов
      R.filter((basketId) => R.equals(id, basketId)) // фильтруем по id, тоесть получаем массив из двух id=1
    )(state.basket); // сейчас в корзине исходный массив значений, не только уникальные, например два id=1 если мы добавили два телефона с id=1
  const phoneWithCount = (phone) => R.assoc("count", phoneCount(phone.id), phone); // добавляем поле count

  const phones = R.compose(
    R.map(phoneWithCount), // добавляем в каждый объект телефона новое поле с кол-вом заказанных штук
    R.map((id) => getPhoneById(state, id)) // получаем телефоны (объекты)
  )(uniqueIds);
  return phones;
};
