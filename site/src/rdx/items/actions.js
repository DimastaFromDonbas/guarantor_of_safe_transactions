export const SET_COUNTRIES = '@items/SET_COUNTRIES';
export const SET_PRODUCTS = '@items/SET_PRODUCTS';
export const SET_CURRENCIES = '@items/SET_CURRENCIES';
export const INCREASE_PRODUCT_VALUE = '@items/INCREASE_PRODUCT_VALUE';
export const DECREASE_PRODUCT_VALUE = '@items/DECREASE_PRODUCT_VALUE';
export const USER_DATA = '@items/USER_DATA';
export const INPUT_NAME = '@items/INPUT_NAME';

export const setCountries = (item) => {
  return {
    type: SET_COUNTRIES,
    payload: item,
  }
}

export const setProducts = (item) => {
  return {
    type: SET_PRODUCTS,
    payload: item,
  }
}

export const setAllCurrencies = (item) => {
  return {
    type: SET_CURRENCIES,
    payload: item,
  }
}

export const increaseProductValue = (item) => {
  return {
    type: INCREASE_PRODUCT_VALUE,
    payload: item,
  }
}

export const decreaseProductValue = (item) => {
  return {
    type: DECREASE_PRODUCT_VALUE,
    payload: item,
  }
}

export const UserData = (item) => {
  return {
    type: USER_DATA,
    payload: item,
  }
}

export const inputName = (item) => {
  return {
    type: INPUT_NAME,
    payload: item,
  }
}