import { combineReducers } from "redux";

import mx from "./mx/reducer";
import txt from "./txt/reducer";

export default combineReducers({
    mx,
    txt
});
