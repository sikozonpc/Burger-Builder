import { ActionTypes } from "../actions";


const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4
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
    return state;
}


export default ingredientsReducer;
