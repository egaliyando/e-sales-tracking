import { combineReducers } from "redux";
import users from "./users";
import loading from "./loading";
import product from "./product";

export default combineReducers({
  users,
  loading,
  product,
});
