import { ActionTypes } from "./actionTypes";
import axios from "../../axios-orders";


export const addIngredient = ingName => {
	return {
		type: ActionTypes.ADD_INGREDIENT,
		ingredientName: ingName
	};
};

export const removeIngredient = ingName => {
	return {
		type: ActionTypes.REMOVE_INGREDIENT,
		ingredientName: ingName
	};
};

export const fetchIngredientsFailed = () => {
	return {
		type: ActionTypes.FETCH_INGREDIENTS_FAILED
	}
};


export const setIngredients = (ingredients) => {
	return {
		type: ActionTypes.SET_INGREDIENTS,
		ingredients: ingredients
	}
}

export const initIngredients = () => {
	return dispatch => {
		axios.get("https://react-my-burger-5ab22.firebaseio.com/ingredients.json")
            .then(res => {
                dispatch( setIngredients(res.data) )
            })
            .catch(err => dispatch(fetchIngredientsFailed()) );
	};
};

