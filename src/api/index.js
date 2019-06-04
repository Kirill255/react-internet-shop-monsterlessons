import phones from "./mockPhones";

// fake request
export const fetchPhones = async () => {
  return new Promise((resolve) => {
    resolve(phones);
  });
};
