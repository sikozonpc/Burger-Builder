import React from "react";

import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

import classes from "./Burger.module.css";


//
// Burger Component is responsible to compose the burger.
//
const burger = (props) => {
    // Returns an array of string from the keys of an object.
    // then iterates (in the for loop) trough the amount of ingrededients to generate 
    // the right amount of ingredients of each type.
    let transformedIngredients = [];
    Object.keys(props.ingredients).forEach(
    item => {
        for (let i = 0; i < props.ingredients[item]; i++) {
            transformedIngredients.push(
                <BurgerIngredient key={item + i} type={item} />
            );
        }
    }
);
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;