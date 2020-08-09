import { combineReducers } from "redux";
import users from "./users";
import loading from "./loading";
import product from "./product";
import apotik from "./apotik";
import trip from "./trip";

export default combineReducers({
  users,
  loading,
  product,
  apotik,
  trip,
});
