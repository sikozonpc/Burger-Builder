import React from "react";
import classes from "*.module.sass";

import classes from "./BurgerIngredient.css";


//
// Component to apply the ingredient and styles to the burger.
//
const burgerIngredient = (props) => {
    let ingredient = null;

    switch(props.type){
        case("bread-bottom"):
            ingredient = <div className={classes.BreadBottom}></div>;
            break;
        case("bread-top"):  
            ingredient = (
                <div className={classes.BreadTop}>
                    <div className={classes.Seeds1}></div>
                    <div className={classes.Seeds2}></div>
                </div>
            );
            break;
        case("meat"):
            ingredient = <div className={classes.Meat}></div>;
            break;
        case("cheese"):
            ingredient = <div className={classes.Cheese}></div>;
            break;
        case("salad"):
            ingredient = <div className={classes.Salad}></div>;
            break;
        case("bacon"):
            ingredient = <div className={classes.Bacon}></div>;
            break;
        default: 
            ingredient = null;
    }

    return ingredient;
};

// PropType Validation
burgerIngredient.propType = {

};


export default burgerIngredient;