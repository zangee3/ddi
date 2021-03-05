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

const token = "eyJhbGciOiJSUzUxMiIsImtpZCI6InNzcnNhMDEiLCJwaS5hdG0iOiIxIn0.eyJzY29wZSI6WyJvcGVuaWQiXSwiY2xpZW50X2lkIjoiZGRpLWRldiIsInN1YiI6ImU4OGMyNjRiLWEwMzMtNDdkZS1iMTdmLTUxNGIyOGUxNzg3MiIsInVpZCI6IkFITUVELlguU0hBTVMuLU5EQERJU05FWS5DT00iLCJuYW1lIjoiQWhtZWQgU2hhbXMiLCJnaXZlbl9uYW1lIjoiQWhtZWQiLCJmYW1pbHlfbmFtZSI6IlNoYW1zIiwiZW1haWwiOiJBSE1FRC5YLlNIQU1TLi1OREBESVNORVkuQ09NIiwiZXhwIjoxNjE0ODk1MzAwfQ.IXZCO6mMFFs2u5zES0oGbgyLVjjAfWuT4yAUBEP81n20SZRoYjgqCw3M8-I9R1NbH0Obm00owYJloqbOgBfzlaFFIcgGc5zShrDVq7pqtp2ZINRcpE69RgE7C-wedtmvj4AEfcNTfLroxHSvab7dr6R4IWr7j_o2eUudtTcJyq9ovUV1TzECuLDwuYzoW0hRN6zJL1sH2o99NfcMhU1bgHbA2B1xOTsNLK13PLF6c16vowZAGOg926vup3rzxN3nnnGkIiHGQIPCk4Ov2gA30eKLOSZaqXvmYi2CRwCOeTUrolwGtf4nK2kr8-3TJ8O93wrHfge1POtcfGlrihx_Eg";
const initialState = {
  token:
    localStorage.getItem("token") !== null
      ? localStorage.getItem("token")
      : null,
  isAuth: localStorage.getItem("token") !== null,
};
