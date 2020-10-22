// import { SET_RADIUS } from "store/types";

// export const changeRadius = () => {
//   return async (dispatch) => {
//     const token = localStorage.token;
//     try {
//       dispatch(loading);
//       const radius = await axios.get(`/product`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       dispatch({
//         type: SET_RADIUS,
//         radius: radius,
//       });

//       dispatch(loadingFinish);
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };
