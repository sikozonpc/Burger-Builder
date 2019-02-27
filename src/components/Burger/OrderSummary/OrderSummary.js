import React from "react";

import Button from "../../UI/Button/Button";


const oderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return <li key={igKey}>
                <span style={{textTransform:"capitalize"}}>
                    {igKey}
                </span> : {props.ingredients[igKey]}</li>
        });

    return(
        <>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>Total price: {props.price.toFixed(2)} $</strong></p>
            <p>Continue to Checkout ?</p>
            <Button buttonType="Danger" clicked={props.purchaseCancled}>CANCEL</Button>
            <Button buttonType="Success" clicked={props.purchaseContinue}>CONTINUE</Button>
        </>
    );
}

export default oderSummary;