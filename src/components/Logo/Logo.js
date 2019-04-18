import React from "react";

// Importing the image because in the build version webpack needs to know what
// needs to be used instead of a virtual path to src.
import burgerLogo from "../../../src/assets/images/burger-logo.png";

import classes from "./Logo.module.css";

const logo = (props) => {
	return (
		<div className={classes.Logo} style={{ height: props.height }}>
			<img src={burgerLogo} alt="MyBurger" />
		</div>
	);
};

export default logo;
