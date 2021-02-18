import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useForm } from "react-hook-form";

const totalInputAllowed = 4;

const HostRecordItem = ({
  dnsData,
  deleteRecord,

  getDns,
}) => {
  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [singleData, setSingleData] = useState({});
  const { register, handleSubmit } = useForm();

  const confirmDelete = (id, name) => {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteRecord(id, name);
      }
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
        getDns();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <table className="table table-bordered bg-white">
        <thead>
          <tr>
            <th>Name</th>
            <th>IP</th>
            <th className={"text-center"}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {dnsData.length > 0 &&
            dnsData.map((d) => {
              const dd =
                JSON.parse(d.ipv4addrs).length > 0 &&
                JSON.parse(d.ipv4addrs)
                  .map((v) => v.ipv4addr)
                  .join(" / ");
              return (
                <tr>
                  <td>{d.name}</td>
                  <td>{dd}</td>
                  <td>
                    <div className={"d-flex justify-content-around"}>
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => confirmDelete(d.id, d.name)}
                      >
                        <FontAwesomeIcon
                          icon={faTimesCircle}
                          className={"text-danger"}
                        />
                      </span>

                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setShow(true);
                          setSingleData(d);
                          setEditMode(true);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faEdit}
                          className={"text-primary"}
                        />
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
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
                              <div className={"d-flex align-items-center"}>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="recipient-name"
                                  defaultValue={ipData.ipv4addr}
                                  name={`e_ip_${i}`}
                                  ref={register({ required: true })}
                                />
                                &nbsp;&nbsp;
                                <span
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    const copySingleData = singleData;
                                    const removeData = {
                                      ...copySingleData,
                                      ipv4addrs: JSON.stringify(
                                        JSON.parse(
                                          copySingleData.ipv4addrs
                                        ).filter(
                                          (d) => d.ipv4addr != ipData.ipv4addr
                                        )
                                      ),
                                    };
                                    setSingleData(removeData);
                                  }}
                                >
                                  <FontAwesomeIcon
                                    icon={faTimesCircle}
                                    className={"text-danger"}
                                  />
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      <div className={"text-right"}>
                        <button
                          type="button"
                          className="btn btn-default px-0 font-weight-bold"
                          style={{ textDecoration: "underline" }}
                          onClick={() => {
                            if (
                              totalInputAllowed >
                              JSON.parse(singleData.ipv4addrs).length
                            ) {
                              const ddd = {
                                ...singleData,
                                ipv4addrs: JSON.stringify([
                                  ...JSON.parse(singleData.ipv4addrs),
                                  { ipv4addr: "" },
                                ]),
                              };
                              setSingleData(ddd);
                            }
                          }}
                        >
                          Add Field
                        </button>
                      </div>
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
    </React.Fragment>
  );
};

export default HostRecordItem;
