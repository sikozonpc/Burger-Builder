import { ActionTypes } from "./actionTypes";
import axios from "../../axios-orders";

/////// Orders ///////
// Start point
export const fetchOrders = (token, userId) => {
	return (dispatch) => {
		// Set the loading to true when fetching
		dispatch(fetchOrdersStart());

		const queryParams =
			"?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';

		axios
			.get("/orders.json?" + queryParams)
			.then((res) => {
				const fetchedOrders = [];
				for (let key in res.data) {
					fetchedOrders.push({ ...res.data[key], id: key });
				}

				dispatch(fetchOrdersSuccess(fetchedOrders));
			})
			.catch((err) => {
				dispatch(fetchOrdersFailed(err));
			});
	};
};
export const fetchOrdersStart = () => {
	return {
		type: ActionTypes.FETCH_ORDERS_START,
	};
};
export const fetchOrdersSuccess = (orders) => {
	return {
		type: ActionTypes.FETCH_ORDERS_SUCCESS,
		orders: orders,
	};
};
export const fetchOrdersFailed = (errorMsg) => {
	return {
		type: ActionTypes.FETCH_ORDERS_FAILED,
		errorMsg: errorMsg,
	};
};

/////// Purchasing burger ///////
// Start call point here
export const purchaseBurger = (orderData, token) => {
	return (dispatch) => {
		// Start the loading spinner , sets loading to true
		dispatch(purchaseBurgerStart());

		axios
			.post("/orders.json?auth=" + token, orderData) // .json is the endpoint for firebase to work
			.then((res) => {
				dispatch(purchaseBurgerSuccess(res.data.name, orderData));
			})
			.catch((err) => {
				dispatch(purchaseBurgerFail(err));
			});
	};
};
export const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: ActionTypes.PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData: orderData,
	};
};
export const purchaseBurgerFail = (errorMsg) => {
	return {
		type: ActionTypes.PURCHASE_BURGER_FAILED,
		errorMsg: errorMsg,
	};
};
export const purchaseBurgerStart = () => {
	return {
		type: ActionTypes.PURCHASE_BURGER_START,
	};
};
export const purchaseInit = () => {
	return {
		type: ActionTypes.PURCHASE_INIT,
	};
};
