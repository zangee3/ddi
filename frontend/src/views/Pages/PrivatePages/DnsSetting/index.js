import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../../../../App.css";
import DNSOptions from "../../../Components/DNSOptions";
import CNameOptions from "../../../Components/CNameOptions";
import TxtOptions from "../../../Components/TxtOptions";
import MXOptions from "../../../Components/MXOptions";
import { Nav, Tabs, Tab } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Firewall from "../Firewall";
import Network from "../Network";
import Home from "../Home";
import HostRecords from "../../../Components/HostRecords";

const DnsSetting = () => {
  const [toggleInx, setToggleInx] = useState(false);

  const toggleFunc = () => {
    setToggleInx(!toggleInx);
  };

  return (
    <div className={`tab-container ${toggleInx ? "active" : "inactive"}`}>
      <Tabs
        defaultActiveKey="DNS"
        transition={false}
        id="noanim-tab-example"
        style={{ display: "none" }}
      >
        <Tab eventKey="DNS" title="DNS">
          <div className="container">
            <div className="row">
              <Tab.Container
                id="left-tabs-example-3"
                defaultActiveKey="Host Records"
              >
                <div className="col-md-3 navigation sidebar">
                  <Nav variant="pills" className="flex-column">
                    {/*
                                            <Nav.Item>
                                              <Nav.Link eventKey="A Records">A Records</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                              <Nav.Link eventKey="CNAME Records">CNAME Records</Nav.Link>
                                            </Nav.Item>
                                            */}
                    <Nav.Item>
                      <Nav.Link eventKey="TXT Records">TXT Records</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="MX Records">MX Records</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="Host Records">Host Records</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </div>
                <div className="col-md-9 form-sec">
                  <Tab.Content>
                    <Tab.Pane eventKey="Host Records">
                      <HostRecords />
                    </Tab.Pane>
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
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default DnsSetting;
