import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const HostRecords = (props) => {
  const [hostName, setHostName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [responseData, setResponseData] = React.useState("");
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
      .post("http://localhost:9000/infoblox", datamain)
      .then((response) => {
        setResponseData(response.data);
        getDNS()
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
      .post("http://localhost:9000/infoblox/delete", { id, name }, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        console.log(resp);
        getDNS()
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
      <div >
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
                                <span>{ipAddress.ipv4addr}</span>
                              </>
                          )
                        })}
                    </td>
                    <td>
                      <span style={{ cursor: "pointer" }} onClick={() => deleteRecord(d.id, d.name)}>Delete</span>
                    </td>

                    <td>
                      <span style={{ cursor: "pointer" }} onClick={() => deleteRecord(d.id, d.name)}>Edit</span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HostRecords;
