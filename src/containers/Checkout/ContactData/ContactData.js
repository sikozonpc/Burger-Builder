import React, { Component } from 'react';
import axios from "../../../axios-orders";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input"; 

import classes from "./ContactData.module.css"
import input from '../../../components/UI/Input/Input';


// Helper function for creating the in-depth object in state
const createConfig = ( _inptType, _placeholder, _type, _options=OPTIONS ) => {
    if( _inptType === "select"  ) {
        return { 
            elementType: "select", 
            elementConfig: {
                options: _options
            },
            value: ""
         }
    } else {
        return { 
            elementType: _inptType, 
            elementConfig: {
                type: _type,
                placeholder: _placeholder
            },
            value: ""
         }
    }
};

const OPTIONS = [
    {value: "fastest", displayValue: "Fastest" },
    {value: "cheapest", displayValue: "Cheapest" }
];


class ContactData extends Component {
    state = {
        orderForm: {
            name: createConfig(  "input", "Your Name", "text"  ),
            street: createConfig(  "input", "Street Name", "text"  ),
            zipCode: createConfig(  "input", "Zip Code", "text"  ),
            country: createConfig(  "input", "Your Country Name", "text"  ),
            email: createConfig(  "input", "Your Email", "email"  ),
            deliveryMethod: createConfig(  "select" )
        },
        loading: false
    };

    orderHandler = ( event ) => {
        event.preventDefault();

        // IMPORTANT: if this was a producion service this had to be done in the
        // Back-end since the user can manipulate the price on the client.
        this.setState( { loading: true } )

        const formData = {};
        for( let formElem in this.state.orderForm ) {
            formData[ formElem ] = this.state.orderForm[ formElem ].value;
        }

        const order = { 
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }
        axios.post(  "/orders.json", order  ) // .json is the endpoint for firebase to work
            .then( res => {
                this.setState( {loading: false } );
                this.props.history.push( "/" );  
            } )
            .catch( err => this.setState(  {loading: false } )  );
    }


    // Safly changed the value property of the orderForm in state on input change
    inputChangedHandler = (  event, inputIndentifier  ) => {
        const updatedOrderForm = { 
            ...this.state.orderForm
         };

         const updatedFormElem = {
             ...updatedOrderForm[ inputIndentifier ] 
        };
        updatedFormElem.value = event.target.value;
        updatedOrderForm[ inputIndentifier ] = updatedFormElem;

        this.setState( { orderForm: updatedOrderForm } )
    }


    render() {
        // Transfrom the object to array
        const formElementsArray = [];
        for( let key in this.state.orderForm ){
            formElementsArray.push(  {
                id: key, 
                config: this.state.orderForm[key]
            }  );
        }


        let form = ( 
            <form onSubmit={this.orderHandler} >
                { formElementsArray.map( e => {
                    return <Input 
                        key={e.id}
                        elementType={e.config.elementType} 
                        elementConfig={e.config.elementConfig} 
                        value={e.config.value}
                        changed={( event ) =>this.inputChangedHandler(event, e.id ) } />
                } ) }
                <Button buttonType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form> );

        if( this.state.loading ) {
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