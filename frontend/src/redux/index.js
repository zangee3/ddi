import { combineReducers } from "redux";
import {reducer as toastrReducer} from 'react-redux-toastr'
import auth from "./auth/reducer";
import dns from "./dns/index"

export default combineReducers({
  auth,
  dns,
  toastr: toastrReducer
});
