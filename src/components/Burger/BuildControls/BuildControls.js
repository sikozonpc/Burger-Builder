import React from "react";

import BuildControl from "./BuildControl/BuildControl";

import classes from "./BuildControls.module.css";


// Constant that hold all the controls for convienience
const CONTROLS = [
    { label: "Salad", type:"salad"},
    { label: "Bacon", type:"bacon"},
    { label: "Cheese", type:"cheese"},
    { label: "Meat", type:"meat"}
];

//
// Component responsible for the composition of the various build controls.
//
const buildControls = (props) => {
    return(
        <div className={classes.BuildControls}>
            {CONTROLS.map(ctrl => {
                return <BuildControl key={ctrl.label} label={ctrl.label} />
            })}
        </div>
    );
};


export default buildControls;