// src/redux/reducers/clientReducer.js
const initialState = {
  user: null,
  addressList: [],
  creditCards: [],
  roles: [],
  theme: "light",
  language: "en",
};

const SET_USER = "SET_USER";
const SET_ROLES = "SET_ROLES";
const SET_THEME = "SET_THEME";
const SET_LANGUAGE = "SET_LANGUAGE";
const SET_ADDRESS_LIST = "SET_ADDRESS_LIST";
const SET_CREDIT_CARDS = "SET_CREDIT_CARDS";

export default function clientReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER: return { ...state, user: action.payload };
    case SET_ROLES: return { ...state, roles: action.payload };
    case SET_THEME: return { ...state, theme: action.payload };
    case SET_LANGUAGE: return { ...state, language: action.payload };
    case SET_ADDRESS_LIST: return { ...state, addressList: action.payload };
    case SET_CREDIT_CARDS: return { ...state, creditCards: action.payload };
    default: return state;
  }
}

// Action Creators
export const setUser = (user) => ({ type: SET_USER, payload: user });
export const setRoles = (roles) => ({ type: SET_ROLES, payload: roles });
export const setTheme = (theme) => ({ type: SET_THEME, payload: theme });
export const setLanguage = (lang) => ({ type: SET_LANGUAGE, payload: lang });
export const setAddressList = (list) => ({ type: SET_ADDRESS_LIST, payload: list });
export const setCreditCards = (cards) => ({ type: SET_CREDIT_CARDS, payload: cards });
