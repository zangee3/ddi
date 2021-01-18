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
        <Tab.Container id="left-tabs-example-3" defaultActiveKey="A Records">
 
        <div className="col-md-3 navigation">
      <Nav variant="pills" className="flex-column">
        <Nav.Item>
          <Nav.Link eventKey="A Records">A Records</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="CNAME Records">CNAME Records</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="TXT Records">TXT Records</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="MX Records">MX Records</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
    <div className="col-md-9 form-sec">
      <Tab.Content>
        <Tab.Pane eventKey="A Records">
        <DNSOptions />
        </Tab.Pane>
        <Tab.Pane eventKey="CNAME Records">
        <CNameOptions />
        </Tab.Pane>
        <Tab.Pane eventKey="TXT Records">
        <TxtOptions />
        </Tab.Pane>
        <Tab.Pane eventKey="MX Records">
        <MXOptions />
        </Tab.Pane>
      </Tab.Content>
   </div>
  
</Tab.Container>
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
        <Tab.Container id="left-tabs-example-2" defaultActiveKey="DHCP">
 
        <div className="col-md-3 navigation">
      <Nav variant="pills" className="flex-column">
        <Nav.Item>
          <Nav.Link eventKey="DHCP">DHCP </Nav.Link>
        </Nav.Item>
        
      </Nav>
    </div>
    <div className="col-md-9 form-sec">
      <Tab.Content>
       <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti.</p>
      </Tab.Content>
   </div>
  
</Tab.Container>
</div>
  </Tab>
</Tabs>
        </div>


</div>
   
  );
};

export default DnsSetting;
