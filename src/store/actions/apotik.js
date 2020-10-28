import axios from "configs";
import { LOADING, LOADING_FINISH, SET_APOTIK } from "store/types";

export const loading = { type: LOADING };
export const loadingFinish = { type: LOADING_FINISH };

// source ini digunakan untuk management / CRUD Data Apotik

export const fetchApotik = () => {
  return async (dispatch) => {
    const token = localStorage.token;
    try {
      dispatch(loading);
      const apotik = await axios.get(`/apotik`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({
        type: SET_APOTIK,
        apotik: apotik.data.data,
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
