import { ActionTypes } from "../actions/actionTypes";


const  initialState = {
	orders: [],
	loading: false,
	purchased: false,
}

const orderReducer = (state = initialState, action) => {
	if ( ActionTypes.PURCHASE_BURGER_START === action.type ) {
		return {
			...state,
			loading: true			
		}
	}
	if ( ActionTypes.PURCHASE_INIT === action.type ) {
		return {
			...state,
			purchased: false			
		}
	}
	if ( ActionTypes.PURCHASE_BURGER_SUCCESS === action.type ) {
		const newOrder = {
			...action.orderData,
			id: action.orderId
		}
		return {
			...state,
			loading: false,
			purchased: true,
			orders: state.orders.concat( newOrder )
		}
	}
	if ( ActionTypes.PURCHASE_BURGER_FAILED === action.type ) {
		return {
			...state,
			loading: false			
		}
	}
	// VERY IMPORTANT !!!
	return state;
};


export default orderReducer;