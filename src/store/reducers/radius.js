import { SET_RADIUS } from "store/types";

const initialState = {
  radius: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_RADIUS:
      return {
        ...state,
        radius: action.radius,
      };
    default:
      return state;
  }
}
