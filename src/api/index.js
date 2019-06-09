import * as R from "ramda";
import request from "superagent";

import phones from "./mockPhones";
import categories from "./mockCategories";

// fake request
export const fetchPhones = async () => {
  // return new Promise((resolve) => {
  //   resolve(phones);
  // });

  const { body } = await request.get("http://www.mocky.io/v2/5cfd7d203200005600ccd52c");
  return body.phones;
};

// fake request, в реальности же offset добавляется к url и запрашивает следующие товары
export const loadMorePhones = async ({ offset }) => {
  return new Promise((resolve) => {
    resolve(phones);
  });
};

export const fetchPhoneById = async (id) => {
  return new Promise((resolve) => {
    const phone = R.find(R.propEq("id", id), phones);
    resolve(phone);
  });
};

export const fetchCategories = async () => {
  return new Promise((resolve) => {
    resolve(categories);
  });
};
