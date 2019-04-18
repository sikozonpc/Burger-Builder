import React from "react";
import { connect } from "react-redux";

import styles from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

//
// Responsile for the layout and click mehtods for mobile and desktop version
//
//TODO: Add to containers
class Layout extends React.Component {
	state = {
		showSidedrawer: false,
	};

	sideDrawerClosedHandler = () => {
		this.setState({ showSidedrawer: false });
	};
	sideDrawerOpenHandler = () => {
		this.setState((prevState) => {
			return { showSidedrawer: !prevState.showSidedrawer };
		});
	};

	render() {
		return (
			<>
				<Toolbar
					open={this.sideDrawerOpenHandler}
					isAuth={this.props.isAuth}
					userEmail={this.props.userEmail}
				/>
				<SideDrawer
					isAuth={this.props.isAuth}
					userEmail={this.props.userEmail}
					open={this.state.showSidedrawer}
					closed={this.sideDrawerClosedHandler}
				/>
				<main className={styles.Content}>{this.props.children}</main>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuth: state.auth.token !== null,
		userEmail: state.auth.userEmail,
	};
};

export default connect(mapStateToProps)(Layout);
