import React from "react";

import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";


const modal = (props) => {
    return(
        <>
            <Backdrop show={props.show} clicked={props.modalClosed}/>
            <div 
                className={classes.Modal}
                style={{
                    transform: props.show ? "translateY(0)" : "translateY(-100vh)",
                    opacity: props.show ? "1" : "0",
                    backgroundColor: "rgb(236, 177, 89)",
                    border: "1px solid #966909"
                }}
                >
                {props.children}
            </div>
        </>
    );
};

export default modal;