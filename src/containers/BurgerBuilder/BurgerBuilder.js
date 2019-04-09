import React, { Component } from "react";
import { connect } from "react-redux"
import { ActionTypes } from "../../store/actions";

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
    // State 
    state = {
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
        
        return sum > 0;
    }

    componentDidMount(){
        /*
        axios.get("https://react-my-burger-5ab22.firebaseio.com/ingredients.json")
            .then(res => {
                this.setState({ingredients: res.data})
            })
            .catch(err => this.setState({error: true}));
         */
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancleHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
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
        let burgerWithControls = this.state.error ?
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


// Getting the redux state
const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdd: (ingName) => dispatch({
             type: ActionTypes.ADD_INGREDIENT, ingredientName: ingName
            }),
        onIngredientRemove: (ingName) => dispatch( { 
            type: ActionTypes.REMOVE_INGREDIENT, ingredientName: ingName
         })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));