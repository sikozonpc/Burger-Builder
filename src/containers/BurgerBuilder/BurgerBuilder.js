import React, { Component } from "react";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";


const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

//
// Statefull Container responsible for hooking up the whole Burger building functionality
// and updating the state of the app.
//
class BurgerBuilder extends Component {
    // State 
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        }, 
        totalPrice: 4
    };

    // Updates the ingredients count and dynamically updates the price of the purchase.
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;

        // making sure to not create a reference typing by using the spread operator.
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState( {totalPrice: newPrice, ingredients: updatedIngredients} );
    };

    removeIngredientHandler = (type) => {

    };

    render(){
        return(
            <>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls />
            </>
        );
    }
}


export default BurgerBuilder;