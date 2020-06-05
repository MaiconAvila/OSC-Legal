// Action Types
const ADD_NEW_USER = 'osc/register/ADD_NEW_USER';
const ADD_NEW_PASSWORD = 'osc/register/ADD_NEW_PASSWORD';
const UPDATE_RESET_PASSWORD = 'osc/resetpassword/UPDATE_RESET_PASSWORD';
const IS_RESET_PASSWORD = 'osc/resetpassword/IS_RESET_PASSWORD';
const SAVE_USER_DATA = 'osc/register/SAVE_USER_DATA';

const initialState = {
	users: {
		email: '',
		password: '',
		name: '',
		telephone: '',
		cpf: '',
		isAdmin: false,
	},

	user: '',
	isResetPassword: undefined,
	emailReset: '',
};

// REDUCER
export default function SignUpReducer(state = initialState, action) {
	switch (action.type) {
	case SAVE_USER_DATA:
		return Object.assign({}, state, {
			user: action.info,
		});
	case ADD_NEW_USER:
		return Object.assign({}, state, {
			users: {
				...state.users,
				...action.user,
			},
		});
	case UPDATE_RESET_PASSWORD:
		return {
			...state,
			emailReset: action.email,
		};
	case IS_RESET_PASSWORD:
		return Object.assign({}, state, {
			isResetPassword: action.info,
		});
	default:
		return state;
	}
}

// ACTION TYPE
export const addNewUser = user => ({
	type: ADD_NEW_USER,
	user,
});
export const addNewPassword = newPassword => ({
	type: ADD_NEW_PASSWORD,
	newPassword,
});

export const emailReset = email => ({
	type: UPDATE_RESET_PASSWORD,
	email,
});

export const isResetPassword = info => ({
	type: IS_RESET_PASSWORD,
	info,
});

export const saveUserData = info => ({
	type: SAVE_USER_DATA,
	info,
});
