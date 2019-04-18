import React from "react";

import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";

const navigationItems = (props) => {
	return (
		<ul className={classes.NavigationItems}>
			<NavigationItem link="/">Burger Builder</NavigationItem>
			<NavigationItem link="/orders">Orders</NavigationItem>
			{!props.isAuth ? (
				<NavigationItem link="/auth">Authenticate</NavigationItem>
			) : (
				<>
					<p style={{ color: "#ff7" }}>
						Logged as {props.userEmail} |
					</p>
					<NavigationItem link="/logout"> Logout</NavigationItem>
				</>
			)}
		</ul>
	);
};

export default navigationItems;
