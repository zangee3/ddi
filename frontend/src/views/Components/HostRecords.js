import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRecoilState } from "recoil";
import Modal from "react-bootstrap/Modal";

import { hostNameTextState } from "../../atoms/dns/hostNameText";

const HostRecords = (props) => {
  const [hostName, setHostName] = useRecoilState(hostNameTextState);
  const [quantity, setQuantity] = useState(1);
  const [responseData, setResponseData] = React.useState("");
  const [dnsData, setDnsData] = useState([]);
  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [singleData, setSingleData] = useState({});

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
      .post("http://localhost:9000/infoblox/addHostRecord", datamain)
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
      .get("http://localhost:9000/infoblox/getHostRecords", {
        headers: {
          "Content-Type": "application/json",
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
      <div className="form-row">
        <div className="form-group col-md-6">
          <label>IP {val}:</label>
          <input
            type="text"
            className="form-control"
            name={`ip_${val}`}
            ref={register({ required: true })}
            defaultValue={"test"}
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

  const deleteRecord = (id, name) => {
    axios
      .post(
        "http://localhost:9000/infoblox/deleteHostRecord",
        { id, name },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        getDNS();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateClicked = (data) => {
    const ipAdd = [];
    delete data.numberOfIps;
    delete data.ip_1;
    const eHostName = data.e_host_name;
    delete data.e_host_name;

    Object.keys(data).length > 0 &&
      Object.keys(data).forEach((val) => {
        ipAdd.push({
          ipv4addr: data[val],
        });
      });

    const d = {
      hostName: eHostName,
      ipv4addrs: { ipv4addrs: ipAdd },
    };

    axios
      .post("http://localhost:9000/infoblox/updateHostIP", d, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        console.log(resp);
        getDNS();
      })
      .catch((err) => {
        console.log(err);
      });
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
                value={hostName}
              />
            </div>
            {hostName}
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
          {editMode ? "Update" : "Submit"}
        </button>
        &nbsp;
        {editMode && (
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => setEditMode(false)}
          >
            Cancel
          </button>
        )}
      </form>
      <br />
      {responseData.Error !== undefined ? (
        <div className="alert alert-danger" role="alert">
          {responseData.Error}
        </div>
      ) : responseData.result !== undefined ? (
        <div className="alert alert-success" role="alert">
          Record Added
        </div>
      ) : (
        <div></div>
      )}
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>IP</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {dnsData.length > 0 &&
              dnsData.map((d) => {
                return (
                  <tr>
                    <td>{d.name}</td>
                    <td>
                      {JSON.parse(d.ipv4addrs).length > 0 &&
                        JSON.parse(d.ipv4addrs).map((ipAddress) => {
                          return (
                            <>
                              <span>{ipAddress.ipv4addr}&nbsp;</span>
                            </>
                          );
                        })}
                    </td>
                    <td>
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => deleteRecord(d.id, d.name)}
                      >
                        Delete
                      </span>
                    </td>

                    <td>
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setShow(true);
                          setEditMode(true);
                          setSingleData(d);
                        }}
                      >
                        Edit
                      </span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/*  Modal starts here */}
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Body>
          {editMode && (
            <div>
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <form onSubmit={handleSubmit(updateClicked)}>
                    <div className="modal-header">
                      <button
                        type="button"
                        className="close"
                        onClick={() => setShow(false)}
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <div className="form-group">
                        <label
                          htmlFor="recipient-name"
                          className="col-form-label"
                        >
                          Host:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="recipient-name"
                          defaultValue={singleData.name}
                          readOnly={true}
                          name={"e_host_name"}
                          ref={register({ required: true })}
                        />
                      </div>

                      {editMode &&
                        singleData.ipv4addrs.length > 0 &&
                        JSON.parse(singleData.ipv4addrs).map((ipData, i) => {
                          return (
                            <div className="form-group">
                              <label
                                htmlFor="recipient-name"
                                className="col-form-label"
                              >
                                IP:
                              </label>
                              <div className={"d-flex"}>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="recipient-name"
                                    defaultValue={ipData.ipv4addr}
                                    name={`e_ip_${i}`}
                                    ref={register({ required: true })}
                                />
                                &nbsp;&nbsp;
                                <span style={{ cursor: "pointer" }} onClick={() => {
                                  const newData = JSON.parse(singleData.ipv4addrs).filter(data => data.ipv4addr !== ipData.ipv4addr)
                                  console.log("newData: ", newData)
                                  // setSingleData({ ...singleData, ipv4addrs: [{ipv4addr:"2.3.4.5"}] })
                                  // singleData.ipv4addrs = newData
                                  // singleData.map(dd => {
                                  //   console.log(dd)
                                  // })
                                  // setSingleData(singleData)
                                  console.log("singleData: ", singleData)
                                }}>x</span>
                              </div>


                            </div>
                          );
                        })}
                      <button type="submit" className="btn btn-primary">
                        Add Field
                      </button>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setShow(false)}
                      >
                        Close
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Update Host IP
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default HostRecords;
