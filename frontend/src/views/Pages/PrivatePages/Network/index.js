import React from 'react'
import {Tab,Nav } from 'react-bootstrap'
 const Network=()=> {
    return (
      <div className="container">
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
        network
       <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti.</p>
      </Tab.Content>
   </div>
  
</Tab.Container>
</div>
</div>
    )
}
export default Network
