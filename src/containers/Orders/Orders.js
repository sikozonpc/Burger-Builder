import React, { Component } from 'react';
import axios from "../../axios-orders";
import withErrorHandeling from "../../hoc/withErrorHandeling/withErrorHandeling";

import Order from "../../components/Order/Order";


class Orders extends Component {
    state = {
        orders: [], 
        loading: true
    };

    componentDidMount() {
        axios.get("/orders.json")
            .then( res => {
                const fetchedOrders = [];
                for(let key in res.data){
                    fetchedOrders.push( { ...res.data[key], id: key } );
                }

                this.setState( { orders: fetchedOrders ,loading: false } );
            })
            .catch(err => {
                console.error(err);
                this.setState( { loading: false} )
            });
    }

    render() {
        const orders = this.state.orders.map(order => {
            return <Order key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />
        });

        return (
            <div>
                { orders }
            </div>
        );
    }
}

export default withErrorHandeling(Orders, axios);