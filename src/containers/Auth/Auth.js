import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";

import classes from "./Auth.module.css";

class Auth extends Component {
	state = {
		controls: {
			email: {
				elementType: "input",
				elementConfig: {
					type: "email",
					placeholder: "Email adress",
				},
				value: "",
				validation: {
					required: true,
					isEmail: true,
				},
				valid: false,
				touched: false,
			},
			password: {
				elementType: "input",
				elementConfig: {
					type: "password",
					placeholder: "Password",
				},
				value: "",
				validation: {
					required: true,
					minLenght: 6,
				},
				valid: false,
				touched: false,
			},
		},
		isSignUp: true,
	};

	componentDidMount() {
		if (!this.props.building && this.props.authRedirectPath !== "/") {
			this.props.onSetAuthRedirectPath();
		}
	}

	checkValidity = (value, rules) => {
		let isValid = true;

		if (rules.required && isValid) {
			isValid = value.trim() !== "";
		}
		if (rules.minLength && isValid) {
			isValid = value.length >= rules.minLength;
		}

		return isValid;
	};

	inputChangedHandler = (event, controlName) => {
		const updatedControls = {
			...this.state.controls,
			[controlName]: {
				...this.state.controls[controlName],
				value: event.target.value,
				valid: this.checkValidity(
					event.target.value,
					this.state.controls[controlName].validation
				),
				touched: true,
			},
		};

		this.setState({ controls: updatedControls });
	};

	submitHandler = (event) => {
		event.preventDefault();
		this.props.onAuth(
			this.state.controls.email.value,
			this.state.controls.password.value,
			this.state.isSignUp
		);
	};

	withAuthModeHandler = () => {
		this.setState((prevState) => {
			return { isSignUp: !prevState.isSignUp };
		});
	};

	render() {
		// Transfrom the object to array
		const formElementsArray = [];
		for (let key in this.state.controls) {
			formElementsArray.push({
				id: key,
				config: this.state.controls[key],
			});
		}
		let form = formElementsArray.map((e) => (
			<Input
				key={e.id}
				elementType={e.config.elementType}
				elementConfig={e.config.elementConfig}
				invalid={!e.config.valid}
				touched={e.config.touched}
				valueType={e.config.valueType}
				shouldValidate={e.config.validation}
				value={e.config.value}
				changed={(event) => this.inputChangedHandler(event, e.id)}
			/>
		));

		// Show a spinner if loading
		if (this.props.loading) {
			form = <Spinner />;
		}

		let errorMsg = null;
		if (this.props.error) {
			errorMsg = <p>{this.props.error}</p>;
		}

		let authRedirect = null;
		if (this.props.isAuth) {
			authRedirect = <Redirect to={this.props.authRedirectPath} />;
		}

		return (
			<div className={classes.Auth}>
				{authRedirect}
				{errorMsg}
				<form onSubmit={this.submitHandler}>
					{form}
					<Button buttonType="Success">SUBMIT</Button>
				</form>
				<Button buttonType="Danger" clicked={this.withAuthModeHandler}>
					{this.state.isSignUp
						? "SWITCH TO SIGN IN"
						: "SWITCH TO SIGN UP"}
				</Button>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuth: state.auth.token !== null,
		authRedirectPath: state.auth.authRedirectPath,
		building: state.burgerBuilder.building,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAuth: (email, password, isSignUp) =>
			dispatch(actions.auth(email, password, isSignUp)),
		onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirect("/")),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Auth);
