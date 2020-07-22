import { SET_PRODUCT } from "store/types";

const initialState = {
  product: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCT:
      return {
        ...state,
        product: action.product,
      };
    default:
      return state;
  }
}
