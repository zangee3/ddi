import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import DNSOptions from './DNSOptions';
import CNameOptions from './CNameOptions';
import TxtOptions from './TxtOptions';
import MXOptions from './MXOptions';
import { Nav } from 'react-bootstrap';
const DnsSetting = () => {
  const [toggleInx, setToggleInx] = useState(false);

  const toggleFunc = () => {
    setToggleInx(!toggleInx);
  };

  return (
    <div className='container'>
      <div className='nav-toggle-col' onClick={toggleFunc}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className='clear'></div>
      <div className='row'>
        <div
          className={`col-md-3 navigation ${toggleInx ? 'active' : 'inactive'}`}
        >
          <Nav
            activeKey='/home'
            onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
          >
            <Nav.Item>
              <Nav.Link href='/home'>A Records</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='link-1'>CNAME Records</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='link-2'>TXT Records</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='link-3'>MX Records</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='link-4'>Nav Tab4</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='link-5'>Nav Tab5</Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
        <div className='col-md-9 form-sec'>
          <DNSOptions />
          <CNameOptions />
          <TxtOptions />
          <MXOptions />
        </div>
      </div>
    </div>
  );
};

export default DnsSetting;
