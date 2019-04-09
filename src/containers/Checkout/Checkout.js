import React, { Component } from 'react';
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from './ContactData/ContactData';


class Checkout extends Component {
    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    }
 
    checkoutContinedHandler = () => {
        this.props.history.replace("/checkout/contact-data");
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.props.ingredients} 
                    onCheckoutCancelled={this.checkoutCanceledHandler}
                    onCheckoutContinued={this.checkoutContinedHandler} />

                <Route path={this.props.match.path + "/contact-data"} 
                   component={ContactData} />
            </div>
        );
    }
}

// Getting state from redux
const mapStateToProps = state => {
    return {
        ingredients: state.ingredients
    }
};


export default connect(mapStateToProps)(Checkout);