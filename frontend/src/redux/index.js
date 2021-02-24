import { combineReducers } from "redux";

import auth from "./auth/reducer";
import dns from "./dns/index"

export default combineReducers({
  auth,
  dns
});
