import React, { Component } from "react";
import axios from "../../../axios-orders";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import withErrorHandling from "../../../hoc/withErrorHandeling/withErrorHandeling";

import classes from "./ContactData.module.css";

// Helper function for creating the in-depth object in state
const createConfig = (
	_valueType,
	_inptType,
	_placeholder,
	_type,
	_options = OPTIONS,
	_minLength
) => {
	if (_inptType === "select") {
		return {
			elementType: "select",
			valueType: _valueType,
			elementConfig: {
				options: _options,
			},
			value: "fastest",
			validation: {},
			valid: true,
		};
	} else {
		return {
			elementType: _inptType,
			valueType: _valueType,
			elementConfig: {
				type: _type,
				placeholder: _placeholder,
			},
			value: "",
			validation: {
				required: true,
				minLength: _minLength,
			},
			valid: false,
			touched: false,
		};
	}
};

const OPTIONS = [
	{ value: "fastest", displayValue: "Fastest" },
	{ value: "cheapest", displayValue: "Cheapest" },
];

class ContactData extends Component {
	state = {
		orderForm: {
			name: createConfig("Name", "input", "Your Name", "text"),
			street: createConfig("Street name", "input", "Street Name", "text"),
			zipCode: createConfig(
				"Zip code",
				"input",
				"Zip Code",
				"text",
				null,
				5
			),
			country: createConfig(
				"Contry name",
				"input",
				"Your Country Name",
				"text"
			),
			email: createConfig("Email adress", "input", "Your Email", "email"),
			deliveryMethod: createConfig("Please select an option", "select"),
		},
		formIsValid: false,
	};

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

	orderHandler = (event) => {
		event.preventDefault();

		const formData = {};
		for (let formElem in this.state.orderForm) {
			formData[formElem] = this.state.orderForm[formElem].value;
		}

		const orderData = {
			ingredients: this.props.ingredients,
			price: this.props.totalPrice,
			orderData: formData,
			userId: this.props.userId,
		};
		this.props.onOrderBurger(orderData, this.props.token);
	};

	// Safely changed the value property of the orderForm in state on input change
	inputChangedHandler = (event, inputIndentifier) => {
		const updatedOrderForm = {
			...this.state.orderForm,
		};

		const updatedFormElem = {
			...updatedOrderForm[inputIndentifier],
		};
		updatedFormElem.value = event.target.value;
		// Update touched element
		updatedFormElem.touched = true;
		// VALIDATION
		updatedFormElem.valid = this.checkValidity(
			updatedFormElem.value,
			updatedFormElem.validation
		);
		updatedOrderForm[inputIndentifier] = updatedFormElem;

		// Overall form validity
		let formIsValid = true;
		for (let inpt in updatedOrderForm) {
			formIsValid = updatedOrderForm[inpt].valid && formIsValid;
		}

		this.setState({
			orderForm: updatedOrderForm,
			formIsValid: formIsValid,
		});
	};

	render() {
		// Transfrom the object to array
		const formElementsArray = [];
		for (let key in this.state.orderForm) {
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key],
			});
		}

		let form = (
			<form onSubmit={this.orderHandler}>
				{formElementsArray.map((e) => {
					return (
						<Input
							key={e.id}
							elementType={e.config.elementType}
							elementConfig={e.config.elementConfig}
							invalid={!e.config.valid}
							touched={e.config.touched}
							valueType={e.config.valueType}
							shouldValidate={e.config.validation}
							value={e.config.value}
							changed={(event) =>
								this.inputChangedHandler(event, e.id)
							}
						/>
					);
				})}
				<Button
					disabled={!this.state.formIsValid}
					buttonType="Success"
					clicked={this.orderHandler}
				>
					ORDER
				</Button>
			</form>
		);

		if (this.props.loading) {
			form = <Spinner />;
		}

		return (
			<div className={classes.ContactData}>
				<h4>
					Please Enter your Contact Data, so we can send the burger on
					your way.
				</h4>
				{form}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ingredients: state.burgerBuilder.ingredients,
		totalPrice: state.burgerBuilder.totalPrice,
		loading: state.orders.loading,
		token: state.auth.token,
		userId: state.auth.userId,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onOrderBurger: (orderData, token) =>
			dispatch(actions.purchaseBurger(orderData, token)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandling(ContactData, axios));
