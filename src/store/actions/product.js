import axios from "configs";
import { LOADING, LOADING_FINISH, SET_PRODUCT } from "store/types";

export const loading = { type: LOADING };
export const loadingFinish = { type: LOADING_FINISH };

export const fetchProduct = () => {
  return async (dispatch) => {
    const token = localStorage.token;
    try {
      dispatch(loading);
      const product = await axios.get(`/product`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({
        type: SET_PRODUCT,
        product: product.data.data,
      });

      dispatch(loadingFinish);
    } catch (error) {
      console.log(error);
    }
  };
};
