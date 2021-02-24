import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import {deleteTxtRecord, updateTxtRecord} from "../../../redux/dns/txt/action";
import swal from "sweetalert";
import {deleteMxRecord} from "../../../redux/dns/mx/action";

const TxtItem = ({ tx_records, spinner, dispatch }) => {
  const { register, handleSubmit } = useForm();
  const [show, setShow] = useState(false);
  const [singleTxt, setSingleTxt] = useState({});

  /**
   *
   * @param id
   */
  const deleteRecord = (id) => {
	  swal({
		  title: 'Are you sure?',
		  icon: 'warning',
		  buttons: true,
		  dangerMode: true,
	  }).then((willDelete) => {
		  if (willDelete) {
			  dispatch(deleteTxtRecord(id));
		  }
	  });
  };

  /**
   *
   * @param data
   */
  const updateClicked = (data) => {
    data.id = singleTxt.id;
    dispatch(updateTxtRecord(singleTxt.id, data)).then(() => {
      setShow(false);
    });
  };

  return (
    <div>
      <table className="table table-bordered bg-white mt-5">
        <thead>
          <tr>
            <th>Host</th>
            <th>Domain</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {spinner ? (
            <tr>Loading...</tr>
          ) : (
              tx_records.length > 0 &&
              tx_records.map((txt) => {
              return (
                <tr>
                  <td>{txt.name}</td>
                  <td>{txt.text}</td>
                  <td>
                    <div className="d-flex justify-content-around">
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => deleteRecord(txt.id)}
                      >
                        <FontAwesomeIcon
                          icon={faTimesCircle}
                          className={"text-danger"}
                        />
                      </span>

                      <span style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon
                          icon={faEdit}
                          className={"text-primary"}
                          onClick={() => {
                            setSingleTxt(txt);
                            setShow(true);
                          }}
                        />
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Body>
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
                        defaultValue={singleTxt.name}
                        name={"name"}
                        ref={register({ required: true })}
                      />
                    </div>

                    <div className="form-group">
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label"
                      >
                        Domain:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="recipient-name"
                        defaultValue={singleTxt.text}
                        name={"text"}
                        ref={register({ required: true })}
                      />
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
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TxtItem;
