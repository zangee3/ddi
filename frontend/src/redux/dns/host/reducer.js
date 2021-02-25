import { host } from './type'
import {createReducer} from "../../../utils/reducerUtil";

const initState = {
	create_host_loader: false,
	get_host_loader: true,
	host_records: [],
	responseData: ""
};

/**
 * @param state
 * @param payload
 * @returns {*&{selected_account_timezone}}
 */
export const create_host_spinner = (state, payload) => {
	return {
		...state,
		create_host_loader: payload
	};
};

/**
 * @param state
 * @param payload
 * @returns {*&{selected_account_timezone}}
 */
export const get_host_spinner = (state, payload) => {
	return {
		...state,
		get_host_loader: payload
	};
};

/**
 *
 * @param state
 * @param payload
 * @returns {*&{mx_records}}
 */
export const set_host_records = (state, payload) => {
	return {
		...state,
		host_records: payload
	}
}

/**
 *
 * @param state
 * @param payload
 * @returns {*&{responseData}}
 */
export const set_response_data = (state, payload) => {
	return {
		...state,
		responseData: payload
	}
}

export default createReducer(initState, {
	[host.CREATE_HOST_SPINNER]: create_host_spinner,
	[host.GET_HOST_SPINNER]: get_host_spinner,
	[host.SET_HOST_RECORDS]: set_host_records,
	[host.SET_HOST_RESPONSE_RECORDS]: set_response_data
});
