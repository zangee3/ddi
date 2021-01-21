import React from 'react'
import Home from '../../views/Pages/PrivatePages/Home'
import Network from '../../views/Pages/PrivatePages/Network'
import Firewall from '../../views/Pages/PrivatePages/Firewall'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom';
import {logout} from '../../redux/auth/action'
import { useDispatch, useSelector } from "react-redux";

const PrivateHeader=()=> {
    const dispatch=useDispatch()
    return (
        <div className="container">
            <div className="row">
        <div className="col-md-12 navigation">

<Navbar collapseOnSelect expand="lg" bg="light" variant="light">

  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <NavLink  to='/home' >HOME</NavLink>
      <NavLink  to='/dns'>DNS</NavLink>
      <NavLink  to='/firewall'>FIREWALL</NavLink>
      <NavLink  to='/network'>NETWORK</NavLink>
      <button className="logout-btn" onClick={()=>{
          dispatch(logout())
      }}>Log out</button>
    </Nav>
  </Navbar.Collapse>
</Navbar>
        </div>
        </div>
        </div>
    )
}
export default PrivateHeader;
