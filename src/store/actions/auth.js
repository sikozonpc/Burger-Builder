import { ActionTypes } from "./actionTypes";
import axios from "axios";

// Async code
export const auth = (email, password, isSignUp) => {
	return (dispatch) => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true,
		};
		// Endpoint for registering
		let url =
			"https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDpr8gXcgA_F88GuJx3kAC8p2fJrKxC4v4";
		// Endpoint to login
		if (!isSignUp) {
			url =
				"https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDpr8gXcgA_F88GuJx3kAC8p2fJrKxC4v4";
		}
		axios
			.post(url, authData)
			.then((res) => {
				const expirationDate = new Date(
					new Date().getTime() + res.data.expiresIn * 1000
				);
				// Set the token and expiriration to localStorage
				localStorage.setItem("token", res.data.idToken);
				localStorage.setItem("expirationDate", expirationDate);
				localStorage.setItem("userEmail", authData.email);
				localStorage.setItem("userId", res.data.localId);

				dispatch(authSuccess(res.data, authData.email));
				dispatch(checkAuthTimeout(res.data.expiresIn));
			})
			.catch((err) => {
				dispatch(authFailed(err.response.data.error.message));
			});
	};
};
export const logout = () => {
	localStorage.removeItem("token");
	localStorage.removeItem("expirationDate");
	localStorage.removeItem("userEmail");
	localStorage.removeItem("userId");
	return {
		type: ActionTypes.AUTH_LOGOUT,
	};
};
export const checkAuthTimeout = (expirationTime) => {
	return (dispatch) => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000); // expirationTime cames in seconds
	};
};
export const authStart = () => {
	return {
		type: ActionTypes.AUTH_START,
	};
};
export const authSuccess = (authData, userEmail) => {
	return {
		type: ActionTypes.AUTH_START_SUCCESS,
		idToken: authData.idToken,
		userId: authData.localId,
		userEmail: userEmail,
	};
};
export const authFailed = (errorMsg) => {
	return {
		type: ActionTypes.AUTH_START_FAILED,
		error: errorMsg,
	};
};
export const setAuthRedirect = (path) => {
	return {
		type: ActionTypes.SET_AUTH_REDIRECT_PATH,
		path: path,
	};
};
export const authCheckState = () => {
	return (dispatch) => {
		const token = localStorage.getItem("token");
		if (!token) {
			dispatch(logout());
		} else {
			const expirationDate = new Date(
				localStorage.getItem("expirationDate")
			);
			if (expirationDate > new Date()) {
				const userId = localStorage.getItem("userId");
				const userEmail = localStorage.getItem("userEmail");

				dispatch(
					authSuccess({ idToken: token, localId: userId }, userEmail)
				);
				dispatch(
					checkAuthTimeout(
						(expirationDate.getTime() - new Date().getTime()) / 1000 // in miliseconds so divide
					)
				);
			} else {
				dispatch(logout());
			}
		}
	};
};
