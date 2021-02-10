import React, { useState } from "react";
import { useForm } from "react-hook-form";

const HostRecords = (props) => {
  const [hostName, setHostName] = useState("");
  const [quantity, setQuantity] = useState(0);

  const { register, handleSubmit } = useForm();

  const onFormSubmit = (data) => {
    const ipAdd = []
    delete data.numberOfIps
    Object.keys(data).length > 0 && Object.keys(data).forEach(val => {
      ipAdd.push({
        ipv4addr: val
      })
    })
    const datamain = {
      name: hostName,
      ipv4addrs: ipAdd,
    };
    console.log("datamain: ", datamain)
  };

  const fieldRows = (val) => {
    return (
      <div className="form-row">
        <div className="form-group col-md-6">
          <label>IP {val}:</label>
          <input
            type="text"
            className="form-control"
            name={`ip_${val}`}
            ref={register({ required: true })}
          />
        </div>
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
    <div className="m-bottom">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <h6>Hostname</h6>
        <div className="form-group">
          <div className="form-row">
            <div className=" col-md-6">
              <label>Hostname</label>
              <input
                type="text"
                className="form-control"
                name="hostname"
                onChange={(e) => setHostName(e.target.value)}
              />
            </div>
            <div className=" col-md-6">
              <label htmlFor="exampleFormControlSelect2">Number of IPs</label>
              <select
                className="form-control"
                id="exampleFormControlSelect2"
                name="numberOfIps"
                onChange={(e) => setQuantity(e.target.value)}
                ref={register({ required: true })}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
          </div>
        </div>
        {renderTxtFields()}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default HostRecords;
