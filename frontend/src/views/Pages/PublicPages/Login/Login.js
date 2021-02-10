import React from "react";
import { useForm } from "react-hook-form";
import { login } from "../../../../redux/auth/action";
import { useDispatch } from "react-redux";
import axios from "axios";

const Login = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm({
    mode: "onChange",
  });

  const loginUser = (value) => {
    const loginData = {
      userName: value.email,
      password: value.password,
    };
    dispatch(login(loginData));
  };

  const authenticate = () => {
    window.location.href = "https://idp.myid-stg.disney.com/as/authorization.oauth2?client_id=ddi-dev&response_type=id_token+token&redirect_uri=http://localhost:3000/callback&nonce=APPLICATION_GENERATED_ONE_TIME_NONCE&scope=openid"
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
          <form
            className="mb-4"
            onSubmit={handleSubmit(loginUser)}
            autoComplete="off"
          >
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Email address"
                aria-describedby="emailHelp"
                name="email"
                ref={register({
                  required: {
                    value: true,
                    message: "Please enter your email",
                  },
                })}
              />
              {errors.email && (
                <p className="customErrors text-danger mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="form-group password-input">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                id="passInput"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                name="password"
                ref={register({ required: true })}
              />
              {errors.password && (
                <p className="customErrors text-danger mt-2">
                  Please enter password
                </p>
              )}
            </div>
            <div className="form-check">
              <label className="form-check-label" htmlFor="rememberPassword">
                Remember me
              </label>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              {"Log In"}
            </button>

            {/*<Dimmer active={loading} inverted><Loader active={loading} className={'lcolor'}/></Dimmer>*/}
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
