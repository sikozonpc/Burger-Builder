import React from 'react';

import classes from "./Order.module.css";


const order = (props) => {
    // Convert the object of ingredients and amounts to an array
    const ingredients = [];
    for(let ingName in props.ingredients) {
        ingredients.push( {
             name: ingName,
            amount: props.ingredients[ingName] 
            }
        );
    }

    const ingredientsOutput = ingredients.map(ing => {
        return <span 
                style={{
                    textTransform: "capitalize",
                    display: "inline-block",
                    margin: "0 8px" ,
                    border: "1px solid #ccc",
                    padding: "5px"
                }}
                key={ing.name}> { ing.name } ({ ing.amount }) </span>
    });

    
    return (
        <div className={classes.Order} >
            <p>Ingredients: {ingredientsOutput} </p>
            <p>Price: <strong>{Number.parseFloat(props.price).toFixed(2)} €</strong></p>
        </div>
    );
};

export default order;