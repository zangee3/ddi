import { mx } from "./type";
import service from "../../../service/service";
import { commonErrorOrSuccess } from "../../../utils/commonToastr";

/**
 *
 * @param value
 * @returns {{payload, type: string}}
 */
export const createMxSpinner = (value) => {
  return {
    type: mx.CREATE_MX_SPINNER,
    payload: value,
  };
};

/**
 * @param data
 * @returns {Promise<function(*): void>}
 */
export const createMxRecord = (data) => (dispatch) => {
  dispatch(createMxSpinner(true));
  return service.post("/mx/addMXRecord", data).then((response) => {
    dispatch(createMxSpinner(false));
    commonErrorOrSuccess({
      data: response.data,
      dispatch: dispatch,
      message: "MX Record added successfully",
      refreshFunction: getMxRecords,
      type: "success",
    });
  });
};

/**
 *
 * @param value
 * @returns {{payload, type: string}}
 */
export const getMxSpinner = (value) => {
  return {
    type: mx.GET_MX_SPINNER,
    payload: value,
  };
};

/**
 *
 * @param value
 * @returns {{payload, type: string}}
 */
export const setMxRecords = (value) => ({
  type: mx.SET_MX_RECORDS,
  payload: value,
});

/**
 *
 * @returns {function(*): void}
 */
export const getMxRecords = () => (dispatch) => {
  dispatch(getMxSpinner(true));
  return service.get("/mx/getMXRecords").then((response) => {
    dispatch(getMxSpinner(false));
    if(response && response.data !== undefined) {
      dispatch(setMxRecords(response.data));
    }
  });
};

/**
 *
 * @param id
 * @returns {function(*): Promise<void>}
 */
export const deleteMxRecord = (id) => (dispatch) => {
  return service.post("/mx/deleteMXRecord", { id }).then((response) => {
    commonErrorOrSuccess({
      data: response.data,
      dispatch: dispatch,
      message: "MX Record deleted!",
      refreshFunction: getMxRecords,
      type: "error",
    });
  });
};

/**
 *
 * @param id
 * @param data
 * @returns {function(*): Promise<void>}
 */
export const updateMxRecord = (id, data) => (dispatch) => {
  return service.post("/mx/updateMXRecord", { id, data }).then((response) => {
    commonErrorOrSuccess({
      data: response.data,
      dispatch: dispatch,
      message: "MX Record updated successfully",
      refreshFunction: getMxRecords,
      type: "success",
    });
  });
};
