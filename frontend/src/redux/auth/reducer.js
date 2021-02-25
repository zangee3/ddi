import { LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT } from "./type";

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", token);
      return {
        ...state,
        isAuth: true,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        isAuth: false,
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuth: false,
      };
    default:
      return state;
  }
};

const token = "qwertyuiopkjbkjbibbbkhb";
const initialState = {
  token:
    localStorage.getItem("token") !== null
      ? localStorage.getItem("token")
      : null,
  isAuth: localStorage.getItem("token") !== null,
};
