import { ActionTypes } from "./actionTypes";
import axios from "../../axios-orders";


export const purchaseBurgerSuccess = (id, orderData) => {
	return {	
		type: ActionTypes.PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData: orderData
	};
};

export const purchaseBurgerFail = (errorMsg) => {
	return {
		type: ActionTypes.PURCHASE_BURGER_FAILED,
		errorMsg: errorMsg
	};
};


export const purchaseBurgerStart = () => {
	return {
		type: ActionTypes.PURCHASE_BURGER_START
	};
}

// Start call point here
export const purchaseBurger = (orderData) => {
	return dispatch => {
		// Start the loading spinner 
		dispatch( purchaseBurgerStart() );

		axios.post( "/orders.json", orderData ) // .json is the endpoint for firebase to work
			.then( res => {
				console.log(res.data);
				dispatch( purchaseBurgerSuccess(res.data.name, orderData) );
			})
			.catch( err => {
				dispatch( purchaseBurgerFail(err) )
			});
	};
};

export const purchaseInit = () => {
	return {
		type: ActionTypes.PURCHASE_INIT
	}
};
