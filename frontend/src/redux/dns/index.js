import { combineReducers } from "redux";

import mx from "./mx/reducer";
import txt from "./txt/reducer";
import host from "./host/reducer";

export default combineReducers({
    mx,
    txt,
    host
});
