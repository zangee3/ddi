import { mx } from "./type";
import service from "../../../service/service";

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
  dispatch(createMxSpinner(true))
  service.post("/mx/addMXRecord", data).then((response) => {
    dispatch(createMxSpinner(false));
    dispatch(getMxRecords())
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
  payload: value
})

/**
 *
 * @returns {function(*): void}
 */
export const getMxRecords = () => dispatch => {
  dispatch(getMxSpinner(true))
  return service.get("/mx/getMXRecords").then(response => {
    dispatch(getMxSpinner(false))
    dispatch(setMxRecords(response.data))
  })
}

/**
 *
 * @param id
 * @returns {function(*): Promise<void>}
 */
export const deleteMxRecord = (id) => dispatch =>{
  return service.post("/mx/deleteMXRecord", { id }).then((response) => {
    dispatch(getMxRecords());
  });
}

/**
 *
 * @param id
 * @param data
 * @returns {function(*): Promise<void>}
 */
export const updateMxRecord = (id, data) => dispatch => {
  return service.post("/mx/updateMXRecord", { id, data }).then(response => {
    dispatch(getMxRecords())
  })
}
