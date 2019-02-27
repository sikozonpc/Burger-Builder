import React from 'react';

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";

import classes from "./Sidedrawer.module.css";


const sideDrawer = (props) => {
    let attachedClasses = [classes.Sidedrawer, classes.Close];
    if(props.open){
        attachedClasses = [classes.Sidedrawer, classes.Open];
    } 
    return (
        <>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={ attachedClasses.join(" ") }>
                <div className={classes.Logo}>
                    <Logo />
                </div>
    
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </>
    );
};

export default sideDrawer;