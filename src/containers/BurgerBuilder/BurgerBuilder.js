import React, { Component } from "react";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";


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
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    };

    // Responsible to change 'purchasable' in state. Checks if the sum of all ingredients amount is greater than zero.
    updatePurchaseState = (ingredients) => {
        // Array of values of the amount of the ingredients
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        
        this.setState({purchasable: sum > 0});

    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancleHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        alert("You continue!");
        //TODO: Add backend for the continue purchase
    }

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
        this.updatePurchaseState(updatedIngredients);
    };

    // Updates the ingredients count and dynamically updates the price of the purchase.
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        // Checking to prevent negative numbers in count
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;

        // making sure to not create a reference typing by using the spread operator.
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceDeduction = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState( {totalPrice: newPrice, ingredients: updatedIngredients} );
        this.updatePurchaseState(updatedIngredients);
    };

    render(){
        const disableInfo = {
            ...this.state.ingredients
        };
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        }

        return(
            <>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancleHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        purchaseCancled={this.purchaseCancleHandler}
                        purchaseContinue={this.purchaseContinueHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientsRemoved={this.removeIngredientHandler}
                    disabled={disableInfo}
                    purchasable={!this.state.purchasable}
                    purchaseHandler={this.purchaseHandler}
                    price={this.state.totalPrice} />
            </>
        );
    }
}


export default BurgerBuilder;