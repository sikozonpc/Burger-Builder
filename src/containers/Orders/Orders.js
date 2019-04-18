import React, { Component } from "react";
import axios from "../../axios-orders";
import withErrorHandeling from "../../hoc/withErrorHandeling/withErrorHandeling";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import Spinner from "../../components/UI/Spinner/Spinner";
import Order from "../../components/Order/Order";

class Orders extends Component {
	componentDidMount() {
		this.props.onFetchOrders();
	}

	render() {
		let orders = <Spinner />;
		if (!this.props.loading) {
			orders = this.props.orders.map((order) => {
				return (
					<Order
						key={order.id}
						ingredients={order.ingredients}
						price={order.price}
					/>
				);
			});
		}
		return <div>{orders}</div>;
	}
}

const mapStateToProps = (state) => {
	return {
		orders: state.orders.orders,
		loading: state.orders.loading,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchOrders: () => dispatch(actions.fetchOrders()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandeling(Orders, axios));
