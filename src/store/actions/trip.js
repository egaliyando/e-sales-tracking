import axios from "configs";
import { LOADING, LOADING_FINISH, SET_TRIP } from "store/types";

export const loading = { type: LOADING };
export const loadingFinish = { type: LOADING_FINISH };

// source ini digunakan untuk management / CRUD Data Trip

export const fetchTrip = () => {
  return async (dispatch) => {
    const token = localStorage.token;
    try {
      dispatch(loading);
      const trip = await axios.get(`/trip`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(trip);

      dispatch({
        type: SET_TRIP,
        trip: trip.data.data,
      });

      dispatch(loadingFinish);
    } catch (error) {
      console.log(error);
    }
  };
};
