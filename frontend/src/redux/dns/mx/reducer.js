import { mx } from './type'
import {createReducer} from "../../../utils/reducerUtil";

const initState = {
	create_mx_loader: false,
	get_mx_loader: true,
	mx_records: []
};

/**
 * @param state
 * @param payload
 * @returns {*&{selected_account_timezone}}
 */
export const create_mx_spinner = (state, payload) => {
	return {
		...state,
		create_mx_loader: payload
	};
};

/**
 * @param state
 * @param payload
 * @returns {*&{selected_account_timezone}}
 */
export const get_mx_spinner = (state, payload) => {
	return {
		...state,
		get_mx_loader: payload
	};
};

/**
 *
 * @param state
 * @param payload
 * @returns {*&{mx_records}}
 */
export const set_mx_records = (state, payload) => {
	return {
		...state,
		mx_records: payload
	}
}

export default createReducer(initState, {
	[mx.CREATE_MX_SPINNER]: create_mx_spinner,
	[mx.GET_MX_SPINNER]: get_mx_spinner,
	[mx.SET_MX_RECORDS]: set_mx_records,
});
