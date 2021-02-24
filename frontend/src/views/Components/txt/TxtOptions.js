import React, { useEffect, useState } from "react";
import TxtItem from "./TxtItem";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createTxtRecord, getTxtRecords } from "../../../redux/dns/txt/action";

const TxtOptions = () => {
  const [quantity, setQuantity] = useState(1);
  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();
  const dns = useSelector((state) => state.dns.txt);

  useEffect(() => {
    dispatch(getTxtRecords());
  }, []);

  /**
   *
   * @param value
   * @returns {Promise<void>}
   */
  const submitForm = async (value) => {
    let formData = [];
    for (let i = 0; i < Object.keys(value).length; i++) {
      if (value[i] !== undefined) {
        formData.push({
          name: value[i],
          text: value[`${i}_text`],
        });
      }
    }
    dispatch(createTxtRecord(formData));
  };

  const fieldRows = (val) => {
    return (
      <div className="row d-flex">
        <div className=" col-md-6">
          <div className="form-group">
            <label className="d-block mb-2 font-weight-bold">Host {val}:</label>
            <input
              type="text"
              name={val}
              className="form-control"
              placeholder=""
              ref={register({ required: true })}
            />
          </div>
        </div>
        <div className=" col-md-6">
          <div className="form-group ">
            <label className="d-block mb-2 font-weight-bold">
              Text {val}:
            </label>
            <input
              type="text"
              name={`${val}_text`}
              ref={register({ required: true })}
              className="form-control"
              placeholder=""
            />
          </div>
        </div>
      </div>
    );
  };

  /**
   *
   * @returns {JSX.Element}
   */
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
      <form onSubmit={handleSubmit(submitForm)}>
        <h6>TXT Records</h6>
        <div className="row d-flex">
          <div className="col-md-6 ">
            <div className="form-group ">
              <label
                htmlFor="exampleFormControlSelect2"
                className="d-block mb-2 font-weight-bold"
              >
                Number of TXT Records
              </label>
              <select
                onChange={(e) => setQuantity(e.target.value)}
                className="form-control"
                id="exampleFormControlSelect2"
                style={{width: '15%'}}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
        </div>
        {renderTxtFields()}
        <button
          type="submit"
          disabled={dns.create_mx_loader}
          className="btn btn-primary"
        >
          {dns.create_mx_loader ? "Saving..." : "Submit"}
        </button>
      </form>
      <TxtItem
        tx_records={dns.tx_records}
        spinner={dns.get_tx_loader}
        dispatch={dispatch}
      />
    </div>
  );
};

export default TxtOptions;
