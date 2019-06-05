import phones from "./mockPhones";

// fake request
export const fetchPhones = async () => {
  return new Promise((resolve) => {
    resolve(phones);
  });
};

// fake request, в реальности же offset добавляется к url и запрашивает следующие товары
export const loadMorePhones = async ({ offset }) => {
  return new Promise((resolve) => {
    resolve(phones);
  });
};
