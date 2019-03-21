import React, { Component } from 'react';
import axios from "../../../axios-orders";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";

import classes from "./ContactData.module.css"


class ContactData extends Component {
    state = {
        name: "",
        email: "",
        adress: {
            street: "",
            postalCode: ""
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();

        // IMPORTANT: if this was a producion service this had to be done in the
        // Back-end since the user can manipulate the price on the client.
        this.setState({loading: true})
        const order = { 
            ingredients: this.props.ingredients,
            price: this.props.price,
            // TODO: Connect the forum to state and this to the state
            customer: {
                name: "Tiago Taquelim",
                adress: {
                    stree: "Teststreet 1",
                    zipCode: "41231",
                    country: "Portugal"
                },
                email: "test@test.com"
            }
        }
        axios.post("/orders.json", order) // .json is the endpoint for firebase to work
            .then(res => {
                this.setState( {loading: false } );
                this.props.history.push("/");  
            })
            .catch(err => this.setState( {loading: false }) );
    }

    render() {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                <input className={classes.Input} type="email" name="email" placeholder="Your Email" />
                <input className={classes.Input} type="text" name="street" placeholder="Your Street name" />
                <input className={classes.Input} type="text" name="postalCode" placeholder="Your Postal Code" />
                <Button buttonType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form> );

        if(this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData} >
                <h4>Please Enter your Contact Data, so we can send the burger on your way.</h4>
                { form }
            </div>
        );
    }
}

export default ContactData;