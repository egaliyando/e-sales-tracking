import { SET_TOKEN, SET_APOTIK } from "store/types";

let token = localStorage.getItem("token");
if (!token) {
  token = "";
}
const initialState = {
  token: token,
  apotik: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case SET_APOTIK:
      return {
        ...state,
        apotik: action.apotik,
      };
    default:
      return state;
  }
}
