import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { logout } from "../../redux/auth/action";
import { useDispatch } from "react-redux";

const PrivateHeader = () => {
  const dispatch = useDispatch();
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 navigation">
          <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <NavLink to="/home">HOME</NavLink>
                <NavLink to="/ddi">DDI</NavLink>
                <button
                  className="logout-btn"
                  onClick={() => {
                    dispatch(logout());
                  }}
                >
                  Log out
                </button>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
    </div>
  );
};
export default PrivateHeader;
