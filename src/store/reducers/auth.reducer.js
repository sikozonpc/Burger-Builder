import { ActionTypes } from "../actions/actionTypes";

const initialState = {
	token: null,
	userId: null,
	error: null,
	loading: false,
	userEmail: null,
	authRedirectPath: "/",
};

const authReducer = (state = initialState, action) => {
	if (action.type === ActionTypes.AUTH_START) {
		return {
			...state,
			error: null,
			loading: true,
		};
	}
	if (action.type === ActionTypes.AUTH_START_SUCCESS) {
		return {
			...state,
			token: action.idToken,
			userId: action.userId,
			error: null,
			loading: false,
			userEmail: action.userEmail,
		};
	}
	if (action.type === ActionTypes.AUTH_START_FAILED) {
		return {
			...state,
			error: action.error,
			loading: false,
		};
	}
	if (action.type === ActionTypes.AUTH_LOGOUT) {
		return {
			...state,
			token: null,
			userId: null,
			userEmail: null,
		};
	}
	if (action.type === ActionTypes.SET_AUTH_REDIRECT_PATH) {
		return {
			...state,
			authRedirectPath: action.path,
		};
	}
	return state;
};

export default authReducer;
