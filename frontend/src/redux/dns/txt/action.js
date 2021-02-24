import { txt } from "./type";
import service from "../../../service/service";

/**
 *
 * @param value
 * @returns {{payload, type: string}}
 */
export const createTxtSpinner = (value) => {
  return {
    type: txt.CREATE_TXT_SPINNER,
    payload: value,
  };
};

/**
 * @param data
 * @returns {Promise<function(*): void>}
 */
export const createTxtRecord = (data) => (dispatch) => {
  dispatch(createTxtSpinner(true))
  service.post("/txt/addTXTRecord", data).then((response) => {
    dispatch(createTxtSpinner(false));
    dispatch(getTxtRecords())
  });
};

/**
 *
 * @param value
 * @returns {{payload, type: string}}
 */
export const getTxtSpinner = (value) => {
  return {
    type: txt.GET_TXT_SPINNER,
    payload: value,
  };
};

/**
 *
 * @param value
 * @returns {{payload, type: string}}
 */
export const setTxtRecords = (value) => ({
  type: txt.SET_TXT_RECORDS,
  payload: value
})

/**
 *
 * @returns {function(*): void}
 */
export const getTxtRecords = () => dispatch => {
  dispatch(getTxtSpinner(true))
  return service.get("/txt/getTXTRecords").then(response => {
    dispatch(getTxtSpinner(false))
    dispatch(setTxtRecords(response.data))
  })
}

/**
 *
 * @param id
 * @returns {function(*): Promise<void>}
 */
export const deleteTxtRecord = (id) => dispatch =>{
  return service.post("/txt/deleteTXTRecord", { id }).then((response) => {
    dispatch(getTxtRecords());
  });
}

/**
 *
 * @param id
 * @param data
 * @returns {function(*): Promise<void>}
 */
export const updateTxtRecord = (id, data) => dispatch => {
  return service.post("/txt/updateTXTRecord", { id, data }).then(response => {
    dispatch(getTxtRecords())
  })
}
