import { host } from "./type";
import service from "../../../service/service";
import { commonErrorOrSuccess } from "../../../utils/commonToastr";

/**
 *
 * @param value
 * @returns {{payload, type: string}}
 */
export const createHostSpinner = (value) => {
  return {
    type: host.CREATE_HOST_SPINNER,
    payload: value,
  };
};

/**
 * @param data
 * @returns {Promise<function(*): void>}
 */
export const createHostRecord = (data) => (dispatch) => {
  dispatch(createHostSpinner(true));
  return service.post("/host/addHostRecord", data).then((response) => {
    const { data } = response.data;
    dispatch(createHostSpinner(false));
    commonErrorOrSuccess({
      data: data,
      dispatch: dispatch,
      message: '"Host Record added successfully"',
      refreshFunction: getHostRecords,
      type: "success",
    });
  });
};

/**
 *
 * @param data
 * @returns {{payload, type: string}}
 */
export const setHostResponseData = (data) => ({
  type: host.SET_HOST_RESPONSE_RECORDS,
  payload: data,
});

/**
 *
 * @param value
 * @returns {{payload, type: string}}
 */
export const getHostSpinner = (value) => {
  return {
    type: host.GET_HOST_SPINNER,
    payload: value,
  };
};

/**
 *
 * @param value
 * @returns {{payload, type: string}}
 */
export const setHostRecords = (value) => ({
  type: host.SET_HOST_RECORDS,
  payload: value,
});

/**
 *
 * @returns {function(*): void}
 */
export const getHostRecords = () => (dispatch) => {
  dispatch(getHostSpinner(true));
  return service.get("/host/getHostRecords").then((response) => {
    dispatch(getHostSpinner(false));
    if (response && response.data !== undefined) {
      dispatch(setHostRecords(response.data));
    }
  });
};

/**
 *
 * @param id
 * @returns {function(*): Promise<void>}
 */
export const deleteHostRecord = (id, name) => (dispatch) => {
  return service
    .post(
      "/host/deleteHostRecord",
      { id, name },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      const { data } = response;
      commonErrorOrSuccess({
        data: data,
        dispatch: dispatch,
        message: '"Host Record deleted"',
        refreshFunction: getHostRecords,
        type: "error",
      });
    });
};

/**
 *
 * @param data
 * @returns {function(*): Promise<void>}
 */
export const updateHostRecord = (data) => (dispatch) => {
  return service
    .post("/host/updateHostIP", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      commonErrorOrSuccess({
        data: data,
        dispatch: dispatch,
        message: "HOST Record updated successfully",
        refreshFunction: getHostRecords,
        type: "success",
      });
    });
};
