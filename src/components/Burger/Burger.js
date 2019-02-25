import React from "react";

import BurgerIngredent from "./BurgerIngredent/BurgerIngredient";

import classes from "./Burger.module.css";


//
// Burger Component is responsible to compose the burger.
//
const burger = (props) => {
    
    return(
        <div className={classes.Burger}>
            <BurgerIngredent type="bread-top" />
            <BurgerIngredent type="cheese" />
            <BurgerIngredent type="meat" />
            <BurgerIngredent type="bread-bottom" />
        </div>
    );
};

export default burger;