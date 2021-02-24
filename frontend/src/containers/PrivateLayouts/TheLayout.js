import React, { Fragment } from "react";
import TheContent from "./TheContent";
import PrivateHeader from "./PrivateHeader";
import { Nav } from "react-bootstrap";
import { Menu, MenuItem, ProSidebar, SubMenu } from "react-pro-sidebar";
import { NavLink } from "react-router-dom";

const TheLayout = (props) => {
  // console.log(props)
  return (
    <Fragment>
      <PrivateHeader />
      <div className={`tab-container `}>
        <div className="container">
          <div className="row">
            <div className="col-md-3 navigation sidebar">
              <Nav variant="pills" className="flex-column">
                <ProSidebar>
                  <Menu iconShape="round" popperArrow={true} >
                    <SubMenu title="DNS" icon={""}>
                      <MenuItem>
                        Host Records <NavLink to="/ddi/host" />
                      </MenuItem>
                      <MenuItem>
                        MX Records <NavLink to="/ddi/mx" />
                      </MenuItem>
                      <MenuItem>
                        TXT Records <NavLink to="/ddi/txt" />
                      </MenuItem>
                    </SubMenu>
                    <MenuItem icon={""}>DHCP</MenuItem>
                    <MenuItem icon={""}>IPAM</MenuItem>
                  </Menu>
                </ProSidebar>
              </Nav>
            </div>
            <div className="col-md-9 ">
              <TheContent />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TheLayout;
