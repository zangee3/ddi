import { txt } from "./type";
import { createReducer } from "../../../utils/reducerUtil";

const initState = {
  create_tx_loader: false,
  get_tx_loader: true,
  tx_records: [],
};

/**
 * @param state
 * @param payload
 * @returns {*&{selected_account_timezone}}
 */
export const create_txt_spinner = (state, payload) => {
  return {
    ...state,
    create_tx_loader: payload,
  };
};

/**
 * @param state
 * @param payload
 * @returns {*&{selected_account_timezone}}
 */
export const get_txt_spinner = (state, payload) => {
  return {
    ...state,
    get_tx_loader: payload,
  };
};

/**
 *
 * @param state
 * @param payload
 * @returns {*&{mx_records}}
 */
export const set_txt_records = (state, payload) => {
  return {
    ...state,
    tx_records: payload,
  };
};

export default createReducer(initState, {
  [txt.CREATE_TXT_SPINNER]: create_txt_spinner,
  [txt.GET_TXT_SPINNER]: get_txt_spinner,
  [txt.SET_TXT_RECORDS]: set_txt_records,
});
