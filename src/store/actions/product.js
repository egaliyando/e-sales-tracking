import axios from "configs";
import { LOADING, LOADING_FINISH, SET_PRODUCT } from "store/types";

export const loading = { type: LOADING };
export const loadingFinish = { type: LOADING_FINISH };

// source ini digunakan untuk management / CRUD Data Apotik

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

export const productCreate = (value, history) => {
  const token = localStorage.token;

  axios
    .post(
      "/product",
      { name: value },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      history.push("/admin/product");
    })
    .catch((err) => {
      console.log(err.response);
    });
};
