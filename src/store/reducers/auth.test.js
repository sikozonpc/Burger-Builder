import reducer from "./auth.reducer";
import { ActionTypes } from "../actions/actionTypes";

describe("Auth reducer", () => {
	it("should return the initial state", () => {
		expect(reducer(undefined, {})).toEqual({
			token: null,
			userId: null,
			error: null,
			loading: false,
			userEmail: null,
			authRedirectPath: "/",
		});
	});
	it("store token upon login", () => {
		expect(
			reducer(
				{
					token: null,
					userId: null,
					error: null,
					loading: false,
					userEmail: null,
					authRedirectPath: "/",
				},
				{
					type: ActionTypes.AUTH_START_SUCCESS,
					idToken: "some-token",
					userId: "some-user-id",
					userEmail: "some-email",
				}
			)
		).toEqual({
			token: "some-token",
			userId: "some-user-id",
			error: null,
			loading: false,
			userEmail: "some-email",
			authRedirectPath: "/",
		});
	});
});
