import axios from "configs";
import { LOADING, LOADING_FINISH, SET_USERS } from "store/types";

export const loading = { type: LOADING };
export const loadingFinish = { type: LOADING_FINISH };

// source ini digunakan untuk management / CRUD Data User

export const fetchUsers = () => {
  return async (dispatch) => {
    const token = localStorage.token;
    try {
      dispatch(loading);
      const users = await axios.get(`/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //   console.log(users.data.data.user);

      dispatch({
        type: SET_USERS,
        users: users.data.data,
      });

      dispatch(loadingFinish);
    } catch (error) {
      console.log(error);
    }
  };
};
