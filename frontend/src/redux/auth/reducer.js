import { LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT, SET_USER_DATA } from "./type";

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case LOGIN_SUCCESS:
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
    case SET_USER_DATA:
      return {
        ...state,
        userData: "",
      };
    default:
      return state;
  }
};

const initialState = {
  token:
    localStorage.getItem("token") !== null
      ? localStorage.getItem("token")
      : null,
  isAuth: localStorage.getItem("token") !== null,
  userData: {},
};
