import React, { Component } from "react";

import Button from "../../UI/Button/Button";


class OderSummary extends Component{

    // Checking for performance gains
    componentDidUpdate(){
        console.log("[OrderSummary.js] @didUpdate() ");
    }

    render(){
        const ingredientsSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return <li key={igKey}>
                <span style={{textTransform:"capitalize"}}>
                    {igKey}
                </span> : {this.props.ingredients[igKey]}</li>
        });

        return(
            <>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p><strong>Total price: {this.props.price.toFixed(2)} $</strong></p>
                <p>Continue to Checkout ?</p>
                <Button buttonType="Danger" clicked={this.props.purchaseCancled}>CANCEL</Button>
                <Button buttonType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </>
        );
    }
}

export default OderSummary;