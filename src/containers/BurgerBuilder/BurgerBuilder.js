import React, { Component } from "react";
import { connect } from "react-redux"
import * as actionCreators from "../../store/actions/index";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandeling/withErrorHandeling";
import axios from "../../axios-orders";


//
// Statefull Container responsible for hooking up the whole Burger building functionality
// and updating the state of the app.
//
class BurgerBuilder extends Component {
    state = {
        purchasing: false
    };

    componentDidMount () {
        this.props.onInitIngredients();
    }

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
        
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancleHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // Controls the purchased property in order to Redirect the user after it
        this.props.onInitPurchase();
        this.props.history.push("/checkout");
    }   


    render(){
        const disableInfo = {
            ...this.props.ingredients
        };
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        }

        let orderSummary = null;
        let burgerWithControls = this.props.error ?
             <p>Ingredients can't be loaded</p> : <Spinner />;

       
        if(this.props.ingredients){
            burgerWithControls = (
                <>
                <Burger ingredients={this.props.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.props.onIngredientAdd}
                    ingredientsRemoved={this.props.onIngredientRemove}
                    disabled={disableInfo}
                    purchasable={!this.updatePurchaseState(this.props.ingredients) }
                    purchaseHandler={this.purchaseHandler}
                    price={this.props.totalPrice} />
                </>);
            orderSummary = (
                <OrderSummary 
                    price={this.props.totalPrice}
                    ingredients={this.props.ingredients}
                    purchaseCancled={this.purchaseCancleHandler}
                    purchaseContinue={this.purchaseContinueHandler}
                />);
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


// Getting the redux state
const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdd: (ingName) => dispatch(actionCreators.addIngredient(ingName)),
        onIngredientRemove: (ingName) => dispatch(actionCreators.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actionCreators.initIngredients()),
        onInitPurchase: () => dispatch( actionCreators.purchaseInit() )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));