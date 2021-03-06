import React from "react";

import BuildControl from "./BuildControl/BuildControl";

import classes from "./BuildControls.module.css";

// Constant that hold all the controls for convienience
const CONTROLS = [
	{ label: "Salad", type: "salad" },
	{ label: "Bacon", type: "bacon" },
	{ label: "Cheese", type: "cheese" },
	{ label: "Meat", type: "meat" },
];

//
// Component responsible for the composition of the various build controls.
//
const buildControls = (props) => {
	return (
		<div className={classes.BuildControls}>
			<p>
				Current Price: <strong>{props.price.toFixed(2)} $</strong>
			</p>
			{CONTROLS.map((ctrl) => {
				return (
					<BuildControl
						key={ctrl.label}
						label={ctrl.label}
						added={() => props.ingredientAdded(ctrl.type)}
						removed={() => props.ingredientsRemoved(ctrl.type)}
						disabled={props.disabled[ctrl.type]}
					/>
				);
			})}

			<button
				className={classes.OrderButton}
				disabled={props.purchasable}
				onClick={props.purchaseHandler}
			>
				{props.isAuth ? "ORDER NOW" : "SIGN UP TO ORDER"}
			</button>
		</div>
	);
};

export default buildControls;
