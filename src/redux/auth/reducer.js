import { LOGIN_FAILED, LOGIN_SUCCESS } from "./type";

const token = "qwertyuiopkjbkjbibbbkhb";
const initialState = {
  token:
    localStorage.getItem("token") !== null
      ? localStorage.getItem("token")
      : null,
  isAuth: localStorage.getItem("token") !== null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", token);
      return {
        ...state,
        isAuth: true
      };
    case LOGIN_FAILED:
      return {
        ...state,
        isAuth: false
      };
    default:
      return {
        ...state
      };
  }
};
