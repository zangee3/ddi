import React, { useEffect } from "react";
import { queryString } from "../../../../utils/qs";
import { useDispatch } from "react-redux";
import { setUserData } from "../../../../redux/auth/action";

const ThirdPartyLogin = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const issuer = queryString(props.location.search).issuer;
    const sessionIndex = queryString(props.location.search).sessionIndex;
    const firstname = queryString(props.location.search).firstname;
    const lastname = queryString(props.location.search).lastname;
    const email = queryString(props.location.search).email;
    localStorage.setItem("token", sessionIndex);
    localStorage.setItem("firstname", firstname);
    localStorage.setItem("lastname", lastname);
    localStorage.setItem("email", email);
    dispatch(setUserData({ issuer, sessionIndex, firstname, lastname, email }));
    window.location.href = "/";
  }, []);

  return (
    <div className="login-form-sec-outer">
      <div className="login-form-sec-inner">
        <div className="login-form login-form-sec">
          <form className="mb-4" autoComplete="off">
            <div className="form-group">
              <div className="alert alert-success" role="alert">
                <h3>Please wait, Signing you in...</h3>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ThirdPartyLogin;
