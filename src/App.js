import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import * as actions from "./store/actions/index";
import { connect } from "react-redux";

import Layout from "./components/layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";

class App extends Component {
	componentDidMount() {
		this.props.onTryAutoSignup();
	}

	render() {
		return (
			<div>
				<Layout>
					<Route path="/auth" component={Auth} />
					<Route path="/checkout" component={Checkout} />
					<Route path="/logout" component={Logout} />
					<Route path="/orders" component={Orders} exact />
					<Route path="/" component={BurgerBuilder} exact />
				</Layout>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onTryAutoSignup: () => dispatch(actions.authCheckState()),
	};
};

// Using withRouter since using connect on the app level causes some problems
export default withRouter(
	connect(
		null,
		mapDispatchToProps
	)(App)
);
