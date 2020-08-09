import { SET_TOKEN, SET_TRIP } from "store/types";

let token = localStorage.getItem("token");
if (!token) {
  token = "";
}
const initialState = {
  token: token,
  trip: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case SET_TRIP:
      return {
        ...state,
        trip: action.trip,
      };
    default:
      return state;
  }
}
