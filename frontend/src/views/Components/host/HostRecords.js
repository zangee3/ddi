import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import HostRecordItem from "./HostRecordItem";
import { useDispatch, useSelector } from "react-redux";
import {
  createHostRecord,
  getHostRecords,
} from "../../../redux/dns/host/action";

const HostRecords = () => {
  const [hostName, setHostName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const host = useSelector((state) => state.dns.host);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    dispatch(getHostRecords());
  }, []);

  /**
   *
   * @param data
   */
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

    dispatch(createHostRecord(datamain)).then(() => {
      reset()
    })
  };

  const fieldRows = (val) => {
    return (
      <div className="form-group">
        <label className={"d-block mb-2 font-weight-bold"}>IP {val}:</label>
        <input
          type="text"
          className="form-control"
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
    <div className="m-bottom">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <h6>Hostname</h6>
        <div className="row d-flex">
          <div className=" col-md-4">
            <div className={"form-group"}>
              <label className={"d-block mb-2 font-weight-bold"}>
                Hostname
              </label>
              <input
                type="text"
                className="form-control"
                name="hostname"
                onChange={(e) => setHostName(e.target.value)}
                value={hostName}
              />
            </div>
          </div>
          <div className=" col-md-4">
            <div className={"form-group"}>
              <label
                htmlFor="exampleFormControlSelect2"
                className={"d-block mb-2 font-weight-bold"}
              >
                Number of IPs
              </label>
              <select
                className="custom-select"
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
          <div className="col-md-4">
            <div className={"form-group"}>{renderTxtFields()}</div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      <div>
        <HostRecordItem
          dnsData={host.host_records}
          register={register}
          handleSubmit={handleSubmit}
          dispatch={dispatch}
        />
      </div>
    </div>
  );
};

export default HostRecords;
