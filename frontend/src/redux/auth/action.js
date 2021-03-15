import { LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT, SET_USER_DATA } from './type';

const loginData = {
	userName: 'admin@gmail.com',
	passWord: 'admin',
};
export const login = (data) => async (dispatch) => {
	if (data.userName === loginData.userName && data.password === loginData.passWord) {
		dispatch({
			type: LOGIN_SUCCESS,
			payload: data,
		});

		window.location.href = '/home';
	} else {
		dispatch({
			type: LOGIN_FAILED,
		});
	}
};

/**
 *
 * @param data
 * @returns {{payload, type: string}}
 */
export const setUserData = (data) => ({
	type: SET_USER_DATA,
	payload: data
})

export const logout = () => async (dispatch) => {
	dispatch({
		type: LOGOUT,
	});
};
