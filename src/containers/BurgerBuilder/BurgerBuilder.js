import React, { Component } from "react";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandeling/withErrorHandeling";

import axios from "../../axios-orders";

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
        ingredients: null, // gets obj from db 
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
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

    componentDidMount(){
        axios.get("https://react-my-burger-5ab22.firebaseio.com/ingredients.json")
            .then(res => {
                this.setState({ingredients: res.data})
            })
            .catch(err => this.setState({error: true}));
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancleHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // alert("You continue!");
        // IMPORTANT: if this was a producion service this had to be done in the
        // Back-end since the user can manipulate the price on the client.
        this.setState({loading: true})
        // Dummy order
        const order = { 
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: "Tiago Taquelim",
                adress: {
                    stree: "Teststreet 1",
                    zipCode: "41231",
                    country: "Portugal"
                },
                email: "test@test.com"
            }
        }
        axios.post("/orders.json", order) // .json is the endpoint for firebase to work
            .then(res => this.setState({loading: false, purchasing: false}))
            .catch(err => this.setState({loading: false, purchasing: false}));
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

        let orderSummary = null;
        let burgerWithControls = this.state.error ?
             <p>Ingredients can't be loaded</p> : <Spinner />;

        
        if(this.state.ingredients){
            burgerWithControls = (
                <>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientsRemoved={this.removeIngredientHandler}
                    disabled={disableInfo}
                    purchasable={!this.state.purchasable}
                    purchaseHandler={this.purchaseHandler}
                    price={this.state.totalPrice} />
                </>);
            orderSummary = (
                <OrderSummary 
                    price={this.state.totalPrice}
                    ingredients={this.state.ingredients}
                    purchaseCancled={this.purchaseCancleHandler}
                    purchaseContinue={this.purchaseContinueHandler}
                />);
        }        
        if(this.state.loading){
            orderSummary = <Spinner />;
        }

        return(
            <>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancleHandler}>
                    {orderSummary}
                </Modal>
                {burgerWithControls}
            </>
        );
    }
}


export default withErrorHandler(BurgerBuilder, axios);