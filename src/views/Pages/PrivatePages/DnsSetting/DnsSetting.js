import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../../../../App.css";
import DNSOptions from "../../../Components/DNSOptions";
import CNameOptions from "../../../Components/CNameOptions";
import TxtOptions from "../../../Components/TxtOptions";
import MXOptions from "../../../Components/MXOptions";
import { Nav, Tabs, Tab } from "react-bootstrap";
const DnsSetting = () => {
  const [toggleInx, setToggleInx] = useState(false);

  const toggleFunc = () => {
    setToggleInx(!toggleInx);
  };

  return (
    <div className="container">
      <div className="nav-toggle-col" onClick={toggleFunc}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="clear"></div>
      
      <div 
      className={`tab-container ${toggleInx ? "active" : "inactive"}`}
  >
      <Tabs defaultActiveKey="DNS" transition={false} id="noanim-tab-example">
  <Tab eventKey="DNS" title="DNS">
  <div className="row">
    
    <div
      className="col-md-3 navigation "
    >
      <Nav
        activeKey="/home"
        // onSelect={selectedKey => alert(`selected ${selectedKey}`)}
      >
        <Nav.Item>
          <Nav.Link href="/home">A Records</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">CNAME Records</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">TXT Records</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-3">MX Records</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
    <div className="col-md-9 form-sec">
      <DNSOptions />
      <CNameOptions />
      <TxtOptions />
      <MXOptions />
    </div>
  </div>

  </Tab>
  <Tab eventKey="Firewall" title="Firewall">
  <div className="row">
      <div className="col-md-12">
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti.</p>
      </div>
    </div>
  </Tab>
  <Tab eventKey="Network" title="Network">
  <div className="row">
    
    <div
      className="col-md-3 navigation"
    >
      <Nav
        activeKey="/home"
        onSelect={selectedKey => alert(`selected ${selectedKey}`)}
      >
        <Nav.Item>
          <Nav.Link href="/home">DHCP</Nav.Link>
        </Nav.Item>
        
      </Nav>
    </div>
    <div className="col-md-9 form-sec">
    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti.</p>
    </div>
  </div>
  </Tab>
</Tabs>
        </div>

      
    </div>
  );
};

export default DnsSetting;
