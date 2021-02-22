import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRecoilState } from 'recoil';

import { hostNameTextState } from '../../atoms/dns/hostNameText';
import HostRecordItem from './HostRecordItem';

const HostRecords = () => {
  const [hostName, setHostName] = useRecoilState(hostNameTextState);
  const [quantity, setQuantity] = useState(1);
  const [responseData, setResponseData] = React.useState('');
  const [dnsData, setDnsData] = useState([]);

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    getDNS();
  }, []);

  const onFormSubmit = (data) => {
    const ipAdd = [];
    delete data.numberOfIps;

    Object.keys(data).length > 0 &&
      Object.keys(data).forEach((val) => {
        ipAdd.push({
          ipv4addr: data[val],
        });
      });
    const datamain = {
      name: hostName,
      ipv4addrs: ipAdd,
    };

    axios
      .post('http://localhost:9000/infoblox/addHostRecord', datamain)
      .then((response) => {
        setResponseData(response.data);
        getDNS();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getDNS = () => {
    axios
      .get('http://localhost:9000/infoblox/getHostRecords', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((resp) => {
        const { data } = resp;
        setDnsData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fieldRows = (val) => {
    return (
      <div className='form-group'>
        <label className={'d-block mb-2 font-weight-bold'}>IP {val}:</label>
        <input
          type='text'
          className='form-control'
          name={`ip_${val}`}
          ref={register({ required: true })}
        />
      </div>
    );
  };

  const renderTxtFields = () => {
    const val = quantity;
    let rows = [];
    for (let i = 1; i <= val; i++) {
      rows.push(fieldRows(i));
    }
    return <div>{rows}</div>;
  };

  return (
    <div className='m-bottom'>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <h6>Hostname</h6>
        <div className='row d-flex'>
          <div className=' col-md-4'>
            <div className={'form-group'}>
              <label className={'d-block mb-2 font-weight-bold'}>
                Hostname
              </label>
              <input
                type='text'
                className='form-control'
                name='hostname'
                onChange={(e) => setHostName(e.target.value)}
                value={hostName}
              />
            </div>
          </div>
          <div className=' col-md-4'>
            <div className={'form-group'}>
              <label
                htmlFor='exampleFormControlSelect2'
                className={'d-block mb-2 font-weight-bold'}
              >
                Number of IPs
              </label>
              <select
                className='custom-select'
                id='exampleFormControlSelect2'
                name='numberOfIps'
                onChange={(e) => setQuantity(e.target.value)}
                ref={register({ required: true })}
              >
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
              </select>
            </div>
          </div>
          <div className='col-md-4'>
            <div className={'form-group'}>{renderTxtFields()}</div>
          </div>
        </div>

        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>

      {responseData.Error !== undefined ? (
        <div className='alert alert-danger' role='alert'>
          {responseData.Error}
        </div>
      ) : responseData.result !== undefined ? (
        <div className='alert alert-success' role='alert'>
          Record Added
        </div>
      ) : (
        <div></div>
      )}
      <div>
        <HostRecordItem
          dnsData={dnsData}
          register={register}
          handleSubmit={handleSubmit}
          getDns={getDNS}
        />
      </div>
    </div>
  );
};

export default HostRecords;
