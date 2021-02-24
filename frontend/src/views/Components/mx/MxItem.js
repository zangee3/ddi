import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { deleteMxRecord, updateMxRecord } from "../../../redux/dns/mx/action";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import swal from "sweetalert";

const MxItem = ({ mx_records, spinner, dispatch }) => {
  const { register, handleSubmit } = useForm();
  const [show, setShow] = useState(false);
  const [singleMx, setSingleMx] = useState({});



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
			  dispatch(deleteMxRecord(id));
		  }
	  });
  };

  /**
   *
   * @param data
   */
  const updateClicked = (data) => {
    data.id = singleMx.id;
    dispatch(updateMxRecord(singleMx.id, data)).then(() => {
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
            mx_records.length > 0 &&
            mx_records.map((mx) => {
              return (
                <tr>
                  <td>{mx.name}</td>
                  <td>{mx.mail_exchanger}</td>
                  <td>
                    <div className="d-flex justify-content-around">
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => deleteRecord(mx.id)}
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
                            setSingleMx(mx);
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
                        defaultValue={singleMx.name}
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
                        defaultValue={singleMx.mail_exchanger}
                        name={"mail_exchanger"}
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

export default MxItem;
