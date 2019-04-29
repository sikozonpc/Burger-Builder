import React, { Component } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import * as actions from "./store/actions/index";
import { connect } from "react-redux";

import asyncComponent from "./hoc/asyncComponent/asyncComponent";
import Layout from "./components/layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";

import Logout from "./containers/Auth/Logout/Logout";

// Lazy loading
const asyncCheckout = asyncComponent(() => {
	return import("./containers/Checkout/Checkout");
});
const asyncOrders = asyncComponent(() => {
	return import("./containers/Orders/Orders");
});

const asyncAuth = asyncComponent(() => {
	return import("./containers/Auth/Auth");
});

class App extends Component {
	componentDidMount() {
		this.props.onTryAutoSignup();
	}

	render() {
		// Guarding routes in React
		let routes = (
			<Switch>
				<Route path="/" component={BurgerBuilder} exact />
				<Route path="/auth" component={asyncAuth} />
				{/* Redirect UNKOWN PAGES TO / */}
				<Redirect to="/" />
			</Switch>
		);

		if (this.props.isAuth) {
			routes = (
				<Switch>
					<Route path="/checkout" component={asyncCheckout} />
					<Route path="/logout" component={Logout} />
					<Route path="/orders" component={asyncOrders} exact />
					<Route path="/auth" component={asyncAuth} />
					<Route path="/" component={BurgerBuilder} exact />
					{/* Redirect UNKOWN PAGES TO / */}
					<Redirect to="/" />
				</Switch>
			);
		}
		return (
			<div>
				<Layout>{routes}</Layout>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuth: state.auth.token !== null,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onTryAutoSignup: () => dispatch(actions.authCheckState()),
	};
};

// Using withRouter since using connect on the app level causes some problems
export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(App)
);
