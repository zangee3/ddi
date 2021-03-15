import React from "react";
import { useForm } from "react-hook-form";
import { login } from "../../../../redux/auth/action";
import { useDispatch } from "react-redux";
const envData = require("../../../../env.json");
const config = envData[process.env.REACT_APP_NODE_ENV];
console.log(config);
const Login = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm({
    mode: "onChange",
  });

  /**
   * @param value
   */
  const loginUser = (value) => {
    const loginData = {
      userName: value.email,
      password: value.password,
    };
    dispatch(login(loginData));
  };

  const authenticate = () => {
    window.location.href = config.baseURL + "/sso/login";
  };

  return (
    <div className="login-form-sec-outer">
      <div className="login-form-sec-inner">
        <div className="login-form login-form-sec">
          <div style={{ margin: "0 0 20px" }}>
            <button className="btn btn-primary w-100" onClick={authenticate}>
              <a style={{ color: "white" }}>
                Login with{" "}
                <img
                  _ngcontent-eku-c13=""
                  src="https://solo.myid-stg.disney.com/assets/myid.png"
                  style={{ height: "19px" }}
                />
              </a>
            </button>
          </div>          
        </div>
      </div>
    </div>
  );
};
export default Login;
