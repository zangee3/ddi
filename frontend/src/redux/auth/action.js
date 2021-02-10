import { LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT } from './type';

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

export const logout = () => async (dispatch) => {
	dispatch({
		type: LOGOUT,
	});
};
