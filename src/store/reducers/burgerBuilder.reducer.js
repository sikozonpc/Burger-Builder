import { ActionTypes } from "../actions/actionTypes";


const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};


const ingredientsReducer = ( state = initialState, action ) => {
    if( action.type === ActionTypes.ADD_INGREDIENT ) {
        // Update ingredients
        let newIngredients = {...state.ingredients };
        newIngredients[action.ingredientName] += 1;

        return {
            ...state,
            ingredients: newIngredients,
            totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
        }
    }
    if( ActionTypes.REMOVE_INGREDIENT === action.type ) {
        // Update ingredients
       let newIngredients = {...state.ingredients};
       newIngredients[action.ingredientName] -= 1;

        return {
            ...state,
            ingredients: newIngredients,
            totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName]
        }
    }
    if( ActionTypes.SET_INGREDIENTS === action.type ) {
        return {
            ...state,
            ingredients: action.ingredients,
            error: false
        }
    }
    if( ActionTypes.FETCH_INGREDIENTS_FAILED === action.type ) {
        return {
            ...state,
            error: true
        }
    }
    
	// VERY IMPORTANT !!!
    return state;
}


export default ingredientsReducer;
