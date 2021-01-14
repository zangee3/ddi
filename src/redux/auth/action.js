import { LOGIN_FAILED, LOGIN_SUCCESS } from "./type";

const loginData = {
  userName: "admin@gmail.com",
  passWord: "admin"
};
export const login = data => async dispatch => {
  if (
    data.userName == loginData.userName &&
    data.password == loginData.passWord
  ) {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data
    });

    window.location.href = "/dns/setting";
  } else {
    dispatch({
      type: LOGIN_FAILED
    });
  }
};
