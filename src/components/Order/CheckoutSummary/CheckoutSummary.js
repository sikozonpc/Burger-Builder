import React from 'react';

import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

import classes from './CheckoutSummary.module.css';


const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{width: "100%", margin:"auto" }}>
                <Burger ingredients={props.ingredients} />
                <Button 
                    buttonType="Danger" clicked>CANCEL</Button>
                <Button
                     buttonType="Success" clicked>CONTINUE</Button>
            </div>
        </div>
    );
};

export default checkoutSummary;